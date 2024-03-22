import{O as K}from"./OrbitControls-671df778.js";import{g as Q,h as $,x as J,y as ee,o as te,c as re,_ as oe}from"./index-ec03aec8.js";import"./three.module-d899fbfe.js";const ie={id:"shader"},ne=Q({__name:"sweepPass",setup(ae){let L=$(null);return J(()=>{let T=document.getElementById("shader");var d,H,B,p,R,w,M=150;new THREE.Clock,document.getElementById("container");var b=1e3,S=b,I=b;p=new THREE.WebGLRenderer({antialias:!0,alpha:!0}),p.setPixelRatio(window.devicePixelRatio),p.setClearColor("#000"),p.setSize(T.offsetWidth,T.offsetHeight),p.toneMapping=THREE.ReinhardToneMapping,T.appendChild(p.domElement),d=new THREE.Scene,H=new THREE.PerspectiveCamera(40,T.offsetWidth/T.offsetHeight,.1,1e4),H.position.set(200,200,200),d.add(H),new K(H,p.domElement);var W=new THREE.DirectionalLight(16777215,.9);W.position.set(400,200,300),W.layers.enable(1),d.add(W),d.add(new THREE.AmbientLight(4210752)),B=new THREE.PointLight(16777215,1),H.add(B);var P=null,C=null,A=null,U=null,D=new THREE.Group;d.add(D);let x=new THREE.TextureLoader().load("/building.png");x.wrapS=THREE.RepeatWrapping,x.wrapT=THREE.RepeatWrapping,new THREE.MeshBasicMaterial({map:x});var O=new THREE.MeshPhongMaterial({transparent:!0,side:THREE.BackSide,map:new THREE.TextureLoader().load("/building_top.png")}),q=new THREE.MeshBasicMaterial({transparent:!0,map:new THREE.TextureLoader().load("/building_top.png")});R=new THREE.ShaderMaterial({uniforms:{texture:{value:x},innerCircleWidth:{value:0},circleWidth:{value:M},color:{value:new THREE.Color(0,0,1)},opacity:{value:.9},center:{value:new THREE.Vector3(0,0,0)}},vertexShader:`varying vec2 vUv;
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
    }`,transparent:!0}),w=new THREE.ShaderMaterial({uniforms:{innerCircleWidth:{value:0},circleWidth:{value:M},diff:{value:new THREE.Color(.2,.2,.2)},color:{value:new THREE.Color(0,0,1)},opacity:{value:.3},center:{value:new THREE.Vector3(0,0,0)}},vertexShader:` varying vec2 vUv;
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
    }`,transparent:!0});var N=new THREE.PlaneBufferGeometry(1e3,1e3),F=new THREE.Mesh(N,w);F.rotation.x=-Math.PI/2,d.add(F),fetch("/build1.geojson").then(e=>(console.log(e),e.json())).then(e=>{console.log(e);var t=Z(e.features);P=t.minLng,C=t.minLat,A=t.maxLng,U=t.maxLat;let l=[],i=[],o=[];for(let g=0;g<e.features.length;g++){let v=e.features[g];if(!v.geometry)return;const r=v.geometry.coordinates;switch(v.geometry.type){case"Polygon":for(let h of r){const f=h.map(G=>j(G));let m=v.properties.Floor,y=z(f,m);l.push(y);let _=k(f,m);i.push(_[0]),o.push(_[1])}break;case"MultiPolygon":for(let h of r[0]){const f=h.map(G=>j(G));let m=v.properties.Floor,y=z(f,m);l.push(y);let _=k(f,m);i.push(_[0]),o.push(_[1])}break}}let c=THREE.BufferGeometryUtils.mergeBufferGeometries(l,!1),s=new THREE.Mesh(c,R);s.rotation.x=-Math.PI/2,d.add(s);let a=THREE.BufferGeometryUtils.mergeBufferGeometries(i,!1);a=new THREE.Geometry().fromBufferGeometry(a),a.computeFaceNormals();let n=new THREE.Mesh(a,O);n.rotation.x=-Math.PI/2,d.add(n);let u=THREE.BufferGeometryUtils.mergeBufferGeometries(o,!1),E=new THREE.Mesh(u,q);E.rotation.x=-Math.PI/2,d.add(E)}),V(),window.onresize=function(){var e=T.offsetWidth,t=T.offsetHeight;H.aspect=e/t,H.updateProjectionMatrix(),p.setSize(e,t)};function V(){L.value=requestAnimationFrame(V),p.render(d,H),R.uniforms.innerCircleWidth.value+=10,R.uniforms.innerCircleWidth.value>1e3&&(R.uniforms.innerCircleWidth.value=-M),w.uniforms.innerCircleWidth.value+=10,w.uniforms.innerCircleWidth.value>1e3&&(w.uniforms.innerCircleWidth.value=-M)}function X(e,t,l,i){let o=Math.atan2(t.y-e.y,t.x-e.x),s=Math.atan2(l.y-e.y,l.x-e.x)-o;s<0?s+=2*Math.PI:s>2*Math.PI&&(s-=2*Math.PI);let a=s/2+o,n=i/Math.sin(s/2);Math.abs(n)>2*i&&(n=i);let u=n*Math.cos(a)+e.x,E=n*Math.sin(a)+e.y;return{x:2*e.x-u,y:2*e.y-E}}function Y(e,t,l){let i=e.length,o,c;return t==0?(o=e[i-2],c=e[t+1]):t==i-1?(o=e[t-1],c=e[1]):(o=e[t-1],c=e[t+1]),X(e[t],o,c,l)}function k(e,t){let l=[],i=[];THREE.ShapeUtils.isClockWise(e)&&(e=e.reverse());let o=.2,c=.1,s=t,a=e.length,n=e.map((v,r)=>{const h=Y(e,r,c),f=new THREE.Vector3(v.x,v.y,s),m=new THREE.Vector3(h.x,h.y,s),y=new THREE.Vector3(m.x,m.y,m.z-o);return l.push(f.x,f.y,f.z,m.x,m.y,m.z,y.x,y.y,y.z),r!=a-1?i.push(r*3,r*3+1,(r+1)*3+1,(r+1)*3+1,(r+1)*3,r*3,r*3+1,r*3+2,(r+1)*3+2,(r+1)*3+2,(r+1)*3+1,r*3+1):i.push(r*3,r*3+1,1,1,0,r*3,r*3+1,r*3+2,2,2,1,r*3+1),h}),u=new THREE.BufferGeometry;u.setIndex(i),u.addAttribute("position",new THREE.Float32BufferAttribute(l,3));const E=new THREE.ShapeBufferGeometry(new THREE.Shape(n)),g=new THREE.Matrix4;return g.makeTranslation(0,0,s-o),E.applyMatrix(g),[u,E]}function z(e,t){let l=t,i=t,o=[],c=[],s=[];const a=t;let n=0;THREE.ShapeUtils.isClockWise(e)&&(e=e.reverse());const u=e.length;e.forEach((h,f)=>{if(o.push(h.x,h.y,0),o.push(h.x,h.y,i),f!==0){const m=e[f-1],y=new THREE.Vector2(m.x,m.y).distanceTo(new THREE.Vector2(h.x,h.y));n+=y*2/l}s.push(n,0,n,a),f!==0&&c.push(f*2-2,f*2,f*2-1,f*2-1,f*2,f*2+1)});const E=e[0],g=e[u-1];o.push(E.x,E.y,0),o.push(E.x,E.y,i);const v=new THREE.Vector2(E.x,E.y).distanceTo(new THREE.Vector2(g.x,g.y));n+=v/l,s.push(n,0,n,a),c.push(u*2-2,u*2,u*2-1,u*2-1,u*2,u*2+1);let r=new THREE.BufferGeometry;return r.isBufferGeometry=!0,r.setIndex(c),r.addAttribute("position",new THREE.Float32BufferAttribute(o,3)),r.addAttribute("uv",new THREE.Float32BufferAttribute(s,2)),r}function Z(e){let t=180,l=-180,i=90,o=-90;for(let c of e)if(c.geometry){if(c.geometry.type==="Polygon")for(let s of c.geometry.coordinates)for(let a of s)t=t<a[0]?t:a[0],l=l>a[0]?l:a[0],i=i<a[1]?i:a[1],o=o>a[1]?o:a[1];else if(c.geometry.type==="MultiPolygon")for(let s of c.geometry.coordinates)for(let a of s)for(let n of a)t=t<n[0]?t:n[0],l=l>n[0]?l:n[0],i=i<n[1]?i:n[1],o=o>n[1]?o:n[1]}return{minLng:t,minLat:i,maxLng:l,maxLat:o}}function j(e){return new THREE.Vector2((e[0]-P)/(A-P)*S-S*.5,(e[1]-C)/(U-C)*I-I*.5)}}),ee(()=>{cancelAnimationFrame(L.value)}),(T,d)=>(te(),re("div",ie))}});const fe=oe(ne,[["__scopeId","data-v-88927ce1"]]);export{fe as default};
