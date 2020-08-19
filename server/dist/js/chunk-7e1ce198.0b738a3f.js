(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-7e1ce198"],{"030d":function(t,e,n){"use strict";var s=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"text-center my-5"},[n("b-spinner",{staticClass:"align-middle mr-2"}),n("strong",[t._v("Loading ...")])],1)},o=[],a=n("2877"),i={},r=Object(a["a"])(i,s,o,!1,null,null,null);e["a"]=r.exports},"5bc5":function(t,e,n){"use strict";n.d(e,"a",(function(){return d})),n.d(e,"b",(function(){return f}));
/*! (c) 2020 Andrea Giammarchi */
const{parse:s,stringify:o}=JSON,{keys:a}=Object,i=String,r="string",l="object",c=(t,e)=>e,u=t=>t instanceof i?i(t):t,p=(t,e)=>typeof e===r?new i(e):e,b=(t,e,n,s)=>a(n).reduce((n,o)=>{const a=n[o];if(a instanceof i){const i=t[a];typeof i!==l||e.has(i)?n[o]=s.call(n,o,i):(e.add(i),n[o]=s.call(n,o,b(t,e,i,s)))}else n[o]=s.call(n,o,a);return n},n),m=(t,e,n)=>{const s=i(e.push(n)-1);return t.set(n,s),s},d=(t,e)=>{const n=s(t,p).map(u),o=n[0],a=e||c,i=typeof o===l&&o?b(n,new Set,o,a):o;return a.call({"":i},"",i)},f=(t,e,n)=>{const s=e&&typeof e===l?(t,n)=>""===t||-1<e.indexOf(t)?n:void 0:e||c,a=new Map,i=[],u=[];let p=+m(a,i,s.call({"":t},"",t)),b=!p;while(p<i.length)b=!0,u[p]=o(i[p++],d,n);return"["+u.join(",")+"]";function d(t,e){if(b)return b=!b,e;const n=s.call(this,t,e);switch(typeof n){case l:if(null===n)return n;case r:return a.get(n)||m(a,i,n)}return n}}},"5c80":function(t,e,n){"use strict";var s=n("9b49"),o=n.n(s);o.a},"9b49":function(t,e,n){},e37d:function(t,e,n){"use strict";n.r(e);var s=function(){var t=this,e=t.$createElement,n=t._self._c||e;return t.labContent?n("div",{staticClass:"lab mx-auto"},[n("h5",[t._v(" Quiz options "),n("small",{staticClass:"noselect"},[n("a",{on:{click:function(e){t.showQuizOptions=!t.showQuizOptions}}},[t._v(" "+t._s(t.showQuizOptions?"Hide":"Show")+" ")])])]),n("b-form-group",{directives:[{name:"show",rawName:"v-show",value:t.showQuizOptions,expression:"showQuizOptions"}],staticClass:"noselect"},[n("b-form-checkbox",{model:{value:t.labContent.options.shuffleQuiz,callback:function(e){t.$set(t.labContent.options,"shuffleQuiz",e)},expression:"labContent.options.shuffleQuiz"}},[t._v(" Shuffle quiz (Shuffle sections order, questions within them and choices if any). questions from different sections won't be mixed up. ")]),n("b-form-checkbox",{model:{value:t.labContent.options.showQuizResults,callback:function(e){t.$set(t.labContent.options,"showQuizResults",e)},expression:"labContent.options.showQuizResults"}},[t._v(" Show quiz results. ")]),n("b-form-checkbox",{model:{value:t.labContent.options.blockQuestionAfterAnswer,callback:function(e){t.$set(t.labContent.options,"blockQuestionAfterAnswer",e)},expression:"labContent.options.blockQuestionAfterAnswer"}},[t._v(" Block question after answer. ")]),n("b-form-checkbox",{model:{value:t.labContent.options.openQuiz,callback:function(e){t.$set(t.labContent.options,"openQuiz",e)},expression:"labContent.options.openQuiz"}},[t._v(" Open quiz, quiz can be attended any date at any time. ")]),n("b-form-group",{directives:[{name:"show",rawName:"v-show",value:!t.labContent.options.openQuiz,expression:"!labContent.options.openQuiz"}]},[t._v(" Start date "),n("b-datepicker",{staticClass:"my-2 w-75",attrs:{size:"sm"},model:{value:t.labContent.options.startDate,callback:function(e){t.$set(t.labContent.options,"startDate",e)},expression:"labContent.options.startDate"}}),n("b-form-timepicker",{staticClass:"w-75",attrs:{size:"sm"},model:{value:t.labContent.options.startTime,callback:function(e){t.$set(t.labContent.options,"startTime",e)},expression:"labContent.options.startTime"}}),t._v(" Close date "),n("b-datepicker",{staticClass:"my-2 w-75",attrs:{size:"sm"},model:{value:t.labContent.options.closeDate,callback:function(e){t.$set(t.labContent.options,"closeDate",e)},expression:"labContent.options.closeDate"}}),n("b-form-timepicker",{staticClass:"w-75",attrs:{size:"sm"},model:{value:t.labContent.options.closeTime,callback:function(e){t.$set(t.labContent.options,"closeTime",e)},expression:"labContent.options.closeTime"}})],1),n("b-row",{staticClass:"my-2",attrs:{"no-gutters":""}},[n("b-col",{attrs:{sm:"3"}},[t._v(" Maximum time limit (mins) ")]),n("b-col",{attrs:{sm:"9"}},[n("b-input",{attrs:{type:"number",size:"sm"},model:{value:t.labContent.options.timeLimit,callback:function(e){t.$set(t.labContent.options,"timeLimit",e)},expression:"labContent.options.timeLimit"}}),t.labContent.options.openQuiz?[n("li",[t._v("If left empty, then no maximum time limit is specified.")])]:[n("label",[t._v(" The maximum time limit is set to the duration between start date and close date, if: ")]),n("li",[t._v("Input is left empty.")]),n("li",[t._v(" If the maximum time limit input is greater than the duration between the start date and close date. ")])]],2)],1),n("b-row",{staticClass:"mb-2",attrs:{"no-gutters":""}},[n("b-col",{attrs:{sm:"3"}},[t._v(" Allowed attempts ")]),n("b-col",{attrs:{sm:"9"}},[n("b-input",{attrs:{type:"number",size:"sm",placeholder:"required"},model:{value:t.labContent.options.allowedAttempts,callback:function(e){t.$set(t.labContent.options,"allowedAttempts",e)},expression:"labContent.options.allowedAttempts"}})],1)],1),n("b-row",{attrs:{"no-gutters":""}},[n("b-col",{attrs:{sm:"3"}},[t._v(" Pass grade ")]),n("b-col",{attrs:{sm:"9"}},[n("b-input",{attrs:{type:"number",size:"sm"},model:{value:t.labContent.options.passGrade,callback:function(e){t.$set(t.labContent.options,"passGrade",e)},expression:"labContent.options.passGrade"}})],1)],1)],1),n("LabContent",{attrs:{labContent:t.labContent}}),n("b-button",{staticClass:"float-right mt-3",attrs:{variant:t.isNew?"dark":"success"},on:{click:t.submitQuiz}},[t._v(" Submit ")])],1):n("ContentLoading")},o=[],a=(n("d81d"),n("d3b7"),n("96cf"),n("1da1")),i=n("5bc5"),r=n("030d"),l=n("365c"),c={name:"QuizLab",created:function(){this.isNew?this.resetLabContent():this.setQuiz()},data:function(){return{labContent:null,showQuizOptions:!0,isNew:"/new"===this.$route.path}},methods:{setQuiz:function(){var t=this;return Object(a["a"])(regeneratorRuntime.mark((function e(){var n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,Object(l["a"])("/quizzes/labcontent/"+t.$route.params.id,"get");case 3:n=e.sent,t.labContent=Object(i["a"])(n.data),e.next=11;break;case 7:e.prev=7,e.t0=e["catch"](0),t.$router.push("/quizzes"),t.$store.dispatch("updateAlerts",{message:e.t0.response.data,color:"danger"});case 11:case"end":return e.stop()}}),e,null,[[0,7]])})))()},submitQuiz:function(){var t=this;return Object(a["a"])(regeneratorRuntime.mark((function e(){var n,s;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(n={title:t.labContent.mainSection.title,options:t.labContent.options,labContent:Object(i["b"])(t.labContent)},e.prev=1,!t.isNew){e.next=9;break}return e.next=5,Object(l["a"])("/quizzes","post",n);case 5:t.$store.dispatch("updateAlerts",{message:"Quiz was submitted successfully",color:"success"}),t.resetLabContent(),e.next=13;break;case 9:return e.next=11,Object(l["a"])("/quizzes/"+t.$route.params.id,"patch",n);case 11:s=e.sent,s.data.quizIsModified?t.$store.dispatch("updateAlerts",{message:"Quiz new updates were taken",color:"success"}):t.$store.dispatch("updateAlerts",{message:"No updates made",color:"info"});case 13:e.next=18;break;case 15:e.prev=15,e.t0=e["catch"](1),t.$store.dispatch("updateAlerts",e.t0.response.data.map((function(t){return{message:t,color:"danger"}})));case 18:return e.prev=18,document.body.scrollTop=0,document.documentElement.scrollTop=0,e.finish(18);case 22:case"end":return e.stop()}}),e,null,[[1,15,18,22]])})))()},resetLabContent:function(){this.labContent={options:{shuffleQuiz:!0,showQuizResults:!0,blockQuestionAfterAnswer:!1,openQuiz:!1,startDate:"",startTime:"",closeDate:"",closeTime:"",timeLimit:"",allowedAttempts:1,passGrade:""},mainSection:{title:"",content:[]}}}},components:{ContentLoading:r["a"],LabContent:function(){return n.e("chunk-e8d9c71e").then(n.bind(null,"019f"))}}},u=c,p=(n("5c80"),n("2877")),b=Object(p["a"])(u,s,o,!1,null,"ed0f8068",null);e["default"]=b.exports}}]);
//# sourceMappingURL=chunk-7e1ce198.0b738a3f.js.map