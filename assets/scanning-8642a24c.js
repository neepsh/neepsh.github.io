import{W as h,Y as x,s as P,S,d as b,P as M,H as y,n as C,g as m,y as L,a2 as z,a as B,j as E,D as H,M as W}from"./three.module-1e5242ca.js";import{O as j}from"./OrbitControls-0e8d32a5.js";import{C as F}from"./ColladaLoader-5a7a3349.js";import{f as N,h as R,g as k,y as D,o as G,c as I,_ as O}from"./index-c0518ec5.js";const A={id:"obb"},q=N({__name:"scanning",setup(T){let g=R(null);return k(()=>{const e=document.getElementById("obb"),n=new h({antialias:!0});n.setPixelRatio(window.devicePixelRatio),n.setSize(e.offsetWidth,e.offsetHeight),n.toneMapping=x,n.toneMappingExposure=1.5,n.outputEncoding=P,e.appendChild(n.domElement);const t=new S;t.background=new b(12575709);const s=new M(40,e.offsetWidth/e.offsetHeight,1,100);s.position.set(5,2,18);const l=new y;l.groundColor.lerp(l.color,.5),l.intensity=.5,l.position.set(0,1,0),l.visible=!0,t.add(l);const a=new C(16777215);a.position.set(4,10,1),a.shadow.mapSize.width=2048,a.shadow.mapSize.height=2048,a.shadow.normalBias=.001,a.visible=!0,t.add(a),t.add(a.target);let f=null,i,u={nNormal:{value:new m(0,1,0).normalize()}};{const c=new z(function(){t.add(f);let r=new B(8,10),d=new E({color:268369920,side:H,wireframe:!0});i=new W(r,d),i.rotation.x=.5,console.log(i),t.add(i)});new F(c).load("/model/dae/elf.dae",function(r){console.log(r);let d=r.scene.children[0].material;console.log(d);for(let w of d)w.onBeforeCompile=o=>{o.vertexShader=o.vertexShader.replace("#include <common>",`
              #include <common>
              varying vec3 nPosition;
            `),o.vertexShader=o.vertexShader.replace("#include <project_vertex>",`
            #include <project_vertex>

            vec4 newP = modelMatrix * vec4( position, 1.0 );
             nPosition = newP.xyz ;
            `),o.fragmentShader=o.fragmentShader.replace("#include <common>",`
                #include <common>
                varying vec3 nPosition;
                uniform vec3 nNormal;
            `),o.fragmentShader=o.fragmentShader.replace("#include <dithering_fragment>",`
              #include <dithering_fragment>
              float dis =abs( dot(nNormal, nPosition) );

              if(dis < .01){
                // gl_FragColor = vec4(0.0,dis / 100.0, 0.0, 1.0);
                gl_FragColor = vec4(1.0,0.0,0.0, 1.0);
              }
            `),Object.assign(o.uniforms,u)};f=r.scene,f.position.y=-3})}let p=null;{let c=new m(0,1,0),_=new m(1,1,0),r=new m(1,-1,0);(p=new L).setFromCoplanarPoints(c,_,r)}new j(s,n.domElement).update(),window.onresize=function(){s.aspect=e.offsetWidth/e.offsetHeight,s.updateProjectionMatrix(),n.setSize(e.offsetWidth,e.offsetHeight)};function v(){if(g.value=requestAnimationFrame(v),i&&(i.rotation.x+=.01,p)){let c=p.clone().applyMatrix4(i.matrix);u.nNormal.value=c.normal.normalize()}n.render(t,s)}v()}),D(()=>{cancelAnimationFrame(g.value)}),(e,n)=>(G(),I("div",A))}});const Q=O(q,[["__scopeId","data-v-00e4f5a5"]]);export{Q as default};
