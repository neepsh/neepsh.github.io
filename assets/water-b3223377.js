import{M as V,g as a,d as T,y as Q,z as Y,f as k,E as U,P as j,c as $,U as A,I as H,b as G,t as ee,J as te,W as oe,K as ae,S as ie,a as ne,T as re,q as se,C as le,L as O}from"./three.module-2e0eea6d.js";import{O as ce}from"./OrbitControls-5ebfa66f.js";import{f as ue,h as fe,g as me,y as de,o as ve,c as pe,_ as ge}from"./index-4c8cf54e.js";class he extends V{constructor(c,e={}){super(c),this.isWater=!0;const t=this,r=e.textureWidth!==void 0?e.textureWidth:512,v=e.textureHeight!==void 0?e.textureHeight:512,m=e.clipBias!==void 0?e.clipBias:0,L=e.alpha!==void 0?e.alpha:1,p=e.time!==void 0?e.time:0,g=e.waterNormals!==void 0?e.waterNormals:null,h=e.sunDirection!==void 0?e.sunDirection:new a(.70707,.70707,0),S=new T(e.sunColor!==void 0?e.sunColor:16777215),P=new T(e.waterColor!==void 0?e.waterColor:8355711),E=e.eye!==void 0?e.eye:new a(0,0,0),u=e.distortionScale!==void 0?e.distortionScale:20,b=e.side!==void 0?e.side:Q,x=e.fog!==void 0?e.fog:!1,f=new Y,d=new a,w=new a,F=new a,C=new k,R=new a(0,0,-1),l=new U,_=new a,D=new a,M=new U,z=new k,i=new j,N=new $(r,v),B={uniforms:A.merge([H.fog,H.lights,{normalSampler:{value:null},mirrorSampler:{value:null},alpha:{value:1},time:{value:0},size:{value:1},distortionScale:{value:20},textureMatrix:{value:new k},sunColor:{value:new T(8355711)},sunDirection:{value:new a(.70707,.70707,0)},eye:{value:new a},waterColor:{value:new T(5592405)}}]),vertexShader:`
				uniform mat4 textureMatrix;
				uniform float time;

				varying vec4 mirrorCoord;
				varying vec4 worldPosition;

				#include <common>
				#include <fog_pars_vertex>
				#include <shadowmap_pars_vertex>
				#include <logdepthbuf_pars_vertex>

				void main() {
					mirrorCoord = modelMatrix * vec4( position, 1.0 );
					worldPosition = mirrorCoord.xyzw;
					mirrorCoord = textureMatrix * mirrorCoord;
					vec4 mvPosition =  modelViewMatrix * vec4( position, 1.0 );
					gl_Position = projectionMatrix * mvPosition;

				#include <beginnormal_vertex>
				#include <defaultnormal_vertex>
				#include <logdepthbuf_vertex>
				#include <fog_vertex>
				#include <shadowmap_vertex>
			}`,fragmentShader:`
				uniform sampler2D mirrorSampler;
				uniform float alpha;
				uniform float time;
				uniform float size;
				uniform float distortionScale;
				uniform sampler2D normalSampler;
				uniform vec3 sunColor;
				uniform vec3 sunDirection;
				uniform vec3 eye;
				uniform vec3 waterColor;

				varying vec4 mirrorCoord;
				varying vec4 worldPosition;

				vec4 getNoise( vec2 uv ) {
					vec2 uv0 = ( uv / 103.0 ) + vec2(time / 17.0, time / 29.0);
					vec2 uv1 = uv / 107.0-vec2( time / -19.0, time / 31.0 );
					vec2 uv2 = uv / vec2( 8907.0, 9803.0 ) + vec2( time / 101.0, time / 97.0 );
					vec2 uv3 = uv / vec2( 1091.0, 1027.0 ) - vec2( time / 109.0, time / -113.0 );
					vec4 noise = texture2D( normalSampler, uv0 ) +
						texture2D( normalSampler, uv1 ) +
						texture2D( normalSampler, uv2 ) +
						texture2D( normalSampler, uv3 );
					return noise * 0.5 - 1.0;
				}

				void sunLight( const vec3 surfaceNormal, const vec3 eyeDirection, float shiny, float spec, float diffuse, inout vec3 diffuseColor, inout vec3 specularColor ) {
					vec3 reflection = normalize( reflect( -sunDirection, surfaceNormal ) );
					float direction = max( 0.0, dot( eyeDirection, reflection ) );
					specularColor += pow( direction, shiny ) * sunColor * spec;
					diffuseColor += max( dot( sunDirection, surfaceNormal ), 0.0 ) * sunColor * diffuse;
				}

				#include <common>
				#include <packing>
				#include <bsdfs>
				#include <fog_pars_fragment>
				#include <logdepthbuf_pars_fragment>
				#include <lights_pars_begin>
				#include <shadowmap_pars_fragment>
				#include <shadowmask_pars_fragment>

				void main() {

					#include <logdepthbuf_fragment>
					vec4 noise = getNoise( worldPosition.xz * size );
					vec3 surfaceNormal = normalize( noise.xzy * vec3( 1.5, 1.0, 1.5 ) );

					vec3 diffuseLight = vec3(0.0);
					vec3 specularLight = vec3(0.0);

					vec3 worldToEye = eye-worldPosition.xyz;
					vec3 eyeDirection = normalize( worldToEye );
					sunLight( surfaceNormal, eyeDirection, 100.0, 2.0, 0.5, diffuseLight, specularLight );

					float distance = length(worldToEye);

					vec2 distortion = surfaceNormal.xz * ( 0.001 + 1.0 / distance ) * distortionScale;
					vec3 reflectionSample = vec3( texture2D( mirrorSampler, mirrorCoord.xy / mirrorCoord.w + distortion ) );

					float theta = max( dot( eyeDirection, surfaceNormal ), 0.0 );
					float rf0 = 0.3;
					float reflectance = rf0 + ( 1.0 - rf0 ) * pow( ( 1.0 - theta ), 5.0 );
					vec3 scatter = max( 0.0, dot( surfaceNormal, eyeDirection ) ) * waterColor;
					vec3 albedo = mix( ( sunColor * diffuseLight * 0.3 + scatter ) * getShadowMask(), ( vec3( 0.1 ) + reflectionSample * 0.9 + reflectionSample * specularLight ), reflectance);
					vec3 outgoingLight = albedo;
					gl_FragColor = vec4( outgoingLight, alpha );

					#include <tonemapping_fragment>
					#include <fog_fragment>
				}`},n=new G({fragmentShader:B.fragmentShader,vertexShader:B.vertexShader,uniforms:A.clone(B.uniforms),lights:!0,side:b,fog:x});n.uniforms.mirrorSampler.value=N.texture,n.uniforms.textureMatrix.value=z,n.uniforms.alpha.value=L,n.uniforms.time.value=p,n.uniforms.normalSampler.value=g,n.uniforms.sunColor.value=S,n.uniforms.waterColor.value=P,n.uniforms.sunDirection.value=h,n.uniforms.distortionScale.value=u,n.uniforms.eye.value=E,t.material=n,t.onBeforeRender=function(o,Z,y){if(w.setFromMatrixPosition(t.matrixWorld),F.setFromMatrixPosition(y.matrixWorld),C.extractRotation(t.matrixWorld),d.set(0,0,1),d.applyMatrix4(C),_.subVectors(w,F),_.dot(d)>0)return;_.reflect(d).negate(),_.add(w),C.extractRotation(y.matrixWorld),R.set(0,0,-1),R.applyMatrix4(C),R.add(F),D.subVectors(w,R),D.reflect(d).negate(),D.add(w),i.position.copy(_),i.up.set(0,1,0),i.up.applyMatrix4(C),i.up.reflect(d),i.lookAt(D),i.far=y.far,i.updateMatrixWorld(),i.projectionMatrix.copy(y.projectionMatrix),z.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),z.multiply(i.projectionMatrix),z.multiply(i.matrixWorldInverse),f.setFromNormalAndCoplanarPoint(d,w),f.applyMatrix4(i.matrixWorldInverse),l.set(f.normal.x,f.normal.y,f.normal.z,f.constant);const s=i.projectionMatrix;M.x=(Math.sign(l.x)+s.elements[8])/s.elements[0],M.y=(Math.sign(l.y)+s.elements[9])/s.elements[5],M.z=-1,M.w=(1+s.elements[10])/s.elements[14],l.multiplyScalar(2/l.dot(M)),s.elements[2]=l.x,s.elements[6]=l.y,s.elements[10]=l.z+1-m,s.elements[14]=l.w,E.setFromMatrixPosition(y.matrixWorld);const q=o.getRenderTarget(),X=o.xr.enabled,J=o.shadowMap.autoUpdate;t.visible=!1,o.xr.enabled=!1,o.shadowMap.autoUpdate=!1,o.setRenderTarget(N),o.state.buffers.depth.setMask(!0),o.autoClear===!1&&o.clear(),o.render(Z,i),t.visible=!0,o.xr.enabled=X,o.shadowMap.autoUpdate=J,o.setRenderTarget(q);const I=y.viewport;I!==void 0&&o.state.viewport(I)}}}class W extends V{constructor(){const c=W.SkyShader,e=new G({name:"SkyShader",fragmentShader:c.fragmentShader,vertexShader:c.vertexShader,uniforms:A.clone(c.uniforms),side:ee,depthWrite:!1});super(new te(1,1,1),e),this.isSky=!0}}W.SkyShader={uniforms:{turbidity:{value:2},rayleigh:{value:1},mieCoefficient:{value:.005},mieDirectionalG:{value:.8},sunPosition:{value:new a},up:{value:new a(0,1,0)}},vertexShader:`
		uniform vec3 sunPosition;
		uniform float rayleigh;
		uniform float turbidity;
		uniform float mieCoefficient;
		uniform vec3 up;

		varying vec3 vWorldPosition;
		varying vec3 vSunDirection;
		varying float vSunfade;
		varying vec3 vBetaR;
		varying vec3 vBetaM;
		varying float vSunE;

		// constants for atmospheric scattering
		const float e = 2.71828182845904523536028747135266249775724709369995957;
		const float pi = 3.141592653589793238462643383279502884197169;

		// wavelength of used primaries, according to preetham
		const vec3 lambda = vec3( 680E-9, 550E-9, 450E-9 );
		// this pre-calcuation replaces older TotalRayleigh(vec3 lambda) function:
		// (8.0 * pow(pi, 3.0) * pow(pow(n, 2.0) - 1.0, 2.0) * (6.0 + 3.0 * pn)) / (3.0 * N * pow(lambda, vec3(4.0)) * (6.0 - 7.0 * pn))
		const vec3 totalRayleigh = vec3( 5.804542996261093E-6, 1.3562911419845635E-5, 3.0265902468824876E-5 );

		// mie stuff
		// K coefficient for the primaries
		const float v = 4.0;
		const vec3 K = vec3( 0.686, 0.678, 0.666 );
		// MieConst = pi * pow( ( 2.0 * pi ) / lambda, vec3( v - 2.0 ) ) * K
		const vec3 MieConst = vec3( 1.8399918514433978E14, 2.7798023919660528E14, 4.0790479543861094E14 );

		// earth shadow hack
		// cutoffAngle = pi / 1.95;
		const float cutoffAngle = 1.6110731556870734;
		const float steepness = 1.5;
		const float EE = 1000.0;

		float sunIntensity( float zenithAngleCos ) {
			zenithAngleCos = clamp( zenithAngleCos, -1.0, 1.0 );
			return EE * max( 0.0, 1.0 - pow( e, -( ( cutoffAngle - acos( zenithAngleCos ) ) / steepness ) ) );
		}

		vec3 totalMie( float T ) {
			float c = ( 0.2 * T ) * 10E-18;
			return 0.434 * c * MieConst;
		}

		void main() {

			vec4 worldPosition = modelMatrix * vec4( position, 1.0 );
			vWorldPosition = worldPosition.xyz;

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			gl_Position.z = gl_Position.w; // set z to camera.far

			vSunDirection = normalize( sunPosition );

			vSunE = sunIntensity( dot( vSunDirection, up ) );

			vSunfade = 1.0 - clamp( 1.0 - exp( ( sunPosition.y / 450000.0 ) ), 0.0, 1.0 );

			float rayleighCoefficient = rayleigh - ( 1.0 * ( 1.0 - vSunfade ) );

			// extinction (absorbtion + out scattering)
			// rayleigh coefficients
			vBetaR = totalRayleigh * rayleighCoefficient;

			// mie coefficients
			vBetaM = totalMie( turbidity ) * mieCoefficient;

		}`,fragmentShader:`
		varying vec3 vWorldPosition;
		varying vec3 vSunDirection;
		varying float vSunfade;
		varying vec3 vBetaR;
		varying vec3 vBetaM;
		varying float vSunE;

		uniform float mieDirectionalG;
		uniform vec3 up;

		const vec3 cameraPos = vec3( 0.0, 0.0, 0.0 );

		// constants for atmospheric scattering
		const float pi = 3.141592653589793238462643383279502884197169;

		const float n = 1.0003; // refractive index of air
		const float N = 2.545E25; // number of molecules per unit volume for air at 288.15K and 1013mb (sea level -45 celsius)

		// optical length at zenith for molecules
		const float rayleighZenithLength = 8.4E3;
		const float mieZenithLength = 1.25E3;
		// 66 arc seconds -> degrees, and the cosine of that
		const float sunAngularDiameterCos = 0.999956676946448443553574619906976478926848692873900859324;

		// 3.0 / ( 16.0 * pi )
		const float THREE_OVER_SIXTEENPI = 0.05968310365946075;
		// 1.0 / ( 4.0 * pi )
		const float ONE_OVER_FOURPI = 0.07957747154594767;

		float rayleighPhase( float cosTheta ) {
			return THREE_OVER_SIXTEENPI * ( 1.0 + pow( cosTheta, 2.0 ) );
		}

		float hgPhase( float cosTheta, float g ) {
			float g2 = pow( g, 2.0 );
			float inverse = 1.0 / pow( 1.0 - 2.0 * g * cosTheta + g2, 1.5 );
			return ONE_OVER_FOURPI * ( ( 1.0 - g2 ) * inverse );
		}

		void main() {

			vec3 direction = normalize( vWorldPosition - cameraPos );

			// optical length
			// cutoff angle at 90 to avoid singularity in next formula.
			float zenithAngle = acos( max( 0.0, dot( up, direction ) ) );
			float inverse = 1.0 / ( cos( zenithAngle ) + 0.15 * pow( 93.885 - ( ( zenithAngle * 180.0 ) / pi ), -1.253 ) );
			float sR = rayleighZenithLength * inverse;
			float sM = mieZenithLength * inverse;

			// combined extinction factor
			vec3 Fex = exp( -( vBetaR * sR + vBetaM * sM ) );

			// in scattering
			float cosTheta = dot( direction, vSunDirection );

			float rPhase = rayleighPhase( cosTheta * 0.5 + 0.5 );
			vec3 betaRTheta = vBetaR * rPhase;

			float mPhase = hgPhase( cosTheta, mieDirectionalG );
			vec3 betaMTheta = vBetaM * mPhase;

			vec3 Lin = pow( vSunE * ( ( betaRTheta + betaMTheta ) / ( vBetaR + vBetaM ) ) * ( 1.0 - Fex ), vec3( 1.5 ) );
			Lin *= mix( vec3( 1.0 ), pow( vSunE * ( ( betaRTheta + betaMTheta ) / ( vBetaR + vBetaM ) ) * Fex, vec3( 1.0 / 2.0 ) ), clamp( pow( 1.0 - dot( up, vSunDirection ), 5.0 ), 0.0, 1.0 ) );

			// nightsky
			float theta = acos( direction.y ); // elevation --> y-axis, [-pi/2, pi/2]
			float phi = atan( direction.z, direction.x ); // azimuth --> x-axis [-pi/2, pi/2]
			vec2 uv = vec2( phi, theta ) / vec2( 2.0 * pi, pi ) + vec2( 0.5, 0.0 );
			vec3 L0 = vec3( 0.1 ) * Fex;

			// composition + solar disc
			float sundisk = smoothstep( sunAngularDiameterCos, sunAngularDiameterCos + 0.00002, cosTheta );
			L0 += ( vSunE * 19000.0 * Fex ) * sundisk;

			vec3 texColor = ( Lin + L0 ) * 0.04 + vec3( 0.0, 0.0003, 0.00075 );

			vec3 retColor = pow( texColor, vec3( 1.0 / ( 1.2 + ( 1.2 * vSunfade ) ) ) );

			gl_FragColor = vec4( retColor, 1.0 );

			#include <tonemapping_fragment>
			#include <encodings_fragment>

		}`};const xe={id:"water"},we=ue({__name:"water",setup(K){let c=fe(null);return me(()=>{const e=new le,t=document.getElementById("water"),r=new oe({antialias:!0,alpha:!0});r.setPixelRatio(window.devicePixelRatio),r.setPixelRatio(window.devicePixelRatio),r.toneMapping=ae,r.setSize(t.offsetWidth,t.offsetHeight),t.appendChild(r.domElement);const v=new ie,m=new j(55,t.offsetWidth/t.offsetHeight,1,2e4);m.position.set(30,30,100);let L=new ne(1e4,1e4),p=new he(L,{textureWidth:512,textureHeight:512,waterNormals:new re().load("/img/waternormals.jpg",function(x){x.wrapS=x.wrapT=se}),sunDirection:new a,sunColor:16777215,waterColor:7695,distortionScale:3.7,fog:v.fog!==void 0});p.rotation.x=-Math.PI/2,v.add(p);const g=new W;g.scale.setScalar(1e4),v.add(g);const h=g.material.uniforms;h.turbidity.value=10,h.rayleigh.value=2,h.mieCoefficient.value=.005,h.mieDirectionalG.value=.8;let S=new a;const P={elevation:2,azimuth:180};function E(){const x=O.degToRad(90-P.elevation),f=O.degToRad(P.azimuth);S.setFromSphericalCoords(1,x,f),g.material.uniforms.sunPosition.value.copy(S),p.material.uniforms.sunDirection.value.copy(S).normalize()}E();const u=new ce(m,r.domElement);u.target.set(0,.5,0),u.update(),u.enablePan=!1,u.enableDamping=!0,window.onresize=function(){m.aspect=t.offsetWidth/t.offsetHeight,m.updateProjectionMatrix(),r.setSize(t.offsetWidth,t.offsetHeight)};function b(){c.value=requestAnimationFrame(b),performance.now()*.001,p.material.uniforms.time.value+=1/60,u.update(),u.update(e.getDelta()),r.render(v,m)}b()}),de(()=>{cancelAnimationFrame(c.value)}),(e,t)=>(ve(),pe("div",xe))}});const _e=ge(we,[["__scopeId","data-v-ca969a3f"]]);export{_e as default};
