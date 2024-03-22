import{W as S,s as x,k as h,S as w,d as b,P,l as y,C}from"./three.module-d899fbfe.js";import{O as R}from"./OrbitControls-671df778.js";import{R as z,D as E,G as k}from"./DRACOLoader-36ea9956.js";import{g as A,h as B,x as D,y as G,o as L,c as O,_ as U}from"./index-ec03aec8.js";const W={id:"robot"},M=A({__name:"changeShader",setup(H){let d=B(null);return D(()=>{let i;const m=new C,t=document.getElementById("robot"),n=new S({antialias:!0});n.setPixelRatio(window.devicePixelRatio),n.setSize(t.offsetWidth,t.offsetHeight),n.outputEncoding=x,t.appendChild(n.domElement);const g=new h(n),c=new w;c.background=new b(12575709),c.environment=g.fromScene(new z,.04).texture;const a=new P(40,t.offsetWidth/t.offsetHeight,1,100);a.position.set(5,2,8);const r=new R(a,n.domElement);r.target.set(0,.5,0),r.update(),r.enablePan=!1,r.enableDamping=!0;const u=new E;u.setDecoderPath("gltf/");const f=new k;f.setDRACOLoader(u),f.load("/dance.glb",function(o){const s=o.scene;c.add(s),console.log(s);{const p={uSize:{value:50},uSpace:{value:.5},uProgress:{value:0}},l=s.getObjectByName("Ch44");console.log(l);let _=l.material.clone();l.material=_,l.material.onBeforeCompile=e=>{console.log(e.vertexShader),Object.assign(e.uniforms,p),e.vertexShader=e.vertexShader.replace("#include <common>",`
                #include <common>
                varying vec2 vUv;
                uniform float uProgress;
            `),e.vertexShader=e.vertexShader.replace("#include <uv_vertex>",`
                #include <uv_vertex>
                vUv = uv;
            `),e.vertexShader=e.vertexShader.replace("#include <begin_vertex>",`
                #include <begin_vertex>
                transformed.x += sin(uProgress);
                transformed.y += sin(uProgress);
                transformed.z += sin(uProgress);
            `),e.fragmentShader=e.fragmentShader.replace("#include <common>",`
                #include <common>
                varying vec2 vUv;
                uniform float uSize;
                uniform float uSpace;
            `),e.fragmentShader=e.fragmentShader.replace("#include <dithering_fragment>",`
                #include <dithering_fragment>
                float sx =float(fract(uSize * vUv.x) > uSpace);
                float sy =float(fract(uSize * vUv.y) > uSpace);
                if(sx*sy == 0.0) discard;
            `)}}i=new y(s),i.clipAction(o.animations[0]).play(),v()},void 0,function(o){console.error(o)}),window.onresize=function(){a.aspect=t.offsetWidth/t.offsetHeight,a.updateProjectionMatrix(),n.setSize(t.offsetWidth,t.offsetHeight)};function v(){d.value=requestAnimationFrame(v);const o=m.getDelta();i.update(o),r.update(),n.render(c,a)}}),G(()=>{cancelAnimationFrame(d.value)}),(i,m)=>(L(),O("div",W))}});const N=U(M,[["__scopeId","data-v-14174f81"]]);export{N as default};
