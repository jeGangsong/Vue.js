import{e as _,h as f,f as b,o as h,c as g,a as t,t as c,l as v}from"./index-9fe198f4.js";import{a as r}from"./axios-11e9606c.js";const y={key:0,class:"card mb-2"},k=["src"],R={class:"card-body"},C={class:"card-title"},w={class:"card-text"},M={__name:"DetailView",setup(x){const u="http://13.125.186.232:8080",s=_(),a=f(),e=b(null);async function i(){const n=await r.menus.findOne(a.params.id);e.value=n.data}function l(){return console.log(e.value.image_src),`${u}/${e.value.image_src}`}function m(){s.push({name:"menus-update",params:{id:a.params.id}})}async function d(){if(confirm("삭제하시겠습니까?")){const o=await r.menus.delete(a.params.id);alert(o.data.message),s.push({name:"menus"})}}function p(){s.push({name:"menus"})}return i(),(n,o)=>e.value?(h(),g("div",y,[t("img",{src:l(),class:"card-img-top",alt:"menu"},null,8,k),t("div",R,[t("h5",C,c(e.value.name),1),t("p",w,c(e.value.description),1),t("button",{type:"button",class:"btn btn-primary",onClick:m},"수정하기"),t("button",{type:"button",class:"btn btn-danger",onClick:d},"삭제"),t("button",{type:"button",class:"btn btn-outline-primary",onClick:p},"목록")])])):v("",!0)}};export{M as default};
