var lt=Object.defineProperty;var st=(e,t,o)=>t in e?lt(e,t,{enumerable:!0,configurable:!0,writable:!0,value:o}):e[t]=o;var Z=(e,t,o)=>(st(e,typeof t!="symbol"?t+"":t,o),o);import{W as ct,S as dt,d as ft,o as ht,n as ut,P as mt,z as et,a as nt,g as $,r as it,M as ot,D as at,a_ as vt,a$ as W,T as xt,b as pt}from"./three.module-1e5242ca.js";import{O as wt}from"./OrbitControls-0e8d32a5.js";import{f as gt,h as yt,g as _t,y as bt,o as Mt,c as At,_ as zt}from"./index-c0518ec5.js";const Ct=`
            // precision mediump float;
            attribute vec3 offset;
            attribute vec4 orientation;
            attribute float halfRootAngleSin;
            attribute float halfRootAngleCos;
            attribute float stretch;
            uniform float time;
            varying vec2 vUv;
            varying float frc;


            vec3 mod289(vec3 x) {
              return x - floor(x * (1.0 / 289.0)) * 289.0;
            }

            vec2 mod289(vec2 x) {
              return x - floor(x * (1.0 / 289.0)) * 289.0;
            }

            vec3 permute(vec3 x) {
              return mod289(((x*34.0)+1.0)*x);
            }

            float snoise(vec2 v)
            {
              const vec4 C = vec4(0.211324865405187,  // (3.0-sqrt(3.0))/6.0
                  0.366025403784439,  // 0.5*(sqrt(3.0)-1.0)
                  -0.577350269189626,  // -1.0 + 2.0 * C.x
                  0.024390243902439); // 1.0 / 41.0
              // First corner
              vec2 i  = floor(v + dot(v, C.yy) );
              vec2 x0 = v -   i + dot(i, C.xx);

              // Other corners
              vec2 i1;
              //i1.x = step( x0.y, x0.x ); // x0.x > x0.y ? 1.0 : 0.0
              //i1.y = 1.0 - i1.x;
              i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
              // x0 = x0 - 0.0 + 0.0 * C.xx ;
              // x1 = x0 - i1 + 1.0 * C.xx ;
              // x2 = x0 - 1.0 + 2.0 * C.xx ;
              vec4 x12 = x0.xyxy + C.xxzz;
              x12.xy -= i1;

              // Permutations
              i = mod289(i); // Avoid truncation effects in permutation
              vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
                  + i.x + vec3(0.0, i1.x, 1.0 ));

              vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
              m = m*m ;
              m = m*m ;

              // Gradients: 41 points uniformly over a line, mapped onto a diamond.
              // The ring size 17*17 = 289 is close to a multiple of 41 (41*7 = 287)

              vec3 x = 2.0 * fract(p * C.www) - 1.0;
              vec3 h = abs(x) - 0.5;
              vec3 ox = floor(x + 0.5);
              vec3 a0 = x - ox;

              // Normalise gradients implicitly by scaling m
              // Approximation of: m *= inversesqrt( a0*a0 + h*h );
              m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );

              // Compute final noise value at P
              vec3 g;
              g.x  = a0.x  * x0.x  + h.x  * x0.y;
              g.yz = a0.yz * x12.xz + h.yz * x12.yw;
              return 130.0 * dot(m, g);
            }

            //*** END NOISE ***

            //https://www.geeks3d.com/20141201/how-to-rotate-a-vertex-by-a-quaternion-in-glsl/
            vec3 rotateVectorByQuaternion( vec3 v, vec4 q){
              return 2.0 * cross(q.xyz, v * q.w + cross(q.xyz, v)) + v;
            }

            //https://en.wikipedia.org/wiki/Slerp
            vec4 slerp(vec4 v0, vec4 v1, float t) {
              // Only unit quaternions are valid rotations.
              // Normalize to avoid undefined behavior.
              normalize(v0);
              normalize(v1);

              // Compute the cosine of the angle between the two vectors.
              float dot_ = dot(v0, v1);

              // If the dot product is negative, slerp won't take
              // the shorter path. Note that v1 and -v1 are equivalent when
              // the negation is applied to all four components. Fix by
              // reversing one quaternion.
              if (dot_ < 0.0) {
                v1 = -v1;
                dot_ = -dot_;
              }

              const float DOT_THRESHOLD = 0.9995;
              if (dot_ > DOT_THRESHOLD) {
                // If the inputs are too close for comfort, linearly interpolate
                // and normalize the result.

                vec4 result = t*(v1 - v0) + v0;
                normalize(result);
                return result;
              }

              // Since dot is in range [0, DOT_THRESHOLD], acos is safe
              float theta_0 = acos(dot_);        // theta_0 = angle between input vectors
              float theta = theta_0*t;          // theta = angle between v0 and result
              float sin_theta = sin(theta);     // compute this value only once
              float sin_theta_0 = sin(theta_0); // compute this value only once

              float s0 = cos(theta) - dot_ * sin_theta / sin_theta_0;  // == sin(theta_0 - theta) / sin(theta_0)
              float s1 = sin_theta / sin_theta_0;

              return (s0 * v0) + (s1 * v1);
            }

            //https://github.com/glslify/glsl-easings
            float circularIn(float t) {
              return 1.0 - sqrt(1.0 - t * t);
            }

            void main() {

              //Relative position of vertex along the mesh Y direction
              frc = position.y;

              //Get wind data from simplex noise
              float noise = (snoise(vec2((time-offset.x/50.0), (time-offset.z/50.0))));

              //Define the direction of an unbent blade of grass rotated around the Y axis
              vec4 direction = vec4(0.0, halfRootAngleSin, 0.0, halfRootAngleCos);

              //Interpolate between the unbent direction and the direction of growth calculated on the CPU.
              //Using the relative location of the vertex along the Y axis as the weight, we get a smooth bend
              direction = slerp(direction, orientation, frc);
              vec3 vPosition = vec3(position.x, position.y + position.y * stretch, position.z);
              vPosition = rotateVectorByQuaternion(vPosition, direction);

              //Apply wind force
              noise *= 0.6;
              vPosition.x += noise * frc;
              vPosition.z += noise * frc;

              //Bend blade instead of stretching it
              vPosition.y -= circularIn(abs(noise) * frc);

              //UV for texture
              vUv = uv;

              //Calculate final position of the vertex from the world offset and the above shenanigans
               gl_Position = projectionMatrix * modelViewMatrix * vec4( offset + vPosition, 1.0 );
            }`,Pt=`
    precision mediump float;
    uniform sampler2D map;
    uniform sampler2D alphaMap;
    varying vec2 vUv;
    varying float frc;

    void main() {
        float alpha = texture2D(alphaMap, vUv).r;
        //If transparent, don't draw
        if(alpha < 0.15){
        discard;
        }
        //Get colour data from texture
        vec4 col = vec4(texture2D(map, vUv));
        //Add more green towards root
        col = mix(vec4(0.0, 0.6, 0.0, 1.0), col, frc);
        //Add a shadow towards root
        col = mix(vec4(0.0, 0.1, 0.0, 1.0), col, frc);
        gl_FragColor = col;//vec4(1.,0.,0.,1.);
    }`;let k={};class R{constructor(t,o,i){Z(this,"x");Z(this,"y");Z(this,"z");this.x=t,this.y=o,this.z=i}dot2(t,o){return this.x*t+this.y*o}dot3(t,o,i){return this.x*t+this.y*o+this.z*i}}let St=[new R(1,1,0),new R(-1,1,0),new R(1,-1,0),new R(-1,-1,0),new R(1,0,1),new R(-1,0,1),new R(1,0,-1),new R(-1,0,-1),new R(0,1,1),new R(0,-1,1),new R(0,1,-1),new R(0,-1,-1)],rt=[151,160,137,91,90,15,131,13,201,95,96,53,194,233,7,225,140,36,103,30,69,142,8,99,37,240,21,10,23,190,6,148,247,120,234,75,0,26,197,62,94,252,219,203,117,35,11,32,57,177,33,88,237,149,56,87,174,20,125,136,171,168,68,175,74,165,71,134,139,48,27,166,77,146,158,231,83,111,229,122,60,211,133,230,220,105,92,41,55,46,245,40,244,102,143,54,65,25,63,161,1,216,80,73,209,76,132,187,208,89,18,169,200,196,135,130,116,188,159,86,164,100,109,198,173,186,3,64,52,217,226,250,124,123,5,202,38,147,118,126,255,82,85,212,207,206,59,227,47,16,58,17,182,189,28,42,223,183,170,213,119,248,152,2,44,154,163,70,221,153,101,155,167,43,172,9,129,22,39,253,19,98,108,110,79,113,224,232,178,185,112,104,218,246,97,228,251,34,242,193,238,210,144,12,191,179,162,241,81,51,145,235,249,14,239,107,49,192,214,31,181,199,106,157,184,84,204,176,115,121,50,45,127,4,150,254,138,236,205,93,222,114,67,29,24,72,243,141,128,195,78,66,215,61,156,180],r=new Array(512),m=new Array(512);k.seed=function(e){e>0&&e<1&&(e*=65536),e=Math.floor(e),e<256&&(e|=e<<8);for(let t=0;t<256;t++){let o;t&1?o=rt[t]^e&255:o=rt[t]^e>>8&255,r[t]=r[t+256]=o,m[t]=m[t+256]=St[o%12]}};k.seed(0);let Rt=.5*(Math.sqrt(3)-1),Q=(3-Math.sqrt(3))/6,Dt=1/3,I=1/6;k.simplex2=function(e,t){let o,i,l,d=(e+t)*Rt,y=Math.floor(e+d),x=Math.floor(t+d),p=(y+x)*Q,v=e-y+p,c=t-x+p,M,h;v>c?(M=1,h=0):(M=0,h=1);let w=v-M+Q,f=c-h+Q,u=v-1+2*Q,g=c-1+2*Q;y&=255,x&=255;let S=m[y+r[x]],z=m[y+M+r[x+h]],C=m[y+1+r[x+1]],_=.5-v*v-c*c;_<0?o=0:(_*=_,o=_*_*S.dot2(v,c));let n=.5-w*w-f*f;n<0?i=0:(n*=n,i=n*n*z.dot2(w,f));let a=.5-u*u-g*g;return a<0?l=0:(a*=a,l=a*a*C.dot2(u,g)),70*(o+i+l)};k.simplex3=function(e,t,o){let i,l,d,y,x=(e+t+o)*Dt,p=Math.floor(e+x),v=Math.floor(t+x),c=Math.floor(o+x),M=(p+v+c)*I,h=e-p+M,w=t-v+M,f=o-c+M,u,g,S,z,C,_;h>=w?w>=f?(u=1,g=0,S=0,z=1,C=1,_=0):h>=f?(u=1,g=0,S=0,z=1,C=0,_=1):(u=0,g=0,S=1,z=1,C=0,_=1):w<f?(u=0,g=0,S=1,z=0,C=1,_=1):h<f?(u=0,g=1,S=0,z=0,C=1,_=1):(u=0,g=1,S=0,z=1,C=1,_=0);let n=h-u+I,a=w-g+I,s=f-S+I,A=h-z+2*I,P=w-C+2*I,O=f-_+2*I,G=h-1+3*I,B=w-1+3*I,L=f-1+3*I;p&=255,v&=255,c&=255;let J=m[p+r[v+r[c]]],K=m[p+u+r[v+g+r[c+S]]],q=m[p+z+r[v+C+r[c+_]]],tt=m[p+1+r[v+1+r[c+1]]],T=.6-h*h-w*w-f*f;T<0?i=0:(T*=T,i=T*T*J.dot3(h,w,f));let U=.6-n*n-a*a-s*s;U<0?l=0:(U*=U,l=U*U*K.dot3(n,a,s));let E=.6-A*A-P*P-O*O;E<0?d=0:(E*=E,d=E*E*q.dot3(A,P,O));let H=.6-G*G-B*B-L*L;return H<0?y=0:(H*=H,y=H*H*tt.dot3(G,B,L)),32*(i+l+d+y)};function X(e){return e*e*e*(e*(e*6-15)+10)}function F(e,t,o){return(1-o)*e+o*t}k.perlin2=function(e,t){let o=Math.floor(e),i=Math.floor(t);e=e-o,t=t-i,o=o&255,i=i&255;let l=m[o+r[i]].dot2(e,t),d=m[o+r[i+1]].dot2(e,t-1),y=m[o+1+r[i]].dot2(e-1,t),x=m[o+1+r[i+1]].dot2(e-1,t-1),p=X(e);return F(F(l,y,p),F(d,x,p),X(t))};k.perlin3=function(e,t,o){let i=Math.floor(e),l=Math.floor(t),d=Math.floor(o);e=e-i,t=t-l,o=o-d,i=i&255,l=l&255,d=d&255;let y=m[i+r[l+r[d]]].dot3(e,t,o),x=m[i+r[l+r[d+1]]].dot3(e,t,o-1),p=m[i+r[l+1+r[d]]].dot3(e,t-1,o),v=m[i+r[l+1+r[d+1]]].dot3(e,t-1,o-1),c=m[i+1+r[l+r[d]]].dot3(e-1,t,o),M=m[i+1+r[l+r[d+1]]].dot3(e-1,t,o-1),h=m[i+1+r[l+1+r[d]]].dot3(e-1,t-1,o),w=m[i+1+r[l+1+r[d+1]]].dot3(e-1,t-1,o-1),f=X(e),u=X(t),g=X(o);return F(F(F(y,c,f),F(x,M,f),g),F(F(p,h,f),F(v,w,f),g),u)};const It={id:"robot"},Ft=gt({__name:"grass",setup(e){let t=yt(null),o,i,l,d=[],y=[],x=[],p=[],v=[],c=new et,M=new et,h=-.5,w=.5,f=5e4,u=120,g={value:0};async function S(){{let n=new nt(u,u,32,32);n.lookAt(new $(0,1,0));let a=new it({color:768}),s=new ot(n,a),A=s.geometry.attributes.position.array;for(let P=0;P<A.length;P+=3){const O=A[P],G=A[P+2];A[P+1]=_(O,G)}s.geometry.attributes.position.needsUpdate=!0,s.geometry.computeVertexNormals(),o.add(s)}{let n=new nt(.12,1,1,5);n.translate(0,.5,0);let a=new it({color:16711680,side:at});new ot(n,a);let s=new vt;s.index=n.index,s.setAttribute("position",n.attributes.position),s.setAttribute("uv",n.attributes.uv);for(let T=0;T<f;T++){let U=Math.random()*u-u/2,E=Math.random()*u-u/2,H=_(U,E);d.push(U,H,E);let b=Math.PI-Math.random()*(2*Math.PI);p.push(Math.sin(.5*b)),v.push(Math.cos(.5*b));let D=new $(0,1,0),j=D.x*Math.sin(b/2),V=D.y*Math.sin(b/2),N=D.z*Math.sin(b/2),Y=Math.cos(b/2);c.set(j,V,N,Y).normalize(),b=Math.random()*(w-h)+h,D=new $(1,0,0),j=D.x*Math.sin(b/2),V=D.y*Math.sin(b/2),N=D.z*Math.sin(b/2),Y=Math.cos(b/2),M.set(j,V,N,Y).normalize(),c=C(c,M),b=Math.random()*(w-h)+h,D=new $(0,0,1),j=D.x*Math.sin(b/2),V=D.y*Math.sin(b/2),N=D.z*Math.sin(b/2),Y=Math.cos(b/2),M.set(j,V,N,Y).normalize(),c=C(c,M),y.push(c.x,c.y,c.z,c.w),T<f/3?x.push(Math.random()*1.8):x.push(Math.random())}let A=new W(new Float32Array(d),3),P=new W(new Float32Array(x),1),O=new W(new Float32Array(p),1),G=new W(new Float32Array(v),1),B=new W(new Float32Array(y),4);s.setAttribute("offset",A),s.setAttribute("orientation",B),s.setAttribute("stretch",P),s.setAttribute("halfRootAngleSin",O),s.setAttribute("halfRootAngleCos",G);let L=new xt,J=L.load("/img/grass1.png"),K=L.load("/img/grass2.png"),q=new pt({uniforms:{map:{value:J},alphaMap:{value:K},time:g},vertexShader:Ct,fragmentShader:Pt,side:at}),tt=new ot(s,q);o.add(tt)}z()}function z(){t.value=requestAnimationFrame(z),g.value+=.01,l.render(o,i)}function C(n,a){let s=n.x*a.w+n.y*a.z-n.z*a.y+n.w*a.x,A=-n.x*a.z+n.y*a.w+n.z*a.x+n.w*a.y,P=n.x*a.y-n.y*a.x+n.z*a.w+n.w*a.z,O=-n.x*a.x-n.y*a.y-n.z*a.z+n.w*a.w;return new et(s,A,P,O)}function _(n,a){let s=2*k.simplex2(n/50,a/50);return s+=4*k.simplex2(n/100,a/100),s+=.2*k.simplex2(n/10,a/10),s}return _t(()=>{const n=document.getElementById("robot");l=new ct({antialias:!0}),l.setPixelRatio(window.devicePixelRatio),l.setSize(n.offsetWidth,n.offsetHeight),n.appendChild(l.domElement),k.seed(Math.random()),o=new dt,o.background=new ft(6741759);const a=new ht(16777215,.5);o.add(a);const s=new ut(16777215,1);s.position.set(5,5,5),o.add(s),i=new mt(75,window.innerWidth/window.innerHeight,.1,1e3),i.position.set(0,5,10);const A=new wt(i,l.domElement);A.enableDamping=!0,window.onresize=function(){i.updateProjectionMatrix(),l.setSize(n.offsetWidth,n.offsetHeight)},S()}),bt(()=>{cancelAnimationFrame(t.value)}),(n,a)=>(Mt(),At("div",It))}});const Et=zt(Ft,[["__scopeId","data-v-57a8edc3"]]);export{Et as default};
