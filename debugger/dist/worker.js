!function(t){var e={};function n(_){if(e[_])return e[_].exports;var r=e[_]={i:_,l:!1,exports:{}};return t[_].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=t,n.c=e,n.d=function(t,e,_){n.o(t,e)||Object.defineProperty(t,e,{configurable:!1,enumerable:!0,get:_})},n.r=function(t){Object.defineProperty(t,"__esModule",{value:!0})},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=8)}([function(t,e,n){"use strict";n.r(e),n.d(e,"window",function(){return _}),n.d(e,"actions",function(){return r}),n.d(e,"flags",function(){return s});var _={alert:function(t){postMessage({type:"alert",data:t})},prompt:async function(t){for(postMessage({type:"prompt",data:t});void 0==s.promptMsg;)await function(t){return new Promise(e=>setTimeout(e,t))}(0);var e=s.promptMsg;return s.promptMsg=void 0,e}};var r={prompt:t=>{s.promptMsg=t}},s={currNest:0,currId:"",promptMsg:void 0,stepWait:!1,in:!0,over:!1,up:!1,out:!1,setTrue:t=>{s.in=!1,s.over=!1,s.out=!1,s.up=!1,s[t]=!0}}},function(t,e,n){"use strict";n.d(e,"a",function(){return r});var _=n(0);function r(){return _.flags.up}_.actions.stepUp=(()=>{_.flags.stepWait=!0,_.flags.setTrue("up")})},function(t,e,n){"use strict";n.d(e,"a",function(){return r});var _=n(0);function r(){return _.flags.out}_.actions.stepOut=(()=>{_.flags.stepWait=!0,_.flags.setTrue("out")})},function(t,e,n){"use strict";n.d(e,"a",function(){return r});var _=n(0);n(2),n(1);function r(){return _.flags.in}_.actions.stepIn=(()=>{_.flags.stepWait=!0,_.flags.setTrue("in")})},function(t,e,n){"use strict";n.r(e),n.d(e,"isStepOver",function(){return r});var _=n(0);function r(){return _.flags.over}_.actions.stepOver=(()=>{_.flags.stepWait=!0,_.flags.setTrue("over")})},,function(module,__webpack_exports__,__webpack_require__){"use strict";var _init_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(0);_init_js__WEBPACK_IMPORTED_MODULE_0__.actions.run=(content=>{_init_js__WEBPACK_IMPORTED_MODULE_0__.window.alert(content),void 0!=content?(eval(content),postMessage({type:"execution_finished"})):_init_js__WEBPACK_IMPORTED_MODULE_0__.window.alert("The content is undefined.")})},function(module,__webpack_exports__,__webpack_require__){"use strict";var _init_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(0),_stepIn__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(3),_stepOut__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(2),_stepUp__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__(1),isStepOver=__webpack_require__(4).isStepOver,window=__webpack_require__(0).window,flags=__webpack_require__(0).flags,CurrentSystemEditorId=null;async function $id(t,e){return e}function sleep(t){return new Promise(e=>setTimeout(e,t))}function next_message(){return sleep(0)}async function wait(t,e){if(highlightBlock(e),-1!=flags.currNest&&(Object(_stepIn__WEBPACK_IMPORTED_MODULE_1__.a)()||t<=flags.currNest)){if(flags.currId===e)return;if(Object(_stepUp__WEBPACK_IMPORTED_MODULE_3__.a)()&&t==flags.currNest)return;for(;!flags.stepWait;)await next_message();flags.stepWait=!1,flags.currId=e,Object(_stepOut__WEBPACK_IMPORTED_MODULE_2__.a)()?(flags.currNest=-1,flags.out=!1):flags.currNest=t}}function highlightBlock(t){postMessage({type:"highlightBlock",data:{id:t,CurrentSystemEditorId:CurrentSystemEditorId}})}_init_js__WEBPACK_IMPORTED_MODULE_0__.actions.start_debugging=(async content=>{void 0!=content?(await eval("async function code(){ "+content+" };  code();"),postMessage({type:"execution_finished"})):window.alert("The content is undefined.")})},function(t,e,n){"use strict";n.r(e);var _=n(0);n(3),n(2),n(1),n(4),n(7),n(6);onmessage=function(t){let e=t.data;_.actions[e.type](e.data)}}]);
//# sourceMappingURL=worker.js.map