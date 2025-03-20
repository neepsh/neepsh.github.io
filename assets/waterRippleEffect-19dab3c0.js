import{g as F,W as b,S as y,d as D,O as U,T as E,V as L,c as k,a0 as T,a1 as B,aF as w,a as P,b as z,D as A,M as R}from"./three.module-1e5242ca.js";import{f as W,h as j,g as G,y as H,o as I,c as O,_ as X}from"./index-c0518ec5.js";const Y=`\r
const float delta = 1.0;\r
\r
uniform vec3 iResolution;  \r
uniform sampler2D iChannel0;\r
// uniform sampler2D iChannel1;\r
uniform vec3 iMouse;\r
uniform int iFrame;\r
varying vec2 vUv;\r
\r
// #iChannel0 "./waterRippleEffect.glsl"\r
// #iChannel0 "../file/main.png"\r
void main() {\r
    if (iFrame==0) {\r
        // gl_FragColor = vec4(0); return;\r
\r
        // float r = float(iFrame) / 100.;\r
        gl_FragColor = vec4(0.,0.,0.,1.);\r
        return;\r
    }\r
\r
    // vec4 img = texelFetch(iChannel0, ivec2(gl_FragCoord.xy), 0);\r
    // gl_FragColor = img;\r
    // return;\r
    vec2 uv = gl_FragCoord.xy / iResolution.xy;\r
\r
    // float pressure = texture2D(iChannel0, vec2(gl_FragCoord.xy)).x;\r
    // float pVel = texture2D(iChannel0, vec2(gl_FragCoord.xy)).y;\r
\r
    // float p_right = texture2D(iChannel0, vec2(gl_FragCoord.xy) + vec2(size.x, 0)).x;\r
    // float p_left = texture2D(iChannel0, vec2(gl_FragCoord.xy) + vec2(-size.x, 0)).x;\r
    // float p_up = texture2D(iChannel0, vec2(gl_FragCoord.xy) + vec2(0, size.y)).x;\r
    // float p_down = texture2D(iChannel0, vec2(gl_FragCoord.xy) + vec2(0,-size.y)).x;\r
\r
    // float pressure = texelFetch(iChannel0, ivec2(gl_FragCoord.xy), 0).x;\r
    // float pVel = texelFetch(iChannel0, ivec2(gl_FragCoord.xy), 0).y;\r
\r
    // float p_right = texelFetch(iChannel0, ivec2(gl_FragCoord.xy) + ivec2(size.x, 0), 0).x;\r
    // float p_left = texelFetch(iChannel0, ivec2(gl_FragCoord.xy) + ivec2(-size.x, 0), 0).x;\r
    // float p_up = texelFetch(iChannel0, ivec2(gl_FragCoord.xy) + ivec2(0, size.y), 0).x;\r
    // float p_down = texelFetch(iChannel0, ivec2(gl_FragCoord.xy) + ivec2(0, -size.y), 0).x;\r
\r
    // Change values so the screen boundaries aren't fixed.\r
\r
    float pressure = texelFetch(iChannel0, ivec2(gl_FragCoord.xy), 0).x;\r
    float pVel = texelFetch(iChannel0, ivec2(gl_FragCoord.xy), 0).y;\r
\r
    vec4 img = texelFetch(iChannel0, ivec2(gl_FragCoord.xy), 0);\r
    float p_right = texelFetch(iChannel0, ivec2(gl_FragCoord.xy) + ivec2(1, 0), 0).x;\r
    float p_left = texelFetch(iChannel0, ivec2(gl_FragCoord.xy) + ivec2(-1, 0), 0).x;\r
    float p_up = texelFetch(iChannel0, ivec2(gl_FragCoord.xy) + ivec2(0, 1), 0).x;\r
    float p_down = texelFetch(iChannel0, ivec2(gl_FragCoord.xy) + ivec2(0, -1), 0).x;\r
\r
    // Change values so the screen boundaries aren't fixed.\r
    if (gl_FragCoord.x == 0.5) p_left = p_right;\r
    if (gl_FragCoord.x == iResolution.x - 0.5) p_right = p_left;\r
    if (gl_FragCoord.y == 0.5) p_down = p_up;\r
    if (gl_FragCoord.y == iResolution.y - 0.5) p_up = p_down;\r
\r
    // if (uv.x <= size.x) p_left = p_right;\r
    // if (uv.x >= 1. - size.x) p_right = p_left;\r
    // if (uv.y <= size.y) p_down = p_up;\r
    // if (uv.y >= 1. - size.y) p_up = p_down;\r
    // if(img.x> 0.5) {\r
    //     img.z = 0.5;\r
    // }\r
\r
    // Apply horizontal wave function\r
    pVel += delta * (-2.0 * pressure + p_right + p_left) / 4.0;\r
    // Apply vertical wave function (these could just as easily have been one line)\r
    pVel += delta * (-2.0 * pressure + p_up + p_down) / 4.0;\r
\r
    // Change pressure by pressure velocity\r
    pressure += delta * pVel;\r
\r
    // "Spring" motion. This makes the waves look more like water waves and less like sound waves.\r
    pVel -= 0.005 * delta * pressure;\r
\r
    // Velocity damping so things eventually calm down\r
    pVel *= 1.0 - 0.002 * delta;\r
\r
    // Pressure damping to prevent it from building up forever.\r
    pressure *= 0.999;\r
    // img.x = 1.0;\r
\r
    //x = pressure. y = pressure velocity. Z and W = X and Y gradient\r
    gl_FragColor = vec4(pressure, pVel, (p_right - p_left) / 2.0, (p_up - p_down) / 2.0);\r
    // ivec2 s = ivec2(gl_FragCoord.xz);\r
    // vec2 uv = iMouse.xy / iResolution.xy;\r
    // gl_FragColor = vec4(iMouse.z,uv.y,0.,1.);\r
\r
    // gl_FragColor = img;\r
\r
    vec2 mouseUv = iMouse.xy / iResolution.xy;\r
    if (iMouse.z > 1.0) {\r
        float dist = distance(uv, mouseUv);\r
        if (dist <= .02) {\r
            // gl_FragColor = vec4(1.,0.,0.,1.);\r
            // gl_FragColor.x += 1.0 - dist / 20.0;\r
            gl_FragColor.x += 2. * (1. -dist / .02);\r
        }\r
    }\r
}`,q={id:"robot"},N=W({__name:"waterRippleEffect",setup(Z){let g=j(null),o,v,l,a=new F(500,500,0),t,i=null;return G(()=>{const r=document.getElementById("robot"),e=new b({antialias:!0});e.setPixelRatio(window.devicePixelRatio),e.setSize(r.offsetWidth,r.offsetHeight),r.appendChild(e.domElement);const s=new y,d=new y;s.background=new D(12575709);const u=1;o=new U(-u/2,u/2,u/2,-u/2,.1,1e3),o.position.z=12,o.lookAt(0,0,0),new E().load("/img/cat.jpg",n=>{M(n)}),r.addEventListener("mousedown",n=>{a.z=100,c(n),r.addEventListener("mousemove",c)}),r.addEventListener("mouseup",n=>{a.z=0,r.removeEventListener("mousemove",c)});function c(n){a.x=n.offsetX,a.y=r.offsetHeight-n.offsetY}function M(n){const{width:f,height:x}=e.getSize(new L),_=new F(f,x,e.pixelRatio);t=new k(f,x,{format:T,type:B,depthBuffer:!1,stencilBuffer:!1,minFilter:w,magFilter:w}),i=t.clone();let V=`

          uniform vec3 iResolution;  
          uniform sampler2D iChannel0;
          uniform sampler2D iChannel1;
          varying vec2 vUv;
          void main( ) {
                  // Normalized pixel coordinates (from 0 to 1)
                        
                  vec4 data = texture(iChannel0, vUv);
                  
                  // // Brightness = water height
                  // //fragColor.xyz = vec3(data.x + 1.0) / 2.0;
                  
                  // // Color = texture
                  gl_FragColor = texture(iChannel1, vUv + 0.2 * data.zw);
                  
                  // // Sunlight glint
                //   vec3 normal = normalize(vec3(-data.z, 0.2, -data.w));
                //   gl_FragColor += vec4(1) * pow(max(0.0, dot(normal, normalize(vec3(-3, 10, 3)))), 60.0);
                  // gl_FragColor = data;
                  // gl_FragColor = vec4(uv.x,uv.y,0., 1.);


                //   vec4 data1 = texture2D(iChannel1, vUv);
                //   gl_FragColor = data1;
              }
        `,m=1,h=new P(m,m);l=new z({fragmentShader:Y,vertexShader:`
            // varying vec2 vUv;
            void main() {
              gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            //   vUv = uv;
            }
          `,side:A,uniforms:{iFrame:{value:0},iResolution:{value:_},iChannel0:{value:null},iMouse:{value:a}}}),v=new z({vertexShader:`
              varying vec2 vUv;
              void main() {
                vUv = uv;
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
              
              }
            `,fragmentShader:V,uniforms:{iResolution:{value:_},iChannel0:{value:null},iChannel1:{value:n}}});let S=new R(h,l),C=new R(h,v);C.position.z=0,s.add(C),d.add(S)}window.onresize=function(){o.updateProjectionMatrix(),e.setSize(r.offsetWidth,r.offsetHeight)};function p(){if(t){l.uniforms.iChannel0.value=i.texture,e.setRenderTarget(t),e.render(d,o),l.uniforms.iFrame.value++,e.setRenderTarget(null),v.uniforms.iChannel0.value=i.texture,e.render(s,o);let n=i;i=t,t=n}g.value=requestAnimationFrame(p),e.render(s,o)}p()}),H(()=>{cancelAnimationFrame(g.value)}),(r,e)=>(I(),O("div",q))}});const $=X(N,[["__scopeId","data-v-1e685292"]]);export{$ as default};
