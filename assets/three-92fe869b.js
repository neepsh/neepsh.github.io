/* empty css                */import{f as l,g as c,o as u,c as p,_ as d}from"./index-4c8cf54e.js";class n{constructor(e,t){this._definitionChanged=new Cesium.Event,this.duration=e,this.image=t,this._time=performance.now()}get isConstant(){return!1}get definitionChanged(){return this._definitionChanged}getType(e){return"Spriteline1"}getValue(e,t){return Cesium.defined(t)||(t={}),t.image=this.image,t.time=(performance.now()-this._time)%this.duration/this.duration,t}equals(e){return this===e||e instanceof n&&this.duration===e.duration}}Cesium.Material.Spriteline1Type="Spriteline1";Cesium.Material.Spriteline1Source=`
czm_material czm_getMaterial(czm_materialInput materialInput)
{
  czm_material material = czm_getDefaultMaterial(materialInput);
  vec2 st = materialInput.st;
  vec4 colorImage = texture(image, vec2(fract(st.s - time), st.t));
  material.alpha = colorImage.a;
  material.diffuse = colorImage.rgb * 1.5;
  return material;
}
`;Cesium.Material._materialCache.addMaterial(Cesium.Material.Spriteline1Type,{fabric:{type:Cesium.Material.Spriteline1Type,uniforms:{color:new Cesium.Color(1,0,0,.5),image:"",transparent:!0,time:20},source:Cesium.Material.Spriteline1Source},translucent:function(o){return!0}});const _={id:"box"},f=l({__name:"three",setup(o){return c(()=>{Cesium.Ion.defaultAccessToken="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI2N2IzNDliYi1jZmNlLTQwODAtYmU2MC04OTBiNDQwYzk3YjUiLCJpZCI6MjI2NjkyLCJpYXQiOjE3MjAzNDc0NDJ9.oQVF3rZ1_HFXfiPTs_rTYmUJCUMjv5aB7zDxP24FTnY";const e=new Cesium.Viewer("box",{timeline:!1,animation:!1,sceneModePicker:!1,baseLayerPicker:!1}),t=new n(3e3,"/img/spriteline.png");let r=new Cesium.GeoJsonDataSource;r.load("/json/qingdaoRoad.geojson").then(function(s){const i=s.entities.values;e.zoomTo(i);for(let a=0;a<i.length;a++){let m=i[a];m.polyline.material=t}}),e.dataSources.add(r)}),(e,t)=>(u(),p("div",_))}});const h=d(f,[["__scopeId","data-v-54b96404"]]);export{h as default};
