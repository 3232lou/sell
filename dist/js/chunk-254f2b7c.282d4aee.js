(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-254f2b7c"],{"21b7":function(t,e,s){"use strict";s.r(e);var a=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"remark"},[s("Header",{attrs:{isLeft:!0,title:"订单备注"}}),s("div",{staticClass:"view-body"},[s("section",[s("textarea",{directives:[{name:"model",rawName:"v-model",value:t.text,expression:"text"}],attrs:{placeholder:"填写额外对餐厅或骑手小哥备注的信息",maxlength:"100"},domProps:{value:t.text},on:{input:function(e){e.target.composing||(t.text=e.target.value)}}}),s("div",{staticClass:"switch"},t._l(t.radioItem,(function(e,a){return s("span",{key:a,staticClass:"switch-item item-line",class:{selected:e.select},on:{click:function(s){return t.handleRadioItem(e)}}},[t._v(t._s(e.name))])})),0),s("div",{staticClass:"switch"},t._l(t.switchItem,(function(e,a){return s("span",{key:a,staticClass:"switch-item ",class:{selected:e.select},on:{click:function(t){e.select=!e.select}}},[t._v(t._s(e.name))])})),0)]),s("button",{staticClass:"btn-submit",on:{click:t.submitClick}},[t._v("确定")])])],1)},c=[],n=(s("cc57"),s("6d57"),s("0418")),i={name:"remark",components:{Header:n["a"]},data:function(){return{radioItem:[{select:!1,name:"不要辣"},{select:!1,name:"少点辣"},{select:!1,name:"多点辣"}],switchItem:[{select:!1,name:"不要香菜"},{select:!1,name:"不要洋葱"},{select:!1,name:"多点醋"},{select:!1,name:"多点葱"}],text:""}},methods:{handleRadioItem:function(t){this.radioItem.forEach((function(t){t.select=!1})),t.select=!0},submitClick:function(){var t="";this.radioItem.forEach((function(e){e.select&&(t+=e.name+",")})),this.switchItem.forEach((function(e){e.select&&(t+=e.name+",")})),t+=this.text,this.$store.dispatch("setRemarkInfo",{tableware:this.$store.getters.remarkInfo.tableware,remark:t}),this.$router.go(-1)}}},l=i,r=(s("71d0"),s("9ca4")),o=Object(r["a"])(l,a,c,!1,null,"3756be08",null);e["default"]=o.exports},"2a48":function(t,e,s){},"71d0":function(t,e,s){"use strict";var a=s("2a48"),c=s.n(a);c.a}}]);
//# sourceMappingURL=chunk-254f2b7c.282d4aee.js.map