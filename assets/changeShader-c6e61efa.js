import{W as S,s as x,k as h,S as w,d as b,P,l as y,C}from"./three.module-1e5242ca.js";import{O as R}from"./OrbitControls-0e8d32a5.js";import{R as z}from"./RoomEnvironment-3dc28ea4.js";import{G as E}from"./GLTFLoader-71d7d54e.js";import{D as k}from"./DRACOLoader-a13af044.js";import{f as A,h as B,g as D,y as G,o as L,c as O,_ as U}from"./index-c0518ec5.js";import"./BufferGeometryUtils-65b235e5.js";const W={id:"robot"},M=A({__name:"changeShader",setup(H){let l=B(null);return D(()=>{let i;const m=new C,t=document.getElementById("robot"),o=new S({antialias:!0});o.setPixelRatio(window.devicePixelRatio),o.setSize(t.offsetWidth,t.offsetHeight),o.outputEncoding=x,t.appendChild(o.domElement);const p=new h(o),c=new w;c.background=new b(12575709),c.environment=p.fromScene(new z,.04).texture;const a=new P(40,t.offsetWidth/t.offsetHeight,1,100);a.position.set(5,2,8);const r=new R(a,o.domElement);r.target.set(0,.5,0),r.update(),r.enablePan=!1,r.enableDamping=!0;const u=new k;u.setDecoderPath("wasm/");const f=new E;f.setDRACOLoader(u),f.load("/model/dance.glb",function(n){const d=n.scene;c.add(d);{const g={uSize:{value:50},uSpace:{value:.5},uProgress:{value:0}},s=d.getObjectByName("Ch44");console.log(s);let _=s.material.clone();s.material=_,s.material.onBeforeCompile=e=>{console.log(e.vertexShader),Object.assign(e.uniforms,g),e.vertexShader=e.vertexShader.replace("#include <common>",`
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
            `)}}i=new y(d),i.clipAction(n.animations[0]).play(),v()},void 0,function(n){console.error(n)}),window.onresize=function(){a.aspect=t.offsetWidth/t.offsetHeight,a.updateProjectionMatrix(),o.setSize(t.offsetWidth,t.offsetHeight)};function v(){l.value=requestAnimationFrame(v);const n=m.getDelta();i.update(n),r.update(),o.render(c,a)}}),G(()=>{cancelAnimationFrame(l.value)}),(i,m)=>(L(),O("div",W))}});const K=U(M,[["__scopeId","data-v-50b0760d"]]);export{K as default};
