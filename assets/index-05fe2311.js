import{S as g,P as b,W as f,V as x,a as y,b as _,M as w,T as h}from"./three.module-2e0eea6d.js";import{_ as T,r as D,o as M,c as E,w as l,v as r,a as s,b as c,d as v,e as u}from"./index-4c8cf54e.js";const V={name:"index",data(){return{loading:!0}},computed:{},async mounted(){const d=new g,e=new b(90,window.innerWidth/window.innerHeight,.1,1e3);e.position.set(0,0,5.5);let i=new f({antialias:!0});i.setSize(window.innerWidth,window.innerHeight),console.log(this.$refs.content),this.$refs.content.appendChild(i.domElement);const n=new x;let a=null;this.loadImg().then(t=>{const p=new y(22,13);a=new _({uniforms:{uTime:{value:0},uTexture:{value:t.img},uDepthTexture:{value:t.imgDept},uMouse:{value:n}},vertexShader:`
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
      `});const m=new w(p,a);d.add(m),o()});function o(){a.uniforms.uMouse.value=n,a.uniforms.uTime.value=performance.now()/1e3,requestAnimationFrame(o),i.render(d,e)}window.addEventListener("mousemove",t=>{n.x=t.clientX/window.innerWidth*2-1,n.y=-(t.clientY/window.innerHeight)*2+1})},methods:{loadImg(){return new Promise(d=>{let e=null,i=null;const n=new h;n.load("/img/cat.jpg",a=>{e=a,n.load("/img/cat_depth.jpg",o=>{i=o,this.loading=!1,d({img:e,imgDept:i})})})})}}},P={id:"Maske"},S={id:"center",class:"center"},C={class:"navgation flex align-center justify-center flex-wrap"},N={ref:"content",id:"bg-content"},U={id:"loading"};function k(d,e,i,n,a,o){const t=D("router-link");return M(),E("div",P,[l(s("div",S,[e[3]||(e[3]=c('<div class="wrapper" data-v-20ee2db9><div class="slash" data-v-20ee2db9></div><div class="sides" data-v-20ee2db9><div class="side" data-v-20ee2db9></div><div class="side" data-v-20ee2db9></div><div class="side" data-v-20ee2db9></div><div class="side" data-v-20ee2db9></div></div><div class="text" data-v-20ee2db9><div class="text--backing" data-v-20ee2db9>NEEP</div><div class="text--left" data-v-20ee2db9><div class="inner" data-v-20ee2db9>NEEP</div></div><div class="text--right" data-v-20ee2db9><div class="inner" data-v-20ee2db9>NEEP</div></div></div></div><div class="loading" data-v-20ee2db9><span class="status online" data-v-20ee2db9></span><span class="status invisible" data-v-20ee2db9></span><span class="status idle" data-v-20ee2db9></span><span class="status offline" data-v-20ee2db9></span></div>',2)),s("div",C,[v(t,{to:"/"},{default:u(()=>e[0]||(e[0]=[s("i",{class:"iconfont icon-wenzhangguanli"}," 主页",-1)])),_:1}),v(t,{to:"/"},{default:u(()=>e[1]||(e[1]=[s("i",{class:"iconfont icon-wenzhangguanli"},"文章列表",-1)])),_:1}),v(t,{to:"/ring"},{default:u(()=>e[2]||(e[2]=[s("i",{class:"iconfont icon-ziyuan"},"Demo",-1)])),_:1})])],512),[[r,!a.loading]]),l(s("div",N,null,512),[[r,!a.loading]]),l(s("div",U,e[4]||(e[4]=[c('<h1 data-v-20ee2db9><span style="animation-delay:0s;" data-v-20ee2db9>L</span><span style="animation-delay:0.3s;" data-v-20ee2db9>O</span><span style="animation-delay:0.6s;" data-v-20ee2db9>A</span><span style="animation-delay:0.9s;" data-v-20ee2db9>D</span><span style="animation-delay:1.2s;" data-v-20ee2db9>I</span><span style="animation-delay:1.5s;" data-v-20ee2db9>N</span><span style="animation-delay:1.8s;" data-v-20ee2db9>G</span><span style="animation-delay:2.1s;" data-v-20ee2db9>.</span><span style="animation-delay:2.4s;" data-v-20ee2db9>.</span><span style="animation-delay:2.7s;" data-v-20ee2db9>.</span></h1><div class="progress-bar" data-v-20ee2db9></div>',2)]),512),[[r,a.loading]]),e[5]||(e[5]=s("div",{class:"beian"},null,-1))])}const z=T(V,[["render",k],["__scopeId","data-v-20ee2db9"]]);export{z as default};
