(function(t){function e(e){for(var s,r,o=e[0],c=e[1],l=e[2],d=0,f=[];d<o.length;d++)r=o[d],Object.prototype.hasOwnProperty.call(n,r)&&n[r]&&f.push(n[r][0]),n[r]=0;for(s in c)Object.prototype.hasOwnProperty.call(c,s)&&(t[s]=c[s]);u&&u(e);while(f.length)f.shift()();return i.push.apply(i,l||[]),a()}function a(){for(var t,e=0;e<i.length;e++){for(var a=i[e],s=!0,o=1;o<a.length;o++){var c=a[o];0!==n[c]&&(s=!1)}s&&(i.splice(e--,1),t=r(r.s=a[0]))}return t}var s={},n={app:0},i=[];function r(e){if(s[e])return s[e].exports;var a=s[e]={i:e,l:!1,exports:{}};return t[e].call(a.exports,a,a.exports,r),a.l=!0,a.exports}r.m=t,r.c=s,r.d=function(t,e,a){r.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:a})},r.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(t,e){if(1&e&&(t=r(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var a=Object.create(null);if(r.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var s in t)r.d(a,s,function(e){return t[e]}.bind(null,s));return a},r.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p="";var o=window["webpackJsonp"]=window["webpackJsonp"]||[],c=o.push.bind(o);o.push=e,o=o.slice();for(var l=0;l<o.length;l++)e(o[l]);var u=c;i.push([0,"chunk-vendors"]),a()})({0:function(t,e,a){t.exports=a("56d7")},"1d7f":function(t,e,a){"use strict";var s=a("7c4b"),n=a.n(s);n.a},"3fc0":function(t,e,a){},4678:function(t,e,a){var s={"./af":"2bfb","./af.js":"2bfb","./ar":"8e73","./ar-dz":"a356","./ar-dz.js":"a356","./ar-kw":"423e","./ar-kw.js":"423e","./ar-ly":"1cfd","./ar-ly.js":"1cfd","./ar-ma":"0a84","./ar-ma.js":"0a84","./ar-sa":"8230","./ar-sa.js":"8230","./ar-tn":"6d83","./ar-tn.js":"6d83","./ar.js":"8e73","./az":"485c","./az.js":"485c","./be":"1fc1","./be.js":"1fc1","./bg":"84aa","./bg.js":"84aa","./bm":"a7fa","./bm.js":"a7fa","./bn":"9043","./bn-bd":"9686","./bn-bd.js":"9686","./bn.js":"9043","./bo":"d26a","./bo.js":"d26a","./br":"6887","./br.js":"6887","./bs":"2554","./bs.js":"2554","./ca":"d716","./ca.js":"d716","./cs":"3c0d","./cs.js":"3c0d","./cv":"03ec","./cv.js":"03ec","./cy":"9797","./cy.js":"9797","./da":"0f14","./da.js":"0f14","./de":"b469","./de-at":"b3eb","./de-at.js":"b3eb","./de-ch":"bb71","./de-ch.js":"bb71","./de.js":"b469","./dv":"598a","./dv.js":"598a","./el":"8d47","./el.js":"8d47","./en-au":"0e6b","./en-au.js":"0e6b","./en-ca":"3886","./en-ca.js":"3886","./en-gb":"39a6","./en-gb.js":"39a6","./en-ie":"e1d3","./en-ie.js":"e1d3","./en-il":"7333","./en-il.js":"7333","./en-in":"ec2e","./en-in.js":"ec2e","./en-nz":"6f50","./en-nz.js":"6f50","./en-sg":"b7e9","./en-sg.js":"b7e9","./eo":"65db","./eo.js":"65db","./es":"898b","./es-do":"0a3c","./es-do.js":"0a3c","./es-mx":"b5b7","./es-mx.js":"b5b7","./es-us":"55c9","./es-us.js":"55c9","./es.js":"898b","./et":"ec18","./et.js":"ec18","./eu":"0ff2","./eu.js":"0ff2","./fa":"8df4","./fa.js":"8df4","./fi":"81e9","./fi.js":"81e9","./fil":"d69a","./fil.js":"d69a","./fo":"0721","./fo.js":"0721","./fr":"9f26","./fr-ca":"d9f8","./fr-ca.js":"d9f8","./fr-ch":"0e49","./fr-ch.js":"0e49","./fr.js":"9f26","./fy":"7118","./fy.js":"7118","./ga":"5120","./ga.js":"5120","./gd":"f6b4","./gd.js":"f6b4","./gl":"8840","./gl.js":"8840","./gom-deva":"aaf2","./gom-deva.js":"aaf2","./gom-latn":"0caa","./gom-latn.js":"0caa","./gu":"e0c5","./gu.js":"e0c5","./he":"c7aa","./he.js":"c7aa","./hi":"dc4d","./hi.js":"dc4d","./hr":"4ba9","./hr.js":"4ba9","./hu":"5b14","./hu.js":"5b14","./hy-am":"d6b6","./hy-am.js":"d6b6","./id":"5038","./id.js":"5038","./is":"0558","./is.js":"0558","./it":"6e98","./it-ch":"6f12","./it-ch.js":"6f12","./it.js":"6e98","./ja":"079e","./ja.js":"079e","./jv":"b540","./jv.js":"b540","./ka":"201b","./ka.js":"201b","./kk":"6d79","./kk.js":"6d79","./km":"e81d","./km.js":"e81d","./kn":"3e92","./kn.js":"3e92","./ko":"22f8","./ko.js":"22f8","./ku":"2421","./ku.js":"2421","./ky":"9609","./ky.js":"9609","./lb":"440c","./lb.js":"440c","./lo":"b29d","./lo.js":"b29d","./lt":"26f9","./lt.js":"26f9","./lv":"b97c","./lv.js":"b97c","./me":"293c","./me.js":"293c","./mi":"688b","./mi.js":"688b","./mk":"6909","./mk.js":"6909","./ml":"02fb","./ml.js":"02fb","./mn":"958b","./mn.js":"958b","./mr":"39bd","./mr.js":"39bd","./ms":"ebe4","./ms-my":"6403","./ms-my.js":"6403","./ms.js":"ebe4","./mt":"1b45","./mt.js":"1b45","./my":"8689","./my.js":"8689","./nb":"6ce3","./nb.js":"6ce3","./ne":"3a39","./ne.js":"3a39","./nl":"facd","./nl-be":"db29","./nl-be.js":"db29","./nl.js":"facd","./nn":"b84c","./nn.js":"b84c","./oc-lnc":"167b","./oc-lnc.js":"167b","./pa-in":"f3ff","./pa-in.js":"f3ff","./pl":"8d57","./pl.js":"8d57","./pt":"f260","./pt-br":"d2d4","./pt-br.js":"d2d4","./pt.js":"f260","./ro":"972c","./ro.js":"972c","./ru":"957c","./ru.js":"957c","./sd":"6784","./sd.js":"6784","./se":"ffff","./se.js":"ffff","./si":"eda5","./si.js":"eda5","./sk":"7be6","./sk.js":"7be6","./sl":"8155","./sl.js":"8155","./sq":"c8f3","./sq.js":"c8f3","./sr":"cf1e","./sr-cyrl":"13e9","./sr-cyrl.js":"13e9","./sr.js":"cf1e","./ss":"52bd","./ss.js":"52bd","./sv":"5fbd","./sv.js":"5fbd","./sw":"74dc","./sw.js":"74dc","./ta":"3de5","./ta.js":"3de5","./te":"5cbb","./te.js":"5cbb","./tet":"576c","./tet.js":"576c","./tg":"3b1b","./tg.js":"3b1b","./th":"10e8","./th.js":"10e8","./tk":"5aff","./tk.js":"5aff","./tl-ph":"0f38","./tl-ph.js":"0f38","./tlh":"cf75","./tlh.js":"cf75","./tr":"0e81","./tr.js":"0e81","./tzl":"cf51","./tzl.js":"cf51","./tzm":"c109","./tzm-latn":"b53d","./tzm-latn.js":"b53d","./tzm.js":"c109","./ug-cn":"6117","./ug-cn.js":"6117","./uk":"ada2","./uk.js":"ada2","./ur":"5294","./ur.js":"5294","./uz":"2e8c","./uz-latn":"010e","./uz-latn.js":"010e","./uz.js":"2e8c","./vi":"2921","./vi.js":"2921","./x-pseudo":"fd7e","./x-pseudo.js":"fd7e","./yo":"7f33","./yo.js":"7f33","./zh-cn":"5c3a","./zh-cn.js":"5c3a","./zh-hk":"49ab","./zh-hk.js":"49ab","./zh-mo":"3a6c","./zh-mo.js":"3a6c","./zh-tw":"90ea","./zh-tw.js":"90ea"};function n(t){var e=i(t);return a(e)}function i(t){if(!a.o(s,t)){var e=new Error("Cannot find module '"+t+"'");throw e.code="MODULE_NOT_FOUND",e}return s[t]}n.keys=function(){return Object.keys(s)},n.resolve=i,t.exports=n,n.id="4678"},"4c62":function(t,e,a){},"56d7":function(t,e,a){"use strict";a.r(e);a("e260"),a("e6cf"),a("cca6"),a("a79d");var s=a("2b0e"),n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-app",[a("router-view")],1)},i=[],r={name:"App"},o=r,c=a("2877"),l=a("6544"),u=a.n(l),d=a("7496"),f=Object(c["a"])(o,n,i,!1,null,null,null),p=f.exports;u()(f,{VApp:d["a"]});var b=a("8c4f"),h=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("v-navigation-drawer",{attrs:{absolute:"",temporary:""},model:{value:t.isShowDrower,callback:function(e){t.isShowDrower=e},expression:"isShowDrower"}},[a("v-list-item",[a("v-list-item-content",[a("v-list-item-title",{staticClass:"title"},[t._v(" Calculator ")]),a("v-list-item-subtitle",[t._v(" Langmuir probe diagnostic ")])],1)],1),a("v-divider"),a("v-list",{attrs:{dense:"",nav:""}},t._l(t.titleList,(function(e){return a("v-list-item",{key:e.name,attrs:{link:""}},[a("v-list-item-icon",[a("v-icon",[t._v(t._s(e.icon))])],1),a("v-list-item-content",[a("v-list-item-title",{on:{click:function(a){return t.diplayChanger(e.name)}}},[t._v(t._s(e.name))])],1)],1)})),1)],1),a("top-header",{attrs:{title:t.title,left:t.leftBtn,right:t.rightBtn}}),a("v-main",[a("p",[t._v("main")]),t.isShowDisplayCalc?a("div",{attrs:{id:"TopCalc"}},[a("h3",[t._v("グラフ")]),a("span",[t._v(t._s(t.files.length)+"ファイル")]),a("div",{staticClass:"TopCalc-container"},[a("div",{staticClass:"graph-container"},[t._l(t.files,(function(t){return a("div",{key:t.fileName,staticClass:"each-chart"},[a("chart-container",{attrs:{file:t}})],1)})),a("v-divider")],2),a("div",{staticClass:"result-container"},[t._v("bb")]),a("div",{staticClass:"setting-container"},[t._v("aa")])])]):t._e(),a("div",{directives:[{name:"show",rawName:"v-show",value:t.isShowDisplaySetting,expression:"isShowDisplaySetting"}],attrs:{id:"TopSetting"}},[a("div",{attrs:{id:"files"}},[a("h3",[t._v("ファイル操作")]),a("div",{staticClass:"mt-5"}),a("v-select",{attrs:{value:t.inputUnitVoltSelected,items:t.inputUnitVoltList,label:"input unit Volt",outlined:""},model:{value:t.inputUnitVoltSelected,callback:function(e){t.inputUnitVoltSelected=e},expression:"inputUnitVoltSelected"}}),a("v-select",{attrs:{value:t.inputUnitAmpereSelected,items:t.inputUnitAmpereList,label:"input unit Ampere",outlined:""},model:{value:t.inputUnitAmpereSelected,callback:function(e){t.inputUnitAmpereSelected=e},expression:"inputUnitAmpereSelected"}}),a("p",[t._v("※入力ファイルは[V,A]の順")]),a("p",[t._v("※出力は[V,mA]")]),a("input",{attrs:{type:"file",multiple:""},on:{change:t.onInputFiles}}),a("v-btn",{on:{click:t.onOutputFiles}},[t._v("csv出力")])],1),a("div",{attrs:{id:"initParameter"}},[a("h3",[t._v("初期条件設定")]),a("div",{staticClass:"mt-5"}),a("v-text-field",{attrs:{label:"Area of probe [cm^2]",outlined:"",clearable:""},model:{value:t.areaOfProbe,callback:function(e){t.areaOfProbe=e},expression:"areaOfProbe"}}),a("v-select",{attrs:{value:"Ar",items:t.gasType,label:"Gas Type",outlined:""},on:{change:t.onChangeGasType}}),a("v-text-field",{attrs:{label:"Mass of Atom [kg]",outlined:"",readonly:!t.isOtherGasType},model:{value:t.gasTypeMassSelect,callback:function(e){t.gasTypeMassSelect=e},expression:"gasTypeMassSelect"}})],1)]),a("v-container",[a("p",[t._v("container")])])],1)],1)},m=[],v=(a("a4d3"),a("e01a"),a("99af"),a("4de4"),a("7db0"),a("a630"),a("a15b"),a("d81d"),a("b0c0"),a("a9e3"),a("b64b"),a("d3b7"),a("ac1f"),a("25f0"),a("6062"),a("3ca3"),a("466d"),a("5319"),a("1276"),a("498a"),a("5cc6"),a("9a8c"),a("a975"),a("735e"),a("c1ac"),a("d139"),a("3a7b"),a("d5d6"),a("82f8"),a("e91f"),a("60bd"),a("5f96"),a("3280"),a("3fcc"),a("ca91"),a("25a1"),a("cd26"),a("3c5d"),a("2954"),a("649e"),a("219c"),a("170b"),a("b39a"),a("72f7"),a("ddb0"),a("2b3d"),a("3835")),j=a("2909"),g=a("d4ec"),y=a("bee2"),w=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-footer",{staticClass:"footer-tab-wrapper",attrs:{id:"topFooter",app:""}},[a("v-container",{staticClass:"footer-tab-container"},[a("v-row",{attrs:{"no-gutters":""}},t._l(t.footerTabList,(function(e){return a("v-col",{key:e.id,staticClass:"footer-tab"},[a("icon-btn-transition",t._b({},"icon-btn-transition",e,!1))],1)})),1)],1)],1)},S=[],k=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"btn",attrs:{id:"iconBtnTransition"},on:{click:function(e){return t.gotoPage()}}},[a("v-icon",{staticClass:"material-icons icon-info",style:t.addCss},[t._v(t._s(t.icon))])],1)},C=[],x={props:{id:Number,title:String,icon:String,goto:[String,Function],propItems:Object,addCss:Object},data:function(){return{}},methods:{gotoPage:function(){"function"===typeof this.goto?this.goto():"back"!==this.goto.toLowerCase()||this.clickFunction?null===this.propItems?this.$router.push({name:this.goto}):this.$router.push({name:this.goto,params:this.propItems}):this.$router.go(-1)}}},_=x,O=(a("ad0b"),a("132d")),z=Object(c["a"])(_,k,C,!1,null,"5e757d13",null),A=z.exports;u()(z,{VIcon:O["a"]});var T={data:function(){return{footerTabList:[{id:1,title:"home",icon:"home",goto:"TopHome",propItems:{},addCss:{}},{id:2,title:"setting",icon:"settings",goto:"TopSettings",propItems:{},addCss:{}}]}},components:{IconBtnTransition:A}},V=T,L=(a("1d7f"),a("62ad")),D=a("a523"),I=a("553a"),E=a("0fd9"),U=Object(c["a"])(V,w,S,!1,null,"bff33340",null),B=U.exports;u()(U,{VCol:L["a"],VContainer:D["a"],VFooter:I["a"],VRow:E["a"]});var M=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-app-bar",[a("v-container",{attrs:{id:"topHeader"}},[a("v-row",{attrs:{"no-gutters":""}},[a("v-col",{staticClass:"col-container leftBtn-container",attrs:{cols:"3"}},[a("icon-btn-transition",t._b({},"icon-btn-transition",t.leftBtn,!1))],1),a("v-col",{staticClass:"col-container",attrs:{cols:""}},[a("h3",{staticClass:"centerTitle"},[t._v(t._s(t.title))])]),a("v-col",{staticClass:"col-container rightBtn-container",attrs:{cols:"3"}},t._l(t.rightBtnList,(function(e){return a("div",{key:e.id,staticClass:"btn rightBtn"},[a("icon-btn-transition",t._b({},"icon-btn-transition",e,!1))],1)})),0)],1)],1)],1)},N=[],R={props:{left:{type:Object,default:{id:1,title:"back",icon:"arrow_back_ios",goto:"back",propItems:"",addCss:""}},right:{type:Object,default:[{id:1,title:"setting",icon:"settings",goto:"TopSetting",propItems:{},addCss:{}}]},id:Number,title:String,addCss:Object},computed:{},data:function(){return{leftBtn:this.left,rightBtnList:this.right[0]?this.right:[this.right]}},beforeCreate:function(){},methods:{},components:{IconBtnTransition:A}},F=R,P=(a("d58b"),a("40dc")),$=Object(c["a"])(F,M,N,!1,null,"135f451c",null),G=$.exports;u()($,{VAppBar:P["a"],VCol:L["a"],VContainer:D["a"],VRow:E["a"]});var H=function(){var t=this,e=t.$createElement;t._self._c;return t._m(0)},J=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{attrs:{id:"ChartContainer"}},[a("div",{attrs:{id:"canvas-wrapper"}})])}],Y=(a("4160"),a("159b"),{props:{file:{type:Object}},data:function(){return{fontSize:{title:12,axis:10,label:12},axis:{y:{stepSize:10,maxSize:null,minSize:null},x:{stepSize:10,maxSize:null,minSize:null}},point:{size:1,color:"RGBA(225,95,150, 1)",hoverSize:5}}},computed:{},methods:{initChart:function(){console.log("in afiles:",this.file);var t={chartName:this.file.name,labelName:this.file.name,setDataArry:this.file.scatterData};this.createCanvasElement(t),this.createChartVI(t)},createChartVI:function(t){var e=t.chartName,a=t.labelName,s=t.setDataArry;console.log(e,a);var n=window.document.getElementById(e).getContext("2d"),i=new Chart(n,{type:"scatter",data:{datasets:[{label:a,data:s,backgroundColor:this.point.color,pointRadius:this.point.size,pointHoverRadius:this.point.hoverSize}]},options:{legend:{labels:{fontSize:this.fontSize.label}},scales:{xAxes:[{scaleLabel:{display:!0,labelString:"V [V]",fontSize:this.fontSize.title},ticks:{fontSize:this.fontSize.axis,suggestedMin:this.axis.x.maxSize,suggestedMax:this.axis.x.minSize,stepSize:this.axis.x.stepSize}}],yAxes:[{scaleLabel:{display:!0,labelString:"I [mA]",fontSize:this.fontSize.title},ticks:{fontSize:this.fontSize.axis,suggestedMin:this.axis.y.maxSize,suggestedMax:this.axis.y.minSize,stepSize:this.axis.y.stepSize}}]},horizontalLine:[{y:0,style:"rgba(0,0,0,1)",text:"tes"}],maintainAspectRatio:!0,responsive:!0}});this.$store.dispatch("main/setChartList",{chartName:e,chartData:i})},addChartArryData:function(t){var e=t.chartName,a=t.labelName,s=t.setDataArry,n=this.chartList[e],i=void 0!==n,r=!1;i&&(r=void 0!==n.data.datasets.find((function(t){return t.label===a}))),console.log(i,r),i&&r&&(s.forEach((function(t){n.data.datasets.forEach((function(e){e.data.push(t)}))})),n.update())},createCanvasElement:function(t){var e=t.chartName,a=window.document.getElementById("canvas-wrapper"),s=window.document.createElement("canvas");s.className=e,s.id=e,a.appendChild(s)}},watch:{},beforeCreate:function(){},mounted:function(){this.initChart()},components:{}}),q=Y,K=(a("5dce"),Object(c["a"])(q,H,J,!1,null,null,null)),Q=K.exports,W={data:function(){var t=this;return{title:"Home",leftBtn:{id:1,title:"menu",icon:"menu",goto:function(){t.isShowDrower=!t.isShowDrower},propItems:{},addCss:{}},rightBtn:{},isShowDrower:!1,files:[],outputFiles:[],inputUnitVoltSelected:"V",inputUnitVoltList:["mV","V"],inputUnitAmpereSelected:"A",inputUnitAmpereList:["mA","A"],titleList:{calc:{name:"calc",icon:"mdi-calculator"},setting:{name:"setting",icon:"mdi-import"},test:{name:"test",icon:"mdi-pen"}},isShowDisplaySetting:!0,isShowDisplayCalc:!0,areaOfProbe:.097075213,gasType:["Ar","H2","Other"],gasTypeMassSelect:6.63385357335952*Math.pow(10,-26),gasTypeMassList:[6.63385357335952*Math.pow(10,-26),1.67355769346049*Math.pow(10,-27)],isOtherGasType:!1}},computed:{},methods:{test:function(){console.log(this.files);var t=this.$store.state.main.chartList;console.log(t)},onInputFiles:function(t){for(var e=this,a=t.target.files,s=[],n=function(t){var n=a[t];s[t]=new FileReader,s[t].onload=function(t){var a=n.name,s=a.split(".txt").shift(),i=t.target.result,r=e.rawTextData2Obj(i),o=e.data2ScatterData(r),c={name:s,fileName:a,rawText:i,formatText:r,scatterData:o,data:null};e.files.push(c)},s[t].readAsText(n)},i=0;i<a.length;i++)n(i);console.log("files:",this.files)},onOutputFiles:function(){var t=function(){function t(e){var a=arguments.length>1&&void 0!==arguments[1]&&arguments[1];if(Object(g["a"])(this,t),this.ARRAY=Symbol("ARRAY"),this.OBJECT=Symbol("OBJECT"),this.data=e,!t.isArray(e))throw Error("Error: 未対応のデータ型です");if(0==e.length)this.dataType=this.ARRAY;else if(t.isObject(e[0]))this.dataType=this.OBJECT;else{if(!t.isArray(e[0]))throw Error("Error: 未対応のデータ型です");this.dataType=this.ARRAY}this.keys=a}return Object(y["a"])(t,[{key:"toString",value:function(){if(this.dataType===this.ARRAY)return this.data.map((function(e){return e.map((function(e){return t.prepare(e)})).join(",")})).join("\n");if(this.dataType===this.OBJECT){var e=this.keys||Array.from(this.extractKeys(this.data)),a=this.data.map((function(t){return e.map((function(e){return t[e]}))}));return[].concat([e],a).map((function(e){return e.map((function(e){return t.prepare(e)})).join(",")})).join("\n")}}},{key:"save",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"data.csv";t.match(/\.csv$/i)||(t+=".csv"),console.info("filename:",t),console.table(this.data);var e=this.toString(),a=new Uint8Array([239,187,191]),s=new Blob([a,e],{type:"text/csv"}),n=window.URL||window.webkitURL,i=n.createObjectURL(s),r=document.createElement("a");r.download=decodeURI(t),r.href=i,r.type="text/csv",r.click()}},{key:"extractKeys",value:function(t){var e;return new Set((e=[]).concat.apply(e,Object(j["a"])(this.data.map((function(t){return Object.keys(t)})))))}}],[{key:"prepare",value:function(t){return'"'+(""+t).replace(/"/g,'""')+'"'}},{key:"isObject",value:function(t){return"[object Object]"===Object.prototype.toString.call(t)}},{key:"isArray",value:function(t){return"[object Array]"===Object.prototype.toString.call(t)}}]),t}();0===this.outputFiles.length?window.alert("ファイルを入力してください。"):new t(this.outputFiles).save("__Langmuir_probe_diagnostic__.csv")},rawTextData2Obj:function(t){var e=1,a=1e3;switch(this.inputUnitVoltSelected){case"V":e=1;break;case"mV":e=.001;break;default:console.log("error:pls input unit Volt",this.inputUnitVoltSelected)}switch(this.inputUnitAmpereSelected){case"A":a=1e3;break;case"mA":a=1;break;default:console.log("error:pls input unit Ampere",this.inputUnitAmpereSelected)}t=t.trim().split("\n");try{t=t.map((function(t){return t.split("\t").map((function(t,s){return 0===s?Number(t)*e:1===s?Number(t)*a:void console.log("error: text file is not expected format")}))})),t=t.filter((function(t){var e=t.find((function(t){return isNaN(t)}));return void 0===e}))}catch(s){return window.alert("file input error: please check text format"),console.log("file format error:",t),null}return t},data2ScatterData:function(t){var e=t.map((function(t){var e=Object(v["a"])(t,2),a=e[0],s=e[1],n={x:a,y:s};return n}));return e},showScatterChart:function(){},diplayChanger:function(t){switch(t){case this.titleList.setting.name:this.isShowDisplaySetting=!this.isShowDisplaySetting;break;case this.titleList.calc.name:this.isShowDisplayCalc=!this.isShowDisplayCalc;break;case this.titleList.test.name:this.test();break}},onChangeGasType:function(t){if("Other"===t)this.isOtherGasType=!0;else switch(this.isOtherGasType=!1,t){case"Ar":this.gasTypeMassSelect=this.gasTypeMassList[0];break;case"H2":this.gasTypeMassSelect=this.gasTypeMassList[1];break;default:console.log("error:pls enter H2 or Ar")}}},watch:{},beforeCreate:function(){},mounted:function(){},components:{TopHeader:G,TopFooter:B,ChartContainer:Q}},X=W,Z=(a("e483"),a("8336")),tt=a("ce7e"),et=a("8860"),at=a("da13"),st=a("5d23"),nt=a("34c3"),it=a("f6c4"),rt=a("f774"),ot=a("b974"),ct=a("8654"),lt=Object(c["a"])(X,h,m,!1,null,null,null),ut=lt.exports;u()(lt,{VBtn:Z["a"],VContainer:D["a"],VDivider:tt["a"],VIcon:O["a"],VList:et["a"],VListItem:at["a"],VListItemContent:st["a"],VListItemIcon:nt["a"],VListItemSubtitle:st["b"],VListItemTitle:st["c"],VMain:it["a"],VNavigationDrawer:rt["a"],VSelect:ot["a"],VTextField:ct["a"]}),s["a"].use(b["a"]);var dt=[{path:"/",name:"TopPage",component:ut}],ft=new b["a"]({base:"/",routes:dt}),pt=ft,bt=a("2f62"),ht={namespaced:!0,state:function(){return{chartList:{}}},getters:{},mutations:{},actions:{setChartList:function(t,e){var a=t.state,s=e.chartName,n=e.chartData;a.chartList[s]=n}}},mt=ht;s["a"].use(bt["a"]);var vt=new bt["a"].Store({modules:{main:mt}}),jt=a("f309");s["a"].use(jt["a"]);var gt=new jt["a"]({}),yt=a("30ef"),wt=a.n(yt);a("bf40"),a("5363"),a("d1e78");s["a"].config.productionTip=!1,window.Chart=wt.a,new s["a"]({router:pt,store:vt,vuetify:gt,render:function(t){return t(p)}}).$mount("#app")},5794:function(t,e,a){},"5dce":function(t,e,a){"use strict";var s=a("4c62"),n=a.n(s);n.a},"7c4b":function(t,e,a){},a521:function(t,e,a){},ad0b:function(t,e,a){"use strict";var s=a("3fc0"),n=a.n(s);n.a},d58b:function(t,e,a){"use strict";var s=a("5794"),n=a.n(s);n.a},e483:function(t,e,a){"use strict";var s=a("a521"),n=a.n(s);n.a}});
//# sourceMappingURL=app.3c40e966.js.map