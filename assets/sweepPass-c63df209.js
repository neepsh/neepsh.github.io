import{W as se,m as ce,S as ue,P as fe,n as me,o as ve,h as he,p as de,T as F,q as Q,j as $,r as pe,t as ge,b as J,d as T,g as C,u as ye,M as I,B as U,v as ee,F as k,w as we,x as _e,V as L,f as Me}from"./three.module-2e0eea6d.js";import{m as z}from"./BufferGeometryUtils-67ea0d0a.js";import{O as Pe}from"./OrbitControls-5ebfa66f.js";import{f as We,h as xe,g as Ce,y as Le,o as Ge,c as be,_ as Ie}from"./index-4c8cf54e.js";const Se={id:"shader"},Be=We({__name:"sweepPass",setup(Ae){let j=xe(null);return Ce(()=>{let _=document.getElementById("shader");var d,M,H,g,P,W,G=150;document.getElementById("container");var D=1e3,R=D,V=D;g=new se({antialias:!0,alpha:!0}),g.setPixelRatio(window.devicePixelRatio),g.setClearColor("#000"),g.setSize(_.offsetWidth,_.offsetHeight),g.toneMapping=ce,_.appendChild(g.domElement),d=new ue,M=new fe(40,_.offsetWidth/_.offsetHeight,.1,1e4),M.position.set(200,200,200),d.add(M),new Pe(M,g.domElement);var S=new me(16777215,.9);S.position.set(400,200,300),S.layers.enable(1),d.add(S),d.add(new ve(4210752)),H=new he(16777215,1),M.add(H);var B=null,A=null,O=null,q=null,te=new de;d.add(te);let b=new F().load("/img/building.png");b.wrapS=Q,b.wrapT=Q,new $({map:b});var re=new pe({transparent:!0,side:ge,map:new F().load("/img/building_top.png")}),oe=new $({transparent:!0,map:new F().load("img/building_top.png")});P=new J({uniforms:{texture:{value:b},innerCircleWidth:{value:0},circleWidth:{value:G},color:{value:new T(0,0,1)},opacity:{value:.9},center:{value:new C(0,0,0)}},vertexShader:`varying vec2 vUv;
    varying vec3 v_position;
    void main() {
        vUv = uv;
        v_position = position;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }`,fragmentShader:`varying vec2 vUv;
    varying vec3 v_position;

    uniform float innerCircleWidth;
    uniform float circleWidth;
    uniform float opacity;
    uniform vec3 center;

    uniform vec3 color;
    uniform sampler2D texture;
//
    void main() {
        float dis = length(v_position - center);
        if(dis < (innerCircleWidth + circleWidth) && dis > innerCircleWidth) {
            float r = (dis - innerCircleWidth) / circleWidth;
            vec4 tex = texture2D( texture, vUv);
            gl_FragColor = mix(tex, vec4(color, opacity), r);
        }else {
            gl_FragColor = texture2D( texture, vUv);
        }
    }`,transparent:!0}),W=new J({uniforms:{innerCircleWidth:{value:0},circleWidth:{value:G},diff:{value:new T(.2,.2,.2)},color:{value:new T(0,0,1)},opacity:{value:.3},center:{value:new C(0,0,0)}},vertexShader:` varying vec2 vUv;
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
    }`,transparent:!0});var ie=new ye(1e3,1e3),N=new I(ie,W);N.rotation.x=-Math.PI/2,d.add(N),fetch("/json/build.geojson").then(e=>(console.log(e),e.json())).then(e=>{console.log(e);var t=le(e.features);B=t.minLng,A=t.minLat,O=t.maxLng,q=t.maxLat;let l=[],i=[],o=[];for(let y=0;y<e.features.length;y++){let p=e.features[y];if(!p.geometry)return;const r=p.geometry.coordinates;switch(p.geometry.type){case"Polygon":for(let h of r){const u=h.map(E=>K(E));let m=p.properties.Floor,w=Z(u,m);l.push(w);let x=Y(u,m);i.push(x[0]),o.push(x[1])}break;case"MultiPolygon":for(let h of r[0]){const u=h.map(E=>K(E));let m=p.properties.Floor,w=Z(u,m);l.push(w);let x=Y(u,m);i.push(x[0]),o.push(x[1])}break}}let c=z(l,!1),s=new I(c,P);s.rotation.x=-Math.PI/2,d.add(s);let a=z(i,!1);a=new U().fromBufferGeometry(a),a.computeFaceNormals();let n=new I(a,re);n.rotation.x=-Math.PI/2,d.add(n);let f=z(o,!1),v=new I(f,oe);v.rotation.x=-Math.PI/2,d.add(v)}),X(),window.onresize=function(){var e=_.offsetWidth,t=_.offsetHeight;M.aspect=e/t,M.updateProjectionMatrix(),g.setSize(e,t)};function X(){j.value=requestAnimationFrame(X),g.render(d,M),P.uniforms.innerCircleWidth.value+=10,P.uniforms.innerCircleWidth.value>1e3&&(P.uniforms.innerCircleWidth.value=-G),W.uniforms.innerCircleWidth.value+=10,W.uniforms.innerCircleWidth.value>1e3&&(W.uniforms.innerCircleWidth.value=-G)}function ne(e,t,l,i){let o=Math.atan2(t.y-e.y,t.x-e.x),s=Math.atan2(l.y-e.y,l.x-e.x)-o;s<0?s+=2*Math.PI:s>2*Math.PI&&(s-=2*Math.PI);let a=s/2+o,n=i/Math.sin(s/2);Math.abs(n)>2*i&&(n=i);let f=n*Math.cos(a)+e.x,v=n*Math.sin(a)+e.y;return{x:2*e.x-f,y:2*e.y-v}}function ae(e,t,l){let i=e.length,o,c;return t==0?(o=e[i-2],c=e[t+1]):t==i-1?(o=e[t-1],c=e[1]):(o=e[t-1],c=e[t+1]),ne(e[t],o,c,l)}function Y(e,t){let l=[],i=[];ee.isClockWise(e)&&(e=e.reverse());let o=.2,c=.1,s=t,a=e.length,n=e.map((p,r)=>{const h=ae(e,r,c),u=new C(p.x,p.y,s),m=new C(h.x,h.y,s),w=new C(m.x,m.y,m.z-o);return l.push(u.x,u.y,u.z,m.x,m.y,m.z,w.x,w.y,w.z),r!=a-1?i.push(r*3,r*3+1,(r+1)*3+1,(r+1)*3+1,(r+1)*3,r*3,r*3+1,r*3+2,(r+1)*3+2,(r+1)*3+2,(r+1)*3+1,r*3+1):i.push(r*3,r*3+1,1,1,0,r*3,r*3+1,r*3+2,2,2,1,r*3+1),h}),f=new U;f.setIndex(i),f.setAttribute("position",new k(l,3));const v=new we(new _e(n)),y=new Me;return y.makeTranslation(0,0,s-o),v.applyMatrix4(y),[f,v]}function Z(e,t){let l=t,i=t,o=[],c=[],s=[];const a=t;let n=0;ee.isClockWise(e)&&(e=e.reverse());const f=e.length;e.forEach((h,u)=>{if(o.push(h.x,h.y,0),o.push(h.x,h.y,i),u!==0){const m=e[u-1],w=new L(m.x,m.y).distanceTo(new L(h.x,h.y));n+=w*2/l}s.push(n,0,n,a),u!==0&&c.push(u*2-2,u*2,u*2-1,u*2-1,u*2,u*2+1)});const v=e[0],y=e[f-1];o.push(v.x,v.y,0),o.push(v.x,v.y,i);const p=new L(v.x,v.y).distanceTo(new L(y.x,y.y));n+=p/l,s.push(n,0,n,a),c.push(f*2-2,f*2,f*2-1,f*2-1,f*2,f*2+1);let r=new U;return r.isBufferGeometry=!0,r.setIndex(c),r.setAttribute("position",new k(o,3)),r.setAttribute("uv",new k(s,2)),r}function le(e){let t=180,l=-180,i=90,o=-90;for(let c of e)if(c.geometry){if(c.geometry.type==="Polygon")for(let s of c.geometry.coordinates)for(let a of s)t=t<a[0]?t:a[0],l=l>a[0]?l:a[0],i=i<a[1]?i:a[1],o=o>a[1]?o:a[1];else if(c.geometry.type==="MultiPolygon")for(let s of c.geometry.coordinates)for(let a of s)for(let n of a)t=t<n[0]?t:n[0],l=l>n[0]?l:n[0],i=i<n[1]?i:n[1],o=o>n[1]?o:n[1]}return{minLng:t,minLat:i,maxLng:l,maxLat:o}}function K(e){return new L((e[0]-B)/(O-B)*R-R*.5,(e[1]-A)/(q-A)*V-V*.5)}}),Le(()=>{cancelAnimationFrame(j.value)}),(_,d)=>(Ge(),be("div",Se))}});const ke=Ie(Be,[["__scopeId","data-v-5dc81c93"]]);export{ke as default};
