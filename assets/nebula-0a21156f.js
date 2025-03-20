import{W as h,s as C,k as g,S as x,d as P,P as w,a7 as R,ay as z,b as D,T as S}from"./three.module-1e5242ca.js";import{O as A}from"./OrbitControls-0e8d32a5.js";import{R as E}from"./RoomEnvironment-3dc28ea4.js";import{D as T}from"./DRACOLoader-a13af044.js";import{f as U,h as L,g as M,y as F,o as I,c as k,_ as G}from"./index-c0518ec5.js";const W={id:"robot"},j=U({__name:"nebula",setup(B){let d=L(null);return M(()=>{const e=document.getElementById("robot"),t=new h({antialias:!0});t.setPixelRatio(window.devicePixelRatio),t.setSize(e.offsetWidth,e.offsetHeight),t.outputEncoding=C,e.appendChild(t.domElement);const u=new g(t),c=new x;c.background=new P(12575709),c.environment=u.fromScene(new E,.04).texture;const r=new w(40,e.offsetWidth/e.offsetHeight,1,100);r.position.set(30,30,30);const n=new A(r,t.domElement);n.target.set(0,.5,0),n.update(),n.enablePan=!1,n.enableDamping=!0;const p=s=>{const i={};for(const[f,l]of Object.entries(s))i[f]={value:l};return i},v={USE_ACOLOR:!1,depthTest:!1},y={near:10,far:0,fadeDistance:3,map:null,blur:0,minOpacity:0,maxOpacity:1,baseParticleSize:4.5},O=`
          varying vec2 vUv;
          varying float vOpacity;
  
          uniform float pixelRatio;
  
          uniform float near;
          uniform float far;
          uniform float fadeDistance;
          uniform float blur;
          uniform float baseParticleSize;
  
          attribute float size;
  
          #ifdef USE_ACOLOR
  
          attribute vec3 aColor;
          varying vec3 vColor;
  
          #endif
  
          void main() {
  
              #ifdef USE_ACOLOR
              vColor = aColor;
              #else 
              vUv = uv;
              #endif
  
              vec4 worldPosition = modelMatrix * vec4(position, 1.0);
              vec4 modelViewPosition = viewMatrix * worldPosition;
  
              float z = worldPosition.z;
              vOpacity = 1.;
              float scale;
              //近 前0 - 后1
              if(z > near) {
                  vOpacity = smoothstep(near + fadeDistance, near, z);
              }
              //远 前1 - 后0
              if(z < far) {
                  vOpacity = smoothstep(far - fadeDistance, far, z);
              }
              // opacity: 1 - 0
              // scale:   1-0
              scale = 1.0 - vOpacity;
              scale *= 2.;
  
              gl_PointSize = pixelRatio * (size * baseParticleSize + scale * blur);
              gl_Position = projectionMatrix * modelViewPosition;
  
          }
      `,_=`
          varying vec2 vUv;
          varying float vOpacity;
  
          uniform sampler2D alphaTexture;
          uniform sampler2D map;
          uniform float minOpacity;
          uniform float maxOpacity;
  
          #ifdef USE_ACOLOR
          varying vec3 vColor;
          #endif
  
          void main() {
              // if(vDiscard == 1.)
              //     discard;
  
              vec4 tColorAlpha = texture2D(alphaTexture, gl_PointCoord);
  
              #ifdef depthTest
              float round = 0.5 - distance(gl_PointCoord, vec2(.5));
  
              if(round < 0.1 || vOpacity < 0.1) {
                  discard;
              }
              #endif
  
              float opacity = tColorAlpha.a * min(maxOpacity, max(minOpacity, vOpacity));
  
              #ifdef USE_ACOLOR
              gl_FragColor = vec4(vColor, opacity);
              #else 
              vec4 diffuse = texture2D(map, vUv);
              gl_FragColor = vec4(diffuse.rgb, opacity);
              #endif
  
          }
      `;class b extends D{constructor(i,f){const l={...y,...i},a={pixelRatio:{value:t.getPixelRatio()},alphaTexture:{value:new S().load("/img/nebula.png")},...p(l)};console.log(a),super({vertexShader:O,fragmentShader:_,uniforms:a,transparent:!0,depthTest:!0,defines:{...v,...f}})}}let o;{const s=new T;s.setDecoderPath("/wasm/");const i={attributeIDs:{position:"POSITION",color:"COLOR",size:"GENERIC",uv:"TEX_COORD"},attributeTypes:{position:"Float32Array",color:"Float32Array",size:"Float32Array",uv:"Float32Array"},useUniqueIDs:!1};new R().setResponseType("arraybuffer").load("/model/station.drc",l=>{s.decodeGeometry(l,i).then(a=>{a.setAttribute("aColor",a.attributes.color),a.deleteAttribute("color"),a.center(),a.rotateY(Math.PI/2),o=new z(a,new b({near:10,far:-20,fadeDistance:2,blur:3,minOpacity:0,maxOpacity:1},{USE_ACOLOR:!0})),c.add(o),m()})})}window.onresize=function(){r.aspect=e.offsetWidth/e.offsetHeight,r.updateProjectionMatrix(),t.setSize(e.offsetWidth,e.offsetHeight)};function m(){d.value=requestAnimationFrame(m),n.update(),o&&(o.position.z+=.2,o.position.z>50&&(o.position.z=-10)),t.render(c,r)}}),F(()=>{cancelAnimationFrame(d.value)}),(e,t)=>(I(),k("div",W))}});const Y=G(j,[["__scopeId","data-v-76308367"]]);export{Y as default};
