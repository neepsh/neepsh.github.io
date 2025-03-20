import{V as d,g as m,W as R,S as g,d as O,O as T,a as _,j as P,M as S,b as x,D as C}from"./three.module-1e5242ca.js";import{f as N,h as y,g as I,y as L,o as w,c as A,_ as D}from"./index-c0518ec5.js";const M=`// #version 300 es\r
\r
precision highp float;\r
precision mediump int;\r
precision mediump sampler3D;\r
in vec2 vUv;\r
// out vec4 gl_FragColor;\r
\r
//===================//\r
//  Global uniforms  //\r
//===================//\r
\r
uniform float uTime;\r
uniform float uRotationOffset;\r
uniform vec2 uResolution;\r
uniform sampler3D uNoiseTexture;\r
\r
//==========================//\r
//  Controllable  uniforms  //\r
//==========================//\r
\r
uniform float uQuality;\r
uniform vec3 uPlanetPosition;\r
uniform float uPlanetRadius;\r
uniform float uNoiseStrength;\r
uniform float uCloudsDensity;\r
uniform float uCloudsScale;\r
uniform float uCloudsSpeed;\r
uniform float uTerrainScale;\r
uniform vec3 uAtmosphereColor;\r
uniform float uAtmosphereDensity;\r
uniform float uSunIntensity;\r
uniform float uAmbientLight;\r
varying vec3 uSunDirection;\r
// varying vec2 vUv;\r
\r
//==========================================================//\r
//  Constants (could be turned into controllable uniforms)  //\r
//==========================================================//\r
\r
// Planets geometry\r
#define ROTATION_SPEED .1\r
#define PLANET_ROTATION rotateY(uTime *ROTATION_SPEED + uRotationOffset)\r
\r
#define MOON_RADIUS .08\r
#define MOON_ROTATION_SPEED -ROTATION_SPEED * 5.\r
#define MOON_OFFSET vec3(uPlanetRadius * 1.2, uPlanetRadius / 4., 0.)\r
#define MOON_ROTATION_AXIS (MOON_OFFSET - uPlanetPosition) * -rotateX(PI / 2.)\r
\r
// Planet colors\r
#define WATER_COLOR_DEEP vec3(0.01, 0.05, 0.15)\r
#define WATER_COLOR_SURFACE vec3(0.02, 0.12, 0.27)\r
#define SAND_COLOR vec3(1.0, 1.0, 0.85)\r
#define TREE_COLOR vec3(.02, .1, .06)\r
#define ROCK_COLOR vec3(0.15, 0.12, 0.12)\r
#define ICE_COLOR vec3(0.8, .9, .9)\r
#define CLOUD_COLOR vec3(1., 1., 1.)\r
\r
#define WATER_SURFACE_LEVEL 0.0\r
#define SAND_LEVEL .028\r
#define TREE_LEVEL .03\r
#define ROCK_LEVEL .1\r
#define ICE_LEVEL .15\r
#define TRANSITION .02\r
\r
// Lighting\r
#define SUN_COLOR vec3(1.0, 1.0, 0.9)\r
#define DEEP_SPACE vec3(0., 0., 0.001)\r
\r
// Ray tracing\r
#define EPSILON 1e-3\r
#define INFINITY 1e10\r
#define CAMERA_POSITION vec3(0., 0., 6.0)\r
\r
#define PI acos(-1.)\r
\r
//=========//\r
//  Types  //\r
//=========//\r
\r
struct Material\r
{\r
    vec3 color;\r
    float diffuse;\r
    float specular;\r
};\r
\r
struct Hit\r
{\r
    float len;\r
    vec3 normal;\r
    Material material;\r
};\r
\r
struct Sphere\r
{\r
    vec3 position;\r
    float radius;\r
};\r
\r
// Note: I had created a struct for Ray but then deleted it because it caused artifacts on some mobile devices\r
// because of a precision issue with struct (https://github.com/KhronosGroup/WebGL/issues/3351)\r
// I use ro and rd instead in this shader.\r
\r
Hit miss = Hit(INFINITY, vec3(0.), Material(vec3(0.), -1., -1.));\r
\r
Sphere getPlanet()\r
{\r
    return Sphere(uPlanetPosition, uPlanetRadius);\r
}\r
\r
//===============================================//\r
//  Generic utilities stolen from smarter people //\r
//===============================================//\r
\r
float inverseLerp(float v, float minValue, float maxValue)\r
{\r
    return (v - minValue) / (maxValue - minValue);\r
}\r
\r
float remap(float v, float inMin, float inMax, float outMin, float outMax)\r
{\r
    float t = inverseLerp(v, inMin, inMax);\r
    return mix(outMin, outMax, t);\r
}\r
\r
float noise(vec3 p)\r
{\r
    return texture(uNoiseTexture, p * .05).r;\r
}\r
\r
// https://iquilezles.org/articles/intersectors/\r
float sphIntersect(in vec3 ro, in vec3 rd, in Sphere sphere)\r
{\r
    vec3 oc = ro - sphere.position;\r
    float b = dot(oc, rd);\r
    float c = dot(oc, oc) - sphere.radius * sphere.radius;\r
    float h = b * b - c;\r
    if (h < 0.0)\r
        return -1.; // no intersection\r
    return -b - sqrt(h);\r
}\r
\r
// Comes from a course by SimonDev (https://www.youtube.com/channel/UCEwhtpXrg5MmwlH04ANpL8A)\r
// https://simondev.teachable.com/p/glsl-shaders-from-scratch\r
float fbm(vec3 p, int octaves, float persistence, float lacunarity, float exponentiation)\r
{\r
    float amplitude = 0.5;\r
    float frequency = 3.0;\r
    float total = 0.0;\r
    float normalization = 0.0;\r
    int qualityDegradation = 2 - int(floor(uQuality)); // 0 when quality=optimal, 2 when quality=low\r
    int octavesWithQuality = max(octaves - qualityDegradation, 1);\r
\r
    for (int i = 0; i < octavesWithQuality; ++i)\r
    {\r
        float noiseValue = noise(p * frequency);\r
        total += noiseValue * amplitude;\r
        normalization += amplitude;\r
        amplitude *= persistence;\r
        frequency *= lacunarity;\r
    }\r
\r
    total /= normalization;\r
    total = total * 0.8 + 0.1;\r
    total = pow(total, exponentiation);\r
\r
    return total;\r
}\r
\r
mat3 rotateY(float angle)\r
{\r
    float c = cos(angle);\r
    float s = sin(angle);\r
    return mat3(       //\r
        vec3(c, 0, s), //\r
        vec3(0, 1, 0), //\r
        vec3(-s, 0, c) //\r
    );\r
}\r
\r
mat3 rotateZ(float angle)\r
{\r
    float c = cos(angle);\r
    float s = sin(angle);\r
    return mat3(        //\r
        vec3(c, -s, 0), //\r
        vec3(s, c, 0),  //\r
        vec3(0, 0, 1)   //\r
    );\r
}\r
mat3 rotateX(float angle)\r
{\r
    float c = cos(angle);\r
    float s = sin(angle);\r
    return mat3(        //\r
        vec3(1, 0, 0),  //\r
        vec3(0, c, -s), //\r
        vec3(0, s, c)   //\r
    );\r
}\r
\r
// https://github.com/dmnsgn/glsl-rotate/blob/main/rotation-3d.glsl\r
mat3 rotate3d(vec3 axis, float angle)\r
{\r
    axis = normalize(axis);\r
    float s = sin(angle);\r
    float c = cos(angle);\r
    float oc = 1.0 - c;\r
\r
    return mat3(                                                                                        //\r
        oc * axis.x * axis.x + c, oc * axis.x * axis.y - axis.z * s, oc * axis.z * axis.x + axis.y * s, //\r
        oc * axis.x * axis.y + axis.z * s, oc * axis.y * axis.y + c, oc * axis.y * axis.z - axis.x * s, //\r
        oc * axis.z * axis.x - axis.y * s, oc * axis.y * axis.z + axis.x * s, oc * axis.z * axis.z + c  //\r
    );\r
}\r
\r
// nimitz - https://www.shadertoy.com/view/XsyGWV\r
// I reused the 3D noise texture instead of nimitz's hash function for better performance\r
vec3 stars(in vec3 p)\r
{\r
    vec3 c = vec3(0.);\r
    float res = uResolution.x * uQuality * 0.8;\r
\r
    for (float i = 0.; i < 3.; i++)\r
    {\r
        vec3 q = fract(p * (.15 * res)) - 0.5;\r
        vec3 id = floor(p * (.15 * res));\r
        vec2 rn = vec2(noise(id / 2.), noise(id.zyx * 2.)) * .03;\r
        float c2 = 1. - smoothstep(0., .6, length(q));\r
        c2 *= step(rn.x, .003 + i * 0.0005);\r
        c += c2 * (mix(vec3(1.0, 0.49, 0.1), vec3(0.75, 0.9, 1.), rn.y) * 0.25 + 1.2);\r
        p *= 1.8;\r
    }\r
    return c * c;\r
}\r
\r
// Comes from a course by SimonDev (https://www.youtube.com/channel/UCEwhtpXrg5MmwlH04ANpL8A)\r
// https://simondev.teachable.com/p/glsl-shaders-from-scratch\r
float domainWarpingFBM(vec3 p, int octaves, float persistence, float lacunarity, float exponentiation)\r
{\r
    vec3 offset = vec3(                                                                       //\r
        fbm(p, octaves, persistence, lacunarity, exponentiation),                             //\r
        fbm(p + vec3(43.235, 23.112, 0.0), octaves, persistence, lacunarity, exponentiation), //\r
        0.0                                                                                   //\r
    );\r
\r
    return fbm(p + 1. * offset, 2, persistence, lacunarity, exponentiation);\r
}\r
\r
// Zavie - https://www.shadertoy.com/view/lslGzl\r
vec3 simpleReinhardToneMapping(vec3 color)\r
{\r
    float exposure = 1.5;\r
    color *= exposure / (1. + color / exposure);\r
    color = pow(color, vec3(1. / 2.4));\r
    return color;\r
}\r
\r
//========//\r
//  Misc  //\r
//========//\r
\r
float planetNoise(vec3 p)\r
{\r
    float fbm = fbm(p * uTerrainScale, 6, .5, 2., 5.) * uNoiseStrength;\r
\r
    // Flatten the noise on the oceans\r
    return mix(                                                        //\r
        fbm / 3. + uNoiseStrength / 50.,                               //\r
        fbm,                                                           //\r
        smoothstep(SAND_LEVEL, SAND_LEVEL + TRANSITION / 2., fbm * 5.) //\r
    );\r
}\r
\r
/**\r
 * Standard ray-sphere intersection but with fbm noise added on the radius.\r
 * Probably not exact (especially near the edges), but it looks good enough\r
 */\r
float planetDist(in vec3 ro, in vec3 rd)\r
{\r
    float smoothSphereDist = sphIntersect(ro, rd, getPlanet());\r
\r
    vec3 intersection = ro + smoothSphereDist * rd;\r
    vec3 intersectionWithRotation = PLANET_ROTATION * (intersection - uPlanetPosition) + uPlanetPosition;\r
\r
    return sphIntersect(ro, rd, Sphere(uPlanetPosition, uPlanetRadius + planetNoise(intersectionWithRotation)));\r
}\r
\r
vec3 planetNormal(vec3 p)\r
{\r
    vec3 rd = uPlanetPosition - p;\r
    float dist = planetDist(p, rd);\r
    // if e is too small it causes artifacts on mobile, so I interpolate\r
    // between .01 (large screens) and .03 (small screens)\r
    vec2 e = vec2(max(.01, .03 * smoothstep(1300., 300., uResolution.x)), 0);\r
\r
    vec3 normal = dist - vec3(planetDist(p - e.xyy, rd), planetDist(p - e.yxy, rd), planetDist(p + e.yyx, rd));\r
    return normalize(normal);\r
}\r
\r
vec3 currentMoonPosition()\r
{\r
    mat3 moonRotation = rotate3d(MOON_ROTATION_AXIS, uTime * MOON_ROTATION_SPEED);\r
    return MOON_OFFSET * moonRotation + uPlanetPosition;\r
}\r
\r
vec3 spaceColor(vec3 direction)\r
{\r
    mat3 backgroundRotation = rotateY(uTime * ROTATION_SPEED / 4.);\r
    vec3 backgroundCoord = direction * backgroundRotation;\r
    float spaceNoise = fbm(backgroundCoord * 3., 4, .5, 2., 6.);\r
\r
    return stars(backgroundCoord) + mix(DEEP_SPACE, uAtmosphereColor / 12., spaceNoise);\r
    // return direction;\r
}\r
\r
vec3 atmosphereColor(vec3 ro, vec3 rd, float spaceMask, Hit firstHit)\r
{\r
    vec3 position = ro + firstHit.len * rd;\r
\r
    float distCameraToPlanetOrigin = length(uPlanetPosition - CAMERA_POSITION);\r
    float distCameraToPlanetEdge = sqrt(distCameraToPlanetOrigin * distCameraToPlanetOrigin - uPlanetRadius * uPlanetRadius);\r
    float distCameraToMoon = length(currentMoonPosition() - CAMERA_POSITION);\r
    float isMoonInFront = smoothstep(-uPlanetRadius / 2., uPlanetRadius / 2., distCameraToPlanetEdge - distCameraToMoon);\r
\r
    float moonMask = (1.0 - spaceMask) * step(uPlanetRadius + EPSILON, length(position - uPlanetPosition));\r
    float planetMask = 1.0 - spaceMask - moonMask;\r
\r
    vec3 coordFromCenter = (ro + rd * distCameraToPlanetEdge) - uPlanetPosition;\r
    float distFromEdge = abs(length(coordFromCenter) - uPlanetRadius);\r
    float planetEdge = max(uPlanetRadius - distFromEdge, 0.) / uPlanetRadius;\r
    float atmosphereMask = pow(remap(dot(uSunDirection, coordFromCenter), -uPlanetRadius, uPlanetRadius / 2., 0., 1.), 5.);\r
    atmosphereMask *= uAtmosphereDensity * uPlanetRadius * uSunIntensity;\r
\r
    vec3 atmosphere = vec3(pow(planetEdge, 120.)) * .5;\r
    atmosphere += pow(planetEdge, 50.) * .3 * (1.5 - planetMask);\r
    atmosphere += pow(planetEdge, 15.) * .03;\r
    atmosphere += pow(planetEdge, 5.) * .04 * planetMask;\r
\r
    return atmosphere * uAtmosphereColor * atmosphereMask * (1. - moonMask * isMoonInFront);\r
}\r
\r
//===============//\r
//  Ray Tracing  //\r
//===============//\r
\r
Hit intersectPlanet(vec3 ro, vec3 rd)\r
{\r
    float len = sphIntersect(ro, rd, getPlanet());\r
\r
    if (len < 0.)\r
    {\r
        return miss;\r
    }\r
\r
    vec3 position = ro + len * rd;\r
    vec3 rotatedCoord = PLANET_ROTATION * (position - uPlanetPosition) + uPlanetPosition;\r
    float altitude = 5. * planetNoise(rotatedCoord);\r
\r
    vec3 normal = planetNormal(position);\r
\r
    vec3 color = mix(WATER_COLOR_DEEP, WATER_COLOR_SURFACE, smoothstep(WATER_SURFACE_LEVEL, WATER_SURFACE_LEVEL + TRANSITION, altitude));\r
    color = mix(color, SAND_COLOR, smoothstep(SAND_LEVEL, SAND_LEVEL + TRANSITION / 2., altitude));\r
    color = mix(color, TREE_COLOR, smoothstep(TREE_LEVEL, TREE_LEVEL + TRANSITION, altitude));\r
    color = mix(color, ROCK_COLOR, smoothstep(ROCK_LEVEL, ROCK_LEVEL + TRANSITION, altitude));\r
    color = mix(color, ICE_COLOR, smoothstep(ICE_LEVEL, ICE_LEVEL + TRANSITION, altitude));\r
\r
    vec3 cloudsCoord = (rotatedCoord + vec3(uTime * .008 * uCloudsSpeed)) * uCloudsScale;\r
    float cloudsDensity = remap(domainWarpingFBM(cloudsCoord, 3, .3, 5., uCloudsScale), -1.0, 1.0, 0.0, 1.0);\r
    float cloudsThreshold = 1. - uCloudsDensity * .5;\r
    cloudsDensity *= smoothstep(cloudsThreshold, cloudsThreshold + .1, cloudsDensity);\r
    cloudsDensity *= smoothstep(ROCK_LEVEL, (ROCK_LEVEL + TREE_LEVEL) / 2., altitude);\r
    color = mix(color, CLOUD_COLOR, cloudsDensity);\r
\r
    float specular = smoothstep(SAND_LEVEL + TRANSITION, SAND_LEVEL, altitude);\r
\r
    return Hit(len, normal, Material(color, 1., specular));\r
}\r
\r
Hit intersectMoon(vec3 ro, vec3 rd)\r
{\r
    vec3 moonPosition = currentMoonPosition();\r
    float length = sphIntersect(ro, rd, Sphere(moonPosition, MOON_RADIUS));\r
\r
    if (length < 0.)\r
    {\r
        return miss;\r
    }\r
\r
    vec3 position = ro + length * rd;\r
    vec3 originalPosition = position * rotate3d(MOON_ROTATION_AXIS, -uTime * MOON_ROTATION_SPEED);\r
    vec3 color = vec3(sqrt(fbm(originalPosition * 12., 6, .5, 2., 5.)));\r
    vec3 normal = normalize(position - moonPosition);\r
\r
    return Hit(length, normal, Material(color, 1., 0.));\r
}\r
\r
Hit intersectScene(vec3 ro, vec3 rd)\r
{\r
    Hit planetHit = intersectPlanet(ro, rd);\r
    Hit moonHit = intersectMoon(ro, rd);\r
\r
    if (moonHit.len < planetHit.len)\r
    {\r
        return moonHit;\r
    }\r
\r
    return planetHit;\r
}\r
\r
vec3 radiance(vec3 ro, vec3 rd)\r
{\r
    vec3 color = vec3(0.);\r
    float spaceMask = 1.;\r
    Hit hit = intersectScene(ro, rd);\r
\r
    if (hit.len < INFINITY)\r
    {\r
        spaceMask = 0.;\r
\r
        vec3 hitPosition = ro + hit.len * rd;\r
        Hit shadowHit = intersectScene(hitPosition + EPSILON * uSunDirection, uSunDirection);\r
        float hitDirectLight = clamp(\r
            step(INFINITY, shadowHit.len) + step(length(hitPosition - uPlanetPosition) - uPlanetRadius, .1), // don't cast shadow on the planet, only the moon\r
            0.,\r
            1.);\r
\r
        // Diffuse\r
        float directLightIntensity = pow(clamp(dot(hit.normal, uSunDirection), 0.0, 1.0), 2.) * uSunIntensity; // the power softens the shadow. Not physically accurate but it looks better to me\r
        vec3 diffuseLight = hitDirectLight * directLightIntensity * SUN_COLOR;\r
        vec3 diffuseColor = hit.material.color.rgb * (uAmbientLight + diffuseLight);\r
\r
        // Phong specular\r
        vec3 reflected = normalize(reflect(-uSunDirection, hit.normal));\r
        float phongValue = pow(max(0.0, dot(rd, reflected)), 10.) * .2 * uSunIntensity;\r
        vec3 specularColor = hit.material.specular * vec3(phongValue);\r
\r
        color = diffuseColor + specularColor;\r
    }\r
    else\r
    {\r
        color = spaceColor(rd);\r
    }\r
\r
    return color + atmosphereColor(ro, rd, spaceMask, hit);\r
}\r
\r
//========//\r
//  Main  //\r
//========//\r
\r
void main()\r
{\r
    vec3 ro = vec3(CAMERA_POSITION);\r
    vec3 rd = normalize(vec3(vUv, -1));\r
\r
    vec3 color = radiance(ro, rd);\r
\r
    // color grading\r
    color = simpleReinhardToneMapping(color);\r
\r
    // vignette\r
    color *= 1. - 0.5 * pow(length(vUv), 3.);\r
\r
    gl_FragColor = vec4(color, 1.0);\r
}`,b=`uniform vec2 uResolution;\r
uniform vec2 sunDirectionXY;\r
uniform float uQuality;\r
\r
precision mediump sampler3D;\r
// out vec3 uSunDirection;\r
out vec2 vUv;\r
varying vec3 uSunDirection;\r
// varying vec2 vUv;\r
void main() {\r
    vec2 resolution = uResolution * uQuality;\r
    // uv = (position.xy - 0.5) * resolution / min(resolution.y, resolution.x);\r
    uSunDirection = normalize(vec3(sunDirectionXY, 0.));\r
    vUv = uv + vec2(-0.5,-0.5);\r
    gl_Position =  projectionMatrix * modelViewMatrix * vec4(position, 1.0);\r
}`,V={id:"robot"},F=N({__name:"planet",setup(H){let l=y(null),i,o,r,a={uTime:{value:0},uQuality:{value:Math.min(window.devicePixelRatio,2)},uRotationSpeed:{value:1},uResolution:{value:new d(window.innerWidth,window.innerHeight)},uPlanetPosition:{value:new m(0,0,-10)},uRotationOffset:{value:.6},uPlanetRadius:{value:1.9},uBumpStrength:{value:.01},uNoiseStrength:{value:.2},uTerrainScale:{value:.8},uCloudsDensity:{value:.5},uCloudsScale:{value:1},uCloudsSpeed:{value:1.5},uAtmosphereColor:{value:new m(.05,.3,.9)},uAtmosphereDensity:{value:.3},uAmbientLight:{value:.01},uSunIntensity:{value:3},sunDirectionXY:{value:new d(1,1)}},s=0,f=4/Math.max(window.innerWidth,window.innerHeight);async function p(){const n=document.querySelector("canvas").getContext("webgl2");if(!n)return;const t=await(await fetch("/img/3DNoise.bin")).arrayBuffer(),E=n.createTexture();n.bindTexture(n.TEXTURE_3D,E),n.texImage3D(n.TEXTURE_3D,0,n.R8,32,32,32,0,n.RED,n.UNSIGNED_BYTE,new Uint8Array(t)),n.texParameteri(n.TEXTURE_3D,n.TEXTURE_MIN_FILTER,n.LINEAR),n.texParameteri(n.TEXTURE_3D,n.TEXTURE_MAG_FILTER,n.LINEAR)}async function v(){return await p(),new x({uniforms:a,side:C,vertexShader:b,fragmentShader:M})}function c(n){let e=n.clientX;a.uRotationOffset.value+=(e-s)*f,s=e}async function h(){const n=new _(50,50),e=await v();new P({color:"red"});const t=new S(n,e);i.add(t),o.position.z=40,u()}function u(){l.value=requestAnimationFrame(u),a.uTime.value+=a.uRotationSpeed.value*.01,r.render(i,o)}return I(()=>{const n=document.getElementById("robot");r=new R({antialias:!0}),r.setPixelRatio(window.devicePixelRatio),r.setSize(n.offsetWidth,n.offsetHeight),n.appendChild(r.domElement),i=new g,i.background=new O(12575709);let e=n.offsetWidth/n.offsetHeight;o=new T(-10*e,10*e,10,-10,1,1e3),o.lookAt(0,0,0),window.addEventListener("mousedown",function(t){s=t.clientX,window.addEventListener("mousemove",c)}),window.addEventListener("mouseup",function(t){window.removeEventListener("mousemove",c)}),window.onresize=function(){o.updateProjectionMatrix(),r.setSize(n.offsetWidth,n.offsetHeight)},h()}),L(()=>{cancelAnimationFrame(l.value)}),(n,e)=>(w(),A("div",V))}});const z=D(F,[["__scopeId","data-v-98615313"]]);export{z as default};
