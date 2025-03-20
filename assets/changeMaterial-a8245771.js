import{W as A,S as W,d as N,P as k,T as L,g as z,b as R,M as q,ak as _}from"./three.module-1e5242ca.js";import{O as B}from"./OrbitControls-0e8d32a5.js";import{G as E}from"./GLTFLoader-71d7d54e.js";import{f as H,h as O,g as T,y as U,o as G,c as j,_ as $}from"./index-c0518ec5.js";import"./BufferGeometryUtils-65b235e5.js";const J={id:"robot"},K=H({__name:"changeMaterial",setup(Q){let p=O(null);return T(()=>{const o=document.getElementById("robot"),n=new A({antialias:!0});n.setPixelRatio(window.devicePixelRatio),n.setSize(o.offsetWidth,o.offsetHeight),o.appendChild(n.domElement);const f=new W;f.background=new N(12575709);const r=new k(40,o.offsetWidth/o.offsetHeight,1,100);r.position.set(5,2,8);const g=new B(r,n.domElement);g.target.set(0,.5,0),g.update(),g.enablePan=!1,g.enableDamping=!0;let s={value:0},u=new L;function h(){let c=`
      vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
      vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}
      vec3 fade(vec3 t) {return t*t*t*(t*(t*6.0-15.0)+10.0);}
  
      float noise(vec3 P){
          vec3 Pi0 = floor(P); // Integer part for indexing
          vec3 Pi1 = Pi0 + vec3(1.0); // Integer part + 1
          Pi0 = mod(Pi0, 289.0);
          Pi1 = mod(Pi1, 289.0);
          vec3 Pf0 = fract(P); // Fractional part for interpolation
          vec3 Pf1 = Pf0 - vec3(1.0); // Fractional part - 1.0
          vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);
          vec4 iy = vec4(Pi0.yy, Pi1.yy);
          vec4 iz0 = Pi0.zzzz;
          vec4 iz1 = Pi1.zzzz;
  
          vec4 ixy = permute(permute(ix) + iy);
          vec4 ixy0 = permute(ixy + iz0);
          vec4 ixy1 = permute(ixy + iz1);
  
          vec4 gx0 = ixy0 / 7.0;
          vec4 gy0 = fract(floor(gx0) / 7.0) - 0.5;
          gx0 = fract(gx0);
          vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);
          vec4 sz0 = step(gz0, vec4(0.0));
          gx0 -= sz0 * (step(0.0, gx0) - 0.5);
          gy0 -= sz0 * (step(0.0, gy0) - 0.5);
  
          vec4 gx1 = ixy1 / 7.0;
          vec4 gy1 = fract(floor(gx1) / 7.0) - 0.5;
          gx1 = fract(gx1);
          vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);
          vec4 sz1 = step(gz1, vec4(0.0));
          gx1 -= sz1 * (step(0.0, gx1) - 0.5);
          gy1 -= sz1 * (step(0.0, gy1) - 0.5);
  
          vec3 g000 = vec3(gx0.x,gy0.x,gz0.x);
          vec3 g100 = vec3(gx0.y,gy0.y,gz0.y);
          vec3 g010 = vec3(gx0.z,gy0.z,gz0.z);
          vec3 g110 = vec3(gx0.w,gy0.w,gz0.w);
          vec3 g001 = vec3(gx1.x,gy1.x,gz1.x);
          vec3 g101 = vec3(gx1.y,gy1.y,gz1.y);
          vec3 g011 = vec3(gx1.z,gy1.z,gz1.z);
          vec3 g111 = vec3(gx1.w,gy1.w,gz1.w);
  
          vec4 norm0 = taylorInvSqrt(vec4(dot(g000, g000), dot(g010, g010), dot(g100, g100), dot(g110, g110)));
          g000 *= norm0.x;
          g010 *= norm0.y;
          g100 *= norm0.z;
          g110 *= norm0.w;
          vec4 norm1 = taylorInvSqrt(vec4(dot(g001, g001), dot(g011, g011), dot(g101, g101), dot(g111, g111)));
          g001 *= norm1.x;
          g011 *= norm1.y;
          g101 *= norm1.z;
          g111 *= norm1.w;
  
          float n000 = dot(g000, Pf0);
          float n100 = dot(g100, vec3(Pf1.x, Pf0.yz));
          float n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));
          float n110 = dot(g110, vec3(Pf1.xy, Pf0.z));
          float n001 = dot(g001, vec3(Pf0.xy, Pf1.z));
          float n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));
          float n011 = dot(g011, vec3(Pf0.x, Pf1.yz));
          float n111 = dot(g111, Pf1);
  
          vec3 fade_xyz = fade(Pf0);
          vec4 n_z = mix(vec4(n000, n100, n010, n110), vec4(n001, n101, n011, n111), fade_xyz.z);
          vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);
          float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x); 
          return 2.2 * n_xyz;
      }`,t={value:new z(-.02,.2,.7)},x={value:u.load("/img/changeModel2.png")},v={value:u.load("/img/changeMaterial.png")};const l=new R({uniforms:{matcap:x,matcap2:v,startPoint:t,iProgress:s},vertexShader:`
          varying vec2 vUv;
          varying vec3 vNormal;
          varying vec3 vPosition;
          varying vec3 vViewPosition;
  
          attribute float aRandom;
          attribute vec3 aCenter;
          uniform float iProgress;
          uniform vec3 startPoint;
  
          #include <common>
  
          mat4 rotation3d(vec3 axis, float angle) {
              axis = normalize(axis);
              float s = sin(angle);
              float c = cos(angle);
              float oc = 1.0 - c;
                            
              return mat4(
                oc * axis.x * axis.x + c,           oc * axis.x * axis.y - axis.z * s,  oc * axis.z * axis.x + axis.y * s,  0.0,
                oc * axis.x * axis.y + axis.z * s,  oc * axis.y * axis.y + c,           oc * axis.y * axis.z - axis.x * s,  0.0,
                oc * axis.z * axis.x - axis.y * s,  oc * axis.y * axis.z + axis.x * s,  oc * axis.z * axis.z + c,           0.0,
                0.0,                                0.0,                                0.0,                                1.0
              );
          }
  
          void main() {
              vUv = uv;
  
              //世界坐标系下的法线
              vNormal = normalMatrix * normalize( normal );
  
              vPosition = position;
  
              vec3 transform = position - aCenter;
  
              // 
              // vec4 modelPosition = modelMatrix * vec4(transform, 1.0);
              // 
              // vec4 modelViewPosition = viewMatrix * modelPosition;
  
              // gl_Position = projectionMatrix * modelViewPosition;
              // // 相机坐标系下的位置
              // vViewPosition =  - modelViewPosition.xyz;
  
              float distancePoint = distance( startPoint, position );
  
              float percent = iProgress * 4.;
                              
              float diff = percent - distancePoint;
  
              distancePoint = diff * 1.;
                              
              distancePoint = clamp( distancePoint, 0., 1.);
  
              // float intensity = smoothstep( 0., iProgress * 4.,distancePoint);
              float intensity = distancePoint;
  
              // mat4 rotation = rotation3d(vec3(normal), PI * 2. * intensity);
              mat4 rotation = rotation3d(vec3(normal), PI * 2. * intensity);
  
              transform += ((( normal * intensity ) * position * (1.0 - intensity))) / 2.;
              transform = (rotation * vec4(transform,1.)).xyz;
              // transform = (rotation * vec4(transform,1.)).xyz;
  
              transform += aCenter;
              // 世界坐标
              vec4 modelPosition = modelMatrix * vec4(transform, 1.0);
              // 相机坐标系下的位置
              vec4 modelViewPosition = viewMatrix * modelPosition;
  
              gl_Position = projectionMatrix * modelViewPosition;
  
              vViewPosition =  - modelViewPosition.xyz;
          }`,fragmentShader:`
          varying vec3 vNormal;
          varying vec2 vUv;
          varying vec3 vPosition;
          varying vec3 vViewPosition;
  
          uniform float iProgress;
          uniform vec3 startPoint;
          uniform sampler2D matcap;
          uniform sampler2D matcap2;
  
          ${c}
  
          void main() {
              // 相机视线
              vec3 viewDir = normalize( vViewPosition );
                              // 
              vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
              vec3 y = cross( viewDir, x );
              vec2 uv = vec2( dot( x, vNormal ), dot( y, vNormal ) ) * 0.495 + 0.5; // 0.495 to remove artifacts caused by undersized matcap disks
  
              float noiseVal = noise(vPosition * 20.);
  
              float distancePoint = distance( startPoint, vPosition );
  
              //TODO 受物体的体积影响
              float intensity = smoothstep( 0., iProgress * 4.,distancePoint);
                              
                             
  
              float range = (1.0 - intensity) * pow( intensity, (iProgress + 2.) * 8.) * 100.;
              range = (range * noiseVal * 3.) + pow(intensity,2.);
  
              // matcapColor = vec3(range);
  
              range = clamp(range,0.,1.);
              // range = smoothstep(0.,1.,range);
  
              vec3 matcapColor = texture2D(matcap,uv).rgb;
              vec3 matcapColor2 = texture2D(matcap2,uv).rgb;
  
              matcapColor = mix(matcapColor2,matcapColor,range);
                              // matcapColor *= vec3((noiseVal) * intensity);
  
              gl_FragColor = vec4(matcapColor, 1.0);
              // gl_FragColor = vec4(vec3(1.,0.,0.), 1.0);
          }`});new E().load("/model/猴头.glb",function(m){r.position.copy(new z(3,3,3)),r.updateMatrixWorld(),m.scene.traverse(e=>{if(e.type=="Mesh"){const d=e.geometry.toNonIndexed();b(d);const P=new q(d,l);f.add(P)}})})}function b(c){const t=c.attributes.position.array,x=c.attributes.position.count,v=new Float32Array(x),l=new Float32Array(x*3);for(let a=0;a<x;a+=3){const m=Math.random()*1;v[a]=m,v[a+1]=m,v[a+2]=m;const e=a*3,d=t[e],P=t[e+1],M=t[e+2],C=t[e+3],V=t[e+4],I=t[e+5],S=t[e+6],D=t[e+7],F=t[e+8],i=new z(d+C+S,P+V+D,M+I+F).divideScalar(3);l.set([i.x,i.y,i.z],a*3),l.set([i.x,i.y,i.z],(a+1)*3),l.set([i.x,i.y,i.z],(a+2)*3)}c.setAttribute("aRandom",new _(v,1)),c.setAttribute("aCenter",new _(l,3)),w()}h(),window.onresize=function(){r.aspect=o.offsetWidth/o.offsetHeight,r.updateProjectionMatrix(),n.setSize(o.offsetWidth,o.offsetHeight)};let y=!1;function w(){p.value=requestAnimationFrame(w),g.update(),s.value>.999&&(y=!1),s.value<0&&(y=!0),y?s.value+=.01:s.value=s.value-.01,n.render(f,r)}}),U(()=>{cancelAnimationFrame(p.value)}),(o,n)=>(G(),j("div",J))}});const oe=$(K,[["__scopeId","data-v-267815ec"]]);export{oe as default};
