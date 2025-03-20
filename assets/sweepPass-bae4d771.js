import{W as se,m as ce,S as ue,P as fe,n as me,o as ve,h as he,p as de,T as F,q as K,j as Q,r as pe,t as ge,b as $,d as T,g as C,a as ye,M as I,u as J,B as ee,F as U,v as we,w as _e,V as L,f as Me}from"./three.module-1e5242ca.js";import{m as k}from"./BufferGeometryUtils-65b235e5.js";import{O as Pe}from"./OrbitControls-0e8d32a5.js";import{f as We,h as xe,g as Ce,y as Le,o as be,c as Ge,_ as Ie}from"./index-c0518ec5.js";const Se={id:"shader"},Ae=We({__name:"sweepPass",setup(Be){let z=xe(null);return Ce(()=>{let _=document.getElementById("shader"),d,M,j;var g,P,W,b=150;document.getElementById("container");var H=1e3,V=H,D=H;g=new se({antialias:!0,alpha:!0}),g.setPixelRatio(window.devicePixelRatio),g.setClearColor("#000"),g.setSize(_.offsetWidth,_.offsetHeight),g.toneMapping=ce,_.appendChild(g.domElement),d=new ue,M=new fe(40,_.offsetWidth/_.offsetHeight,.1,1e4),M.position.set(200,200,200),d.add(M),new Pe(M,g.domElement);var S=new me(16777215,.9);S.position.set(400,200,300),S.layers.enable(1),d.add(S),d.add(new ve(4210752)),j=new he(16777215,1),M.add(j);var A=null,B=null,R=null,O=null,te=new de;d.add(te);let G=new F().load("/img/building.png");G.wrapS=K,G.wrapT=K,new Q({map:G});var re=new pe({transparent:!0,side:ge,map:new F().load("/img/building_top.png")}),oe=new Q({transparent:!0,map:new F().load("img/building_top.png")});P=new $({uniforms:{textu:{value:G},innerCircleWidth:{value:0},circleWidth:{value:b},color:{value:new T(0,0,1)},opacity:{value:.9},center:{value:new C(0,0,0)}},vertexShader:`
      varying vec2 vUv;
      varying vec3 v_position;
      void main() {
          vUv = uv;
          v_position = position;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }`,fragmentShader:`
      varying vec2 vUv;
      varying vec3 v_position;

      uniform float innerCircleWidth;
      uniform float circleWidth;
      uniform float opacity;
      uniform vec3 center;

      uniform vec3 color;
      uniform sampler2D textu;
  //
      void main() {
          float dis = length(v_position - center);
          if(dis < (innerCircleWidth + circleWidth) && dis > innerCircleWidth) {
              float r = (dis - innerCircleWidth) / circleWidth;
              vec4 tex = texture2D( textu, vUv);
              gl_FragColor = mix(tex, vec4(color, opacity), r);
          }else {
              gl_FragColor = texture2D( textu, vUv);
          }
          //  gl_FragColor = vec4(1.,0.,0.,1.);
      }`,transparent:!0}),W=new $({uniforms:{innerCircleWidth:{value:0},circleWidth:{value:b},diff:{value:new T(.2,.2,.2)},color:{value:new T(0,0,1)},opacity:{value:.3},center:{value:new C(0,0,0)}},vertexShader:` varying vec2 vUv;
    varying vec3 v_position;
    void main() {
        vUv = uv;
        v_position = position;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }`,fragmentShader:` varying vec2 vUv;
    varying vec3 v_position;

    uniform float innerCircleWidth;
    uniform float circleWidth;
    uniform float opacity;
    uniform vec3 center;

    uniform vec3 color;
    uniform vec3 diff;

    void main() {
        float dis = length(v_position - center);
        if(dis < (innerCircleWidth + circleWidth) && dis > innerCircleWidth) {
            float r = (dis - innerCircleWidth) / circleWidth;

            gl_FragColor = mix(vec4(diff, 0.1), vec4(color, opacity), r);
        }else {
            gl_FragColor = vec4(diff, 0.1);
        }
    }`,transparent:!0});var ie=new ye(1e3,1e3),q=new I(ie,W);q.rotation.x=-Math.PI/2,d.add(q),fetch("/json/build.geojson").then(e=>e.json()).then(e=>{console.log(22222,e);var t=le(e.features);A=t.minLng,B=t.minLat,R=t.maxLng,O=t.maxLat;let a=[],i=[],o=[];for(let y=0;y<e.features.length;y++){let p=e.features[y];if(!p.geometry)return;const r=p.geometry.coordinates;switch(p.geometry.type){case"Polygon":for(let h of r){const u=h.map(E=>Z(E));let m=p.properties.Floor,w=Y(u,m);a.push(w);let x=X(u,m);i.push(x[0]),o.push(x[1])}break;case"MultiPolygon":console.log(898989);for(let h of r[0]){const u=h.map(E=>Z(E));let m=p.properties.Floor,w=Y(u,m);a.push(w);let x=X(u,m);i.push(x[0]),o.push(x[1])}break}}let c=k(a,!1),l=new I(c,P);l.rotation.x=-Math.PI/2,d.add(l);let s=k(i,!1);s.computeVertexNormals();let n=new I(s,re);n.rotation.x=-Math.PI/2,d.add(n);let f=k(o,!1),v=new I(f,oe);v.rotation.x=-Math.PI/2,d.add(v)}),N(),window.onresize=function(){var e=_.offsetWidth,t=_.offsetHeight;M.aspect=e/t,M.updateProjectionMatrix(),g.setSize(e,t)};function N(){z.value=requestAnimationFrame(N),g.render(d,M),P.uniforms.innerCircleWidth.value+=10,P.uniforms.innerCircleWidth.value>1e3&&(P.uniforms.innerCircleWidth.value=-b),W.uniforms.innerCircleWidth.value+=10,W.uniforms.innerCircleWidth.value>1e3&&(W.uniforms.innerCircleWidth.value=-b)}function ne(e,t,a,i){let o=Math.atan2(t.y-e.y,t.x-e.x),l=Math.atan2(a.y-e.y,a.x-e.x)-o;l<0?l+=2*Math.PI:l>2*Math.PI&&(l-=2*Math.PI);let s=l/2+o,n=i/Math.sin(l/2);Math.abs(n)>2*i&&(n=i);let f=n*Math.cos(s)+e.x,v=n*Math.sin(s)+e.y;return{x:2*e.x-f,y:2*e.y-v}}function ae(e,t,a){let i=e.length,o,c;return t==0?(o=e[i-2],c=e[t+1]):t==i-1?(o=e[t-1],c=e[1]):(o=e[t-1],c=e[t+1]),ne(e[t],o,c,a)}function X(e,t){let a=[],i=[];J.isClockWise(e)&&(e=e.reverse());let o=.2,c=.1,l=t,s=e.length,n=e.map((p,r)=>{const h=ae(e,r,c),u=new C(p.x,p.y,l),m=new C(h.x,h.y,l),w=new C(m.x,m.y,m.z-o);return a.push(u.x,u.y,u.z,m.x,m.y,m.z,w.x,w.y,w.z),r!=s-1?i.push(r*3,r*3+1,(r+1)*3+1,(r+1)*3+1,(r+1)*3,r*3,r*3+1,r*3+2,(r+1)*3+2,(r+1)*3+2,(r+1)*3+1,r*3+1):i.push(r*3,r*3+1,1,1,0,r*3,r*3+1,r*3+2,2,2,1,r*3+1),h}),f=new ee;f.setIndex(i),f.setAttribute("position",new U(a,3));const v=new we(new _e(n)),y=new Me;return y.makeTranslation(0,0,l-o),v.applyMatrix4(y),[f,v]}function Y(e,t){let a=t,i=t,o=[],c=[],l=[];const s=t;let n=0;J.isClockWise(e)&&(e=e.reverse());const f=e.length;e.forEach((h,u)=>{if(o.push(h.x,h.y,0),o.push(h.x,h.y,i),u!==0){const m=e[u-1],w=new L(m.x,m.y).distanceTo(new L(h.x,h.y));n+=w*2/a}l.push(n,0,n,s),u!==0&&c.push(u*2-2,u*2,u*2-1,u*2-1,u*2,u*2+1)});const v=e[0],y=e[f-1];o.push(v.x,v.y,0),o.push(v.x,v.y,i);const p=new L(v.x,v.y).distanceTo(new L(y.x,y.y));n+=p/a,l.push(n,0,n,s),c.push(f*2-2,f*2,f*2-1,f*2-1,f*2,f*2+1);let r=new ee;return r.isBufferGeometry=!0,r.setIndex(c),r.setAttribute("position",new U(o,3)),r.setAttribute("uv",new U(l,2)),r}function le(e){let t=180,a=-180,i=90,o=-90;for(let c of e)if(c.geometry){if(c.geometry.type==="Polygon")for(let l of c.geometry.coordinates)for(let s of l)t=t<s[0]?t:s[0],a=a>s[0]?a:s[0],i=i<s[1]?i:s[1],o=o>s[1]?o:s[1];else if(c.geometry.type==="MultiPolygon")for(let l of c.geometry.coordinates)for(let s of l)for(let n of s)t=t<n[0]?t:n[0],a=a>n[0]?a:n[0],i=i<n[1]?i:n[1],o=o>n[1]?o:n[1]}return{minLng:t,minLat:i,maxLng:a,maxLat:o}}function Z(e){return new L((e[0]-A)/(R-A)*V-V*.5,(e[1]-B)/(O-B)*D-D*.5)}}),Le(()=>{cancelAnimationFrame(z.value)}),(_,d)=>(be(),Ge("div",Se))}});const ke=Ie(Ae,[["__scopeId","data-v-be11d95b"]]);export{ke as default};
