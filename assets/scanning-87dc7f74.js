import{W as p,L as h,s as _,S as v,d as w,P as x,H as b,I as C,b as M,J as L}from"./three.module-d899fbfe.js";import{O as S}from"./OrbitControls-671df778.js";import{C as y}from"./ColladaLoader-56c953ad.js";import{g as E,h as V,x as F,y as H,o as P,c as W,_ as z}from"./index-ec03aec8.js";const B={id:"obb"},I=E({__name:"scanning",setup(R){let c=V(null);return F(()=>{const e=document.getElementById("obb"),t=new p({antialias:!0});t.setPixelRatio(window.devicePixelRatio),t.setSize(e.offsetWidth,e.offsetHeight),t.toneMapping=h,t.toneMappingExposure=1.5,t.outputEncoding=_,e.appendChild(t.domElement);const o=new v;o.background=new w(12575709);const a=new x(40,e.offsetWidth/e.offsetHeight,1,100);a.position.set(5,2,18);const i=new b;i.groundColor.lerp(i.color,.5),i.intensity=.5,i.position.set(0,1,0),i.visible=!0,o.add(i);const n=new C(16777215);n.position.set(4,10,1),n.shadow.mapSize.width=2048,n.shadow.mapSize.height=2048,n.shadow.normalBias=.001,n.visible=!0,o.add(n),o.add(n.target);let r=null,m=new M({uniforms:{time:{value:0},max:{value:130},min:{value:0}},transparent:!0,vertexShader:`
            uniform float time;
            uniform float max;
            uniform float min;
            varying vec2 uVu;
            void main() {
               
                gl_Position =  projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
                uVu = vec2((position.y - min) /( max - min),0.5);
             
            }`,fragmentShader:`
          varying vec2 uVu;
          uniform float time;
                void main() {

                  float h = time;//(sin(time) + 1.0)/2.0;
                  // gl_FragColor = vec4( 1.0,0.0,0.0,0.2);
                  if(h >uVu.x  && h-0.02 < uVu.x ){

                    //计算顶点到当前高度的距离

                    float dis = abs(h-uVu.x)/0.02;
                    // gl_FragColor = vec4( dis,1.0 - dis, 0.0,1.0-dis);
                    gl_FragColor = vec4( dis,1.0 - dis, 0.0,0.2);
                  }else {
                    gl_FragColor = vec4( 1.0,0.0,0.0,0.2);
                  }
                  
                }
                
            `});{const g=new L(function(){o.add(r)});new y(g).load("/elf.dae",function(l){l.scene.children[0].material=m,console.log(l),r=l.scene,r.position.x=5})}const u=new S(a,t.domElement);u.target.set(0,.5,0),u.update(),window.onresize=function(){a.aspect=e.offsetWidth/e.offsetHeight,a.updateProjectionMatrix(),t.setSize(e.offsetWidth,e.offsetHeight)};let s=0,d=.001;function f(){c.value=requestAnimationFrame(f),s+=d,(s>.35||s<0)&&(d=-d),m.uniforms.time.value=s,t.render(o,a)}f()}),H(()=>{cancelAnimationFrame(c.value)}),(e,t)=>(P(),W("div",B))}});const q=z(I,[["__scopeId","data-v-c57b1729"]]);export{q as default};
