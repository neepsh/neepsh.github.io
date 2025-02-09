import{W as S,s as x,k as h,S as b,d as w,P,l as y,C}from"./three.module-2e0eea6d.js";import{O as R}from"./OrbitControls-5ebfa66f.js";import{R as z}from"./RoomEnvironment-c79c43e7.js";import{D as E,G as k}from"./DRACOLoader-4c692e32.js";import{f as A,h as B,g as D,y as G,o as L,c as O,_ as U}from"./index-4c8cf54e.js";import"./BufferGeometryUtils-67ea0d0a.js";const W={id:"robot"},M=A({__name:"changeShader",setup(H){let d=B(null);return D(()=>{let i;const m=new C,t=document.getElementById("robot"),n=new S({antialias:!0});n.setPixelRatio(window.devicePixelRatio),n.setSize(t.offsetWidth,t.offsetHeight),n.outputEncoding=x,t.appendChild(n.domElement);const p=new h(n),c=new b;c.background=new w(12575709),c.environment=p.fromScene(new z,.04).texture;const a=new P(40,t.offsetWidth/t.offsetHeight,1,100);a.position.set(5,2,8);const r=new R(a,n.domElement);r.target.set(0,.5,0),r.update(),r.enablePan=!1,r.enableDamping=!0;const u=new E;u.setDecoderPath("gltf/");const f=new k;f.setDRACOLoader(u),f.load("/model/dance.glb",function(o){const l=o.scene;c.add(l);{const g={uSize:{value:50},uSpace:{value:.5},uProgress:{value:0}},s=l.getObjectByName("Ch44");console.log(s);let _=s.material.clone();s.material=_,s.material.onBeforeCompile=e=>{console.log(e.vertexShader),Object.assign(e.uniforms,g),e.vertexShader=e.vertexShader.replace("#include <common>",`
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
            `)}}i=new y(l),i.clipAction(o.animations[0]).play(),v()},void 0,function(o){console.error(o)}),window.onresize=function(){a.aspect=t.offsetWidth/t.offsetHeight,a.updateProjectionMatrix(),n.setSize(t.offsetWidth,t.offsetHeight)};function v(){d.value=requestAnimationFrame(v);const o=m.getDelta();i.update(o),r.update(),n.render(c,a)}}),G(()=>{cancelAnimationFrame(d.value)}),(i,m)=>(L(),O("div",W))}});const J=U(M,[["__scopeId","data-v-b993b0f3"]]);export{J as default};
