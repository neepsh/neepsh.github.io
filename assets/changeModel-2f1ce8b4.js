var $=Object.defineProperty;var oo=(x,e,d)=>e in x?$(x,e,{enumerable:!0,configurable:!0,writable:!0,value:d}):x[e]=d;var f=(x,e,d)=>(oo(x,typeof e!="symbol"?e+"":e,d),d);import{W as to,S as eo,d as ao,P as so,T as no,aq as ro,aA as io,M as co,g as mo,ak as k,b as lo}from"./three.module-1e5242ca.js";import{O as vo}from"./OrbitControls-0e8d32a5.js";import{f as xo,h as uo,g as fo,y as po,o as go,c as yo,_ as ho}from"./index-c0518ec5.js";const wo=`
// 定义输出的变量
varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vViewPosition;

// 定义输入的变量
attribute vec3 aCenter;
attribute vec3 toPosition;
attribute vec3 toNormal;
attribute float aRandom;

// 定义uniform变量
uniform float iTime;
uniform float iProgress;

// 引入公共函数库
#include <common>

// 定义一个旋转矩阵函数
mat4 rotation3d(vec3 axis, float angle) {
    axis = normalize(axis);
    float s = sin(angle);
    float c = cos(angle);
    float oc = 1.0 - c;

    return mat4(
      oc * axis.x * axis.x + c,           oc * axis.x * axis.y - axis.z * s,  oc * axis.z * axis.x + axis.y * s,  0.0,
      oc * axis.x * axis.y + axis.z * s,  oc * axis.y * axis.y + c,           oc * axis.y * axis.z - axis.x * s,  0.0,
      oc * axis.z * axis.x - axis.y * s,  oc * axis.y * axis.z + axis.x * s,  oc * axis.z * axis.z + c,           0.0,
      0.0,                                0.0,                                0.0,                                1.0
    );
}

// 顶点着色器主函数
void main() {
    vUv = uv;

    // 计算进度
    // float progress = iProgress;
    float progress = abs(sin(iTime));
    float sinProgress = sin(progress * PI);

    // 计算位置
    vec3 pos = mix(position,toPosition,progress);
    vec3 nor = mix(normal,toNormal,progress);

    // 计算法线
    vNormal = normalMatrix * normalize( nor );

    // 注释掉的代码，设置法线
    // vec3 nor = toNormal;

    // 计算进度值
    // float prog = uv.y;
    float prog = ((pos.y + 1.) / 2.) * 1.1;

    // 计算局部进度
    float locprog = clamp( ( sinProgress - 0.9 * prog ) / 0.2, 0. , 1. );

    // 计算变换后的位置
    vec3 transform = pos - aCenter;

    transform += 3. * aRandom * nor * locprog;

    transform += aCenter;

    // 计算旋转矩阵
    mat4 rotation = rotation3d(vec3(0.,1.,0.),aRandom * (locprog) * PI * 3.);
    // 注释掉的代码，计算旋转矩阵
  //   mat4 rotation = rotation3d(aCenter, progress * PI * 2.);

    // 应用旋转矩阵
    transform = (rotation * vec4(transform,1.)).xyz;

    // 计算模型视图矩阵
    vec4 modelViewPosition = modelViewMatrix * vec4(transform, 1.0);

    // 计算裁剪空间中的位置
    gl_Position = projectionMatrix * modelViewPosition;

    // 计算视图空间中的位置
    vViewPosition =  - modelViewPosition.xyz;
}
`,zo=`
// 定义输入的变量
varying vec3 vNormal;
varying vec2 vUv;
varying vec3 vViewPosition;
// 定义uniform变量
uniform sampler2D matcap;
uniform sampler2D matcap2;
uniform float iTime;

// 片段着色器主函数
void main() {

    // 计算视图方向
    vec3 viewDir = normalize( vViewPosition );
    // 计算x轴方向
    vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
    // 计算y轴方向
    vec3 y = cross( viewDir, x );
    // 计算uv坐标
    vec2 uv = vec2( dot( x, vNormal ), dot( y, vNormal ) ) * 0.495 + 0.5; // 0.495 to remove artifacts caused by undersized matcap disks

    // 计算进度
    float progress = abs(sin(iTime));

    // 计算matcap颜色
    vec3 matcapColor = texture2D(matcap,uv).rgb;
    vec3 matcap2Color = texture2D(matcap2,uv).rgb;

    // 计算颜色
    vec3 color = vec3(matcapColor);
    color = mix(color,matcap2Color,progress);
    vec3 color1 = mix(vec3(1.,0.,0.),vec3(0.,1.,0.),progress);

    // 设置片段颜色
    gl_FragColor = vec4(matcapColor, 1.0);
}`,bo={id:"robot"},Po=xo({__name:"changeModel",setup(x){let e=uo(null);class d extends lo{constructor(p){super();f(this,"uniforms");f(this,"defines");f(this,"side");f(this,"vertexShader");f(this,"fragmentShader");this.uniforms={...p.uniforms},this.defines={},this.side=2,this.vertexShader=wo,this.fragmentShader=zo}}return fo(()=>{const t=document.getElementById("robot"),m=new to({antialias:!0});m.setPixelRatio(window.devicePixelRatio),m.setSize(t.offsetWidth,t.offsetHeight),t.appendChild(m.domElement);const p=new eo;p.background=new ao(12575709);const u=new so(40,t.offsetWidth/t.offsetHeight,1,100);u.position.set(5,2,8);const g=new vo(u,m.domElement);g.target.set(0,.5,0),g.update(),g.enablePan=!1,g.enableDamping=!0;let F={value:0},B={value:0},E=new no;function R(v){return E.load(v)}G();function G(){const v=new ro(.82,.3,32,120).toNonIndexed(),z=new io(.6,.1,180,20,4,2).toNonIndexed();u.position.set(3,3,3);let H={iTime:F,iProgress:B,matcap2:{value:R("/img/changeModel1.png")},matcap:{value:R("/img/changeModel2.png")}};const U=new co(v,new d({uniforms:H}));p.add(U);const s=v.attributes.position.array,y=v.attributes.position.count,n=z.attributes.position.array,r=z.attributes.normal.array,L=z.attributes.position.count,b=new Float32Array(y),P=new Float32Array(y*3),h=new Float32Array(y*3),w=new Float32Array(y*3);for(let a=0;a<y;a+=3){const _=Math.random()*1,l=a%L;b[a]=_,b[a+1]=_,b[a+2]=_;const i=a*3,j=s[i],q=s[i+1],O=s[i+2],K=s[i+3],J=s[i+4],Q=s[i+5],X=s[i+6],Y=s[i+7],Z=s[i+8],c=new mo(j+K+X,q+J+Y,O+Q+Z).divideScalar(3);P.set([c.x,c.y,c.z],a*3),P.set([c.x,c.y,c.z],(a+1)*3),P.set([c.x,c.y,c.z],(a+2)*3);{const o=l*3,M=n[o],N=n[o+1],C=n[o+2],S=n[o+3],A=n[o+4],D=n[o+5],T=n[o+6],V=n[o+7],I=n[o+8];h.set([M,N,C],l*3),h.set([S,A,D],(l+1)*3),h.set([T,V,I],(l+2)*3)}{const o=l*3,M=r[o],N=r[o+1],C=r[o+2],S=r[o+3],A=r[o+4],D=r[o+5],T=r[o+6],V=r[o+7],I=r[o+8];w.set([M,N,C],l*3),w.set([S,A,D],(l+1)*3),w.set([T,V,I],(l+2)*3)}}v.setAttribute("toPosition",new k(h,3)),v.setAttribute("toNormal",new k(w,3)),W()}window.onresize=function(){u.aspect=t.offsetWidth/t.offsetHeight,u.updateProjectionMatrix(),m.setSize(t.offsetWidth,t.offsetHeight)};function W(){e.value=requestAnimationFrame(W),F.value+=.01,g.update(),m.render(p,u)}}),po(()=>{cancelAnimationFrame(e.value)}),(t,m)=>(go(),yo("div",bo))}});const So=ho(Po,[["__scopeId","data-v-3181632b"]]);export{So as default};
