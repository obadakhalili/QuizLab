(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-9a06130e"],{2606:function(e,t,s){"use strict";var i=s("e093"),o=s.n(i);o.a},e093:function(e,t,s){},faa1:function(e,t,s){"use strict";s.r(t);var i=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"question-view-container"},[s("p",[e._v(e._s(e.question.title))]),e.question.choices?s("b-form-group",{attrs:{label:e.choicesLabel}},[e.question.isMultipleAnswer?s("b-form-checkbox-group",{attrs:{options:e.question.choices,"text-field":"title","value-field":"id",stacked:""},model:{value:e.question.selected,callback:function(t){e.$set(e.question,"selected",t)},expression:"question.selected"}}):s("b-form-radio-group",{attrs:{options:e.question.choices,"text-field":"title","value-field":"id",stacked:""},model:{value:e.question.selected,callback:function(t){e.$set(e.question,"selected",t)},expression:"question.selected"}})],1):[s("label",[e._v("Write your answer")]),s("b-textarea",{staticClass:"mb-3",attrs:{placeholder:"Your answer ...",rows:"3"},model:{value:e.question.solution,callback:function(t){e.$set(e.question,"solution",t)},expression:"question.solution"}})],e.thereIsNext?s("button",{staticClass:"btn btn-sm next-btn text-white",on:{click:function(t){return e.$emit("view-next-question")}}},[e._v(" Next ")]):e._e()],2)},o=[],n={name:"QuestionView",props:["question","thereIsNext"],computed:{choicesLabel:function(){return"Select the correct choice"+(this.question.isMultipleAnswer?"s":"")}}},c=n,u=(s("2606"),s("2877")),l=Object(u["a"])(c,i,o,!1,null,"9c25906c",null);t["default"]=l.exports}}]);
//# sourceMappingURL=chunk-9a06130e.99c6dd41.js.map