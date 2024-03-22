import{S as h,P as g,W as f,V as w,a as x,b as y,M as T,T as D}from"./three.module-d899fbfe.js";import{_ as M,r as S,o as E,c as V,w as v,v as r,a as n,b as c,d as u,e as p,p as P,f as b}from"./index-ec03aec8.js";const C={name:"index",data(){return{loading:!0}},computed:{},async mounted(){const a=new h,i=new g(90,window.innerWidth/window.innerHeight,.1,1e3);i.position.set(0,0,5.5);let d=new f({antialias:!0});d.setSize(window.innerWidth,window.innerHeight),console.log(this.$refs.content),this.$refs.content.appendChild(d.domElement);const s=new w;let e=null;this.loadImg().then(t=>{const _=new x(22,13);e=new y({uniforms:{uTime:{value:0},uTexture:{value:t.img},uDepthTexture:{value:t.imgDept},uMouse:{value:s}},vertexShader:`
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,fragmentShader:`
            uniform sampler2D uTexture;
            uniform sampler2D uDepthTexture;
            uniform vec2 uMouse;
            varying vec2 vUv;
            uniform float uTime;
            void main() {
              vec4 color = texture2D(uTexture, vUv);
              vec4 depth = texture2D(uDepthTexture, vUv);
              float depthValue = depth.r;
              float x = vUv.x + (uMouse.x+sin(uTime))*0.01*depthValue;
              float y = vUv.y + (uMouse.y+cos(uTime))*0.01*depthValue;
              vec4 newColor = texture2D(uTexture, vec2(x, y));
              gl_FragColor = newColor;
            }
      `});const m=new T(_,e);a.add(m),o()});function o(){e.uniforms.uMouse.value=s,e.uniforms.uTime.value=performance.now()/1e3,requestAnimationFrame(o),d.render(a,i)}window.addEventListener("mousemove",t=>{s.x=t.clientX/window.innerWidth*2-1,s.y=-(t.clientY/window.innerHeight)*2+1})},methods:{loadImg(){return new Promise(a=>{let i=null,d=null;const s=new D;s.load("/assets/cat.jpg",e=>{i=e,s.load("/assets/cat_depth.jpg",o=>{d=o,this.loading=!1,a({img:i,imgDept:d})})})})}}},l=a=>(P("data-v-8d1109e0"),a=a(),b(),a),I={id:"Maske"},N={id:"center",class:"center"},U=p('<div class="wrapper" data-v-8d1109e0><div class="slash" data-v-8d1109e0></div><div class="sides" data-v-8d1109e0><div class="side" data-v-8d1109e0></div><div class="side" data-v-8d1109e0></div><div class="side" data-v-8d1109e0></div><div class="side" data-v-8d1109e0></div></div><div class="text" data-v-8d1109e0><div class="text--backing" data-v-8d1109e0>NEEP</div><div class="text--left" data-v-8d1109e0><div class="inner" data-v-8d1109e0>NEEP</div></div><div class="text--right" data-v-8d1109e0><div class="inner" data-v-8d1109e0>NEEP</div></div></div></div><div class="loading" data-v-8d1109e0><span class="status online" data-v-8d1109e0></span><span class="status invisible" data-v-8d1109e0></span><span class="status idle" data-v-8d1109e0></span><span class="status offline" data-v-8d1109e0></span></div>',2),k={class:"navgation flex align-center justify-center flex-wrap"},L=l(()=>n("i",{class:"iconfont icon-wenzhangguanli"}," 主页",-1)),W=l(()=>n("i",{class:"iconfont icon-wenzhangguanli"},"文章列表",-1)),z=l(()=>n("i",{class:"iconfont icon-ziyuan"},"Demo",-1)),j={ref:"content",id:"bg-content"},B={id:"loading"},G=p('<h1 data-v-8d1109e0><span style="animation-delay:0s;" data-v-8d1109e0>L</span><span style="animation-delay:0.3s;" data-v-8d1109e0>O</span><span style="animation-delay:0.6s;" data-v-8d1109e0>A</span><span style="animation-delay:0.9s;" data-v-8d1109e0>D</span><span style="animation-delay:1.2s;" data-v-8d1109e0>I</span><span style="animation-delay:1.5s;" data-v-8d1109e0>N</span><span style="animation-delay:1.8s;" data-v-8d1109e0>G</span><span style="animation-delay:2.1s;" data-v-8d1109e0>.</span><span style="animation-delay:2.4s;" data-v-8d1109e0>.</span><span style="animation-delay:2.7s;" data-v-8d1109e0>.</span></h1><div class="progress-bar" data-v-8d1109e0></div>',2),H=[G],$=l(()=>n("div",{class:"beian"},null,-1));function A(a,i,d,s,e,o){const t=S("router-link");return E(),V("div",I,[v(n("div",N,[U,n("div",k,[c(t,{to:"/"},{default:u(()=>[L]),_:1}),c(t,{to:"/"},{default:u(()=>[W]),_:1}),c(t,{to:"/ring"},{default:u(()=>[z]),_:1})])],512),[[r,!e.loading]]),v(n("div",j,null,512),[[r,!e.loading]]),v(n("div",B,H,512),[[r,e.loading]]),$])}const O=M(C,[["render",A],["__scopeId","data-v-8d1109e0"]]);export{O as default};
