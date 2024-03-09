import{S as _,P as h,W as b,V as g,a as w,b as x,M as y,T}from"./three.module-d899fbfe.js";import{_ as D,r as M,o as S,c as E,w as l,v,a as n,b as r,d as u,e as p,p as V,f as P}from"./index-0d4a0f96.js";const C={name:"index",data(){return{loading:!0}},computed:{},async mounted(){const a=new _,i=new h(90,window.innerWidth/window.innerHeight,.1,1e3);i.position.set(0,0,5.5);let d=new b({antialias:!0});d.setSize(window.innerWidth,window.innerHeight),console.log(this.$refs.content),this.$refs.content.appendChild(d.domElement);const s=new g;let e=null;this.loadImg().then(t=>{const f=new w(22,13);e=new x({uniforms:{uTime:{value:0},uTexture:{value:t.img},uDepthTexture:{value:t.imgDept},uMouse:{value:s}},vertexShader:`
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
      `});const m=new y(f,e);a.add(m),c()});function c(){e.uniforms.uMouse.value=s,e.uniforms.uTime.value=performance.now()/1e3,requestAnimationFrame(c),d.render(a,i)}window.addEventListener("mousemove",t=>{s.x=t.clientX/window.innerWidth*2-1,s.y=-(t.clientY/window.innerHeight)*2+1})},methods:{loadImg(){return new Promise(a=>{let i=null,d=null;const s=new T;s.load("http://demo.neep.fun/img/cat.jpg",e=>{i=e,s.load("http://demo.neep.fun/img/cat_depth.jpg",c=>{d=c,this.loading=!1,a({img:i,imgDept:d})})})})}}},o=a=>(V("data-v-cdfe48cb"),a=a(),P(),a),I={id:"Maske"},N={id:"center",class:"center"},U=p('<div class="wrapper" data-v-cdfe48cb><div class="slash" data-v-cdfe48cb></div><div class="sides" data-v-cdfe48cb><div class="side" data-v-cdfe48cb></div><div class="side" data-v-cdfe48cb></div><div class="side" data-v-cdfe48cb></div><div class="side" data-v-cdfe48cb></div></div><div class="text" data-v-cdfe48cb><div class="text--backing" data-v-cdfe48cb>NEEP</div><div class="text--left" data-v-cdfe48cb><div class="inner" data-v-cdfe48cb>NEEP</div></div><div class="text--right" data-v-cdfe48cb><div class="inner" data-v-cdfe48cb>NEEP</div></div></div></div><div class="loading" data-v-cdfe48cb><span class="status online" data-v-cdfe48cb></span><span class="status invisible" data-v-cdfe48cb></span><span class="status idle" data-v-cdfe48cb></span><span class="status offline" data-v-cdfe48cb></span></div>',2),k={class:"navgation flex align-center justify-center flex-wrap"},L=o(()=>n("i",{class:"iconfont icon-wenzhangguanli"}," 主页",-1)),W=o(()=>n("i",{class:"iconfont icon-wenzhangguanli"},"文章列表",-1)),z=o(()=>n("i",{class:"iconfont icon-ziyuan"},"Demo",-1)),j={ref:"content",id:"bg-content"},B={id:"loading"},G=p('<h1 data-v-cdfe48cb><span style="animation-delay:0s;" data-v-cdfe48cb>L</span><span style="animation-delay:0.3s;" data-v-cdfe48cb>O</span><span style="animation-delay:0.6s;" data-v-cdfe48cb>A</span><span style="animation-delay:0.9s;" data-v-cdfe48cb>D</span><span style="animation-delay:1.2s;" data-v-cdfe48cb>I</span><span style="animation-delay:1.5s;" data-v-cdfe48cb>N</span><span style="animation-delay:1.8s;" data-v-cdfe48cb>G</span><span style="animation-delay:2.1s;" data-v-cdfe48cb>.</span><span style="animation-delay:2.4s;" data-v-cdfe48cb>.</span><span style="animation-delay:2.7s;" data-v-cdfe48cb>.</span></h1><div class="progress-bar" data-v-cdfe48cb></div>',2),H=[G],$=o(()=>n("div",{class:"beian"},null,-1));function A(a,i,d,s,e,c){const t=M("router-link");return S(),E("div",I,[l(n("div",N,[U,n("div",k,[r(t,{to:"/"},{default:u(()=>[L]),_:1}),r(t,{to:"/"},{default:u(()=>[W]),_:1}),r(t,{to:"/ring"},{default:u(()=>[z]),_:1})])],512),[[v,!e.loading]]),l(n("div",j,null,512),[[v,!e.loading]]),l(n("div",B,H,512),[[v,e.loading]]),$])}const O=D(C,[["render",A],["__scopeId","data-v-cdfe48cb"]]);export{O as default};
