!function(a){var t={};function e(l){if(t[l])return t[l].exports;var o=t[l]={i:l,l:!1,exports:{}};return a[l].call(o.exports,o,o.exports,e),o.l=!0,o.exports}e.m=a,e.c=t,e.d=function(a,t,l){e.o(a,t)||Object.defineProperty(a,t,{configurable:!1,enumerable:!0,get:l})},e.r=function(a){Object.defineProperty(a,"__esModule",{value:!0})},e.n=function(a){var t=a&&a.__esModule?function(){return a.default}:function(){return a};return e.d(t,"a",t),t},e.o=function(a,t){return Object.prototype.hasOwnProperty.call(a,t)},e.p="",e(e.s=0)}([function(a,t,e){"use strict";e.r(t),window.workspace=Blockly.inject("blocklyDiv",{media:"../../media/",toolbox:document.getElementById("toolbox")}),Blockly.Xml.domToWorkspace(window.workspace,document.getElementById("startBlocks"));var l=function(){var a,t;function e(){return void 0!==a}return{Instance:function(){return void 0===a&&(a=new Worker("../../debuggee/bundle.js"),t={alert:a=>{alert(a)},highlightBlock:a=>{window.workspace.traceOn_=!0,window.workspace.highlightBlock(a)},execution_finished:()=>{a=void 0}},a.onmessage=function(a){let e=a.data,l=e.data;t[e.type](l)}),a},Stop:function(){e()&&(a.terminate(),a=void 0)},AddOnDispacher:function(a,e){t[a]=e},hasInstance:e}}(),o={},c={tmp:"$",tmp_count:0,nest:-1};e(2);Blockly.JavaScript.controls_if=function(a){var t=0,e=[],l=[],o=[],r="";for(t=0;t<=a.elseifCount_;++t)o[t]=c.tmp+c.tmp_count++;for(e[0]=Blockly.JavaScript.valueToCode(a,"IF0",Blockly.JavaScript.ORDER_NONE)||"false",l[0]=Blockly.JavaScript.statementToCode(a,"DO0"),t=1;t<=a.elseifCount_;t++)e[t]=Blockly.JavaScript.valueToCode(a,"IF"+t,Blockly.JavaScript.ORDER_NONE)||"false",l[t]=Blockly.JavaScript.statementToCode(a,"DO"+t);for(t=0;t<=a.elseifCount_;++t)r+=e[t]+o[t]+" = "+c.tmp+";\n";for(r+="if ("+o[0]+") {\n"+l[0]+"}",t=1;t<=a.elseifCount_;t++)r+=" else if ("+o[t]+") {\n"+l[t]+"}";a.elseCount_&&(r+=" else {\n"+Blockly.JavaScript.statementToCode(a,"ELSE")+"}");return alert(r),r+"\n"},Blockly.JavaScript.logic_compare=function(a){var t={EQ:"==",NEQ:"!=",LT:"<",LTE:"<=",GT:">",GTE:">="}[a.getFieldValue("OP")],e="=="==t||"!="==t?Blockly.JavaScript.ORDER_EQUALITY:Blockly.JavaScript.ORDER_RELATIONAL;c.nest++;var l=Blockly.JavaScript.valueToCode(a,"A",e)||"0",o=Blockly.JavaScript.valueToCode(a,"B",e)||"0",r=c.tmp+c.tmp_count++,i=c.tmp+c.tmp_count++,n=l+"var "+r+" = "+c.tmp+";\n"+o+"var "+i+" = "+c.tmp+";\nawait wait("+c.nest+");\n"+c.tmp+" = ("+r+t+i+");\n";return c.nest--,[n,e]},Blockly.JavaScript.logic_operation=function(a){var t="AND"==a.getFieldValue("OP")?"&&":"||",e="&&"==t?Blockly.JavaScript.ORDER_LOGICAL_AND:Blockly.JavaScript.ORDER_LOGICAL_OR,l=Blockly.JavaScript.valueToCode(a,"A",e),o=Blockly.JavaScript.valueToCode(a,"B",e);if(l||o){var c="&&"==t?"true":"false";l||(l=c),o||(o=c)}else l="false",o="false";return[l+" "+t+" "+o,e]},Blockly.JavaScript.logic_negate=function(a){var t=Blockly.JavaScript.ORDER_LOGICAL_NOT;return["!"+(Blockly.JavaScript.valueToCode(a,"BOOL",t)||"true"),t]},Blockly.JavaScript.logic_boolean=function(a){return["TRUE"==a.getFieldValue("BOOL")?"true":"false",Blockly.JavaScript.ORDER_ATOMIC]},Blockly.JavaScript.logic_null=function(a){return["null",Blockly.JavaScript.ORDER_ATOMIC]},Blockly.JavaScript.logic_ternary=function(a){return[(Blockly.JavaScript.valueToCode(a,"IF",Blockly.JavaScript.ORDER_CONDITIONAL)||"false")+" ? "+(Blockly.JavaScript.valueToCode(a,"THEN",Blockly.JavaScript.ORDER_CONDITIONAL)||"null")+" : "+(Blockly.JavaScript.valueToCode(a,"ELSE",Blockly.JavaScript.ORDER_CONDITIONAL)||"null"),Blockly.JavaScript.ORDER_CONDITIONAL]},Blockly.JavaScript.controls_repeat_ext=function(a){if(c.nest++,a.getField("TIMES"))var t=String(Number(a.getFieldValue("TIMES")));else t=Blockly.JavaScript.valueToCode(a,"TIMES",Blockly.JavaScript.ORDER_ASSIGNMENT)||"0";var e=Blockly.JavaScript.statementToCode(a,"DO");e=Blockly.JavaScript.addLoopTrap(e,a.id);var l="",o=Blockly.JavaScript.variableDB_.getDistinctName("count",Blockly.Variables.NAME_TYPE),r=t;t.match(/^\w+$/)||Blockly.isNumber(t)||(l+=t+"var "+(r=Blockly.JavaScript.variableDB_.getDistinctName("repeat_end",Blockly.Variables.NAME_TYPE))+" = "+c.tmp+";\n");return l+="await wait("+c.nest+", true);\nfor (var "+o+" = 0; "+o+" < "+r+"; "+o+"++) {\n"+e+"}\n",c.nest--,l},Blockly.JavaScript.controls_repeat=Blockly.JavaScript.controls_repeat_ext,Blockly.JavaScript.controls_whileUntil=function(a){var t="UNTIL"==a.getFieldValue("MODE"),e=Blockly.JavaScript.valueToCode(a,"BOOL",t?Blockly.JavaScript.ORDER_LOGICAL_NOT:Blockly.JavaScript.ORDER_NONE)||"false",l=Blockly.JavaScript.statementToCode(a,"DO");return l=Blockly.JavaScript.addLoopTrap(l,a.id),t&&(e="!"+e),"while ("+e+") {\n"+l+"}\n"},Blockly.JavaScript.controls_for=function(a){var t,e=Blockly.JavaScript.variableDB_.getName(a.getFieldValue("VAR"),Blockly.Variables.NAME_TYPE),l=Blockly.JavaScript.valueToCode(a,"FROM",Blockly.JavaScript.ORDER_ASSIGNMENT)||"0",o=Blockly.JavaScript.valueToCode(a,"TO",Blockly.JavaScript.ORDER_ASSIGNMENT)||"0",c=Blockly.JavaScript.valueToCode(a,"BY",Blockly.JavaScript.ORDER_ASSIGNMENT)||"1",r=Blockly.JavaScript.statementToCode(a,"DO");if(r=Blockly.JavaScript.addLoopTrap(r,a.id),Blockly.isNumber(l)&&Blockly.isNumber(o)&&Blockly.isNumber(c)){var i=parseFloat(l)<=parseFloat(o);t="for ("+e+" = "+l+"; "+e+(i?" <= ":" >= ")+o+"; "+e;var n=Math.abs(parseFloat(c));t+=1==n?i?"++":"--":(i?" += ":" -= ")+n,t+=") {\n"+r+"}\n"}else{t="";var p=l;l.match(/^\w+$/)||Blockly.isNumber(l)||(t+="var "+(p=Blockly.JavaScript.variableDB_.getDistinctName(e+"_start",Blockly.Variables.NAME_TYPE))+" = "+l+";\n");var v=o;if(!o.match(/^\w+$/)&&!Blockly.isNumber(o))t+="var "+(v=Blockly.JavaScript.variableDB_.getDistinctName(e+"_end",Blockly.Variables.NAME_TYPE))+" = "+o+";\n";var s=Blockly.JavaScript.variableDB_.getDistinctName(e+"_inc",Blockly.Variables.NAME_TYPE);t+="var "+s+" = ",Blockly.isNumber(c)?t+=Math.abs(c)+";\n":t+="Math.abs("+c+");\n",t+="if ("+p+" > "+v+") {\n",t+=Blockly.JavaScript.INDENT+s+" = -"+s+";\n",t+="}\n",t+="for ("+e+" = "+p+";\n     "+s+" >= 0 ? "+e+" <= "+v+" : "+e+" >= "+v+";\n     "+e+" += "+s+") {\n"+r+"}\n"}return t},Blockly.JavaScript.controls_forEach=function(a){var t=Blockly.JavaScript.variableDB_.getName(a.getFieldValue("VAR"),Blockly.Variables.NAME_TYPE),e=Blockly.JavaScript.valueToCode(a,"LIST",Blockly.JavaScript.ORDER_ASSIGNMENT)||"[]",l=Blockly.JavaScript.statementToCode(a,"DO");l=Blockly.JavaScript.addLoopTrap(l,a.id);var o="",c=e;e.match(/^\w+$/)||(o+="var "+(c=Blockly.JavaScript.variableDB_.getDistinctName(t+"_list",Blockly.Variables.NAME_TYPE))+" = "+e+";\n");var r=Blockly.JavaScript.variableDB_.getDistinctName(t+"_index",Blockly.Variables.NAME_TYPE);return o+="for (var "+r+" in "+c+") {\n"+(l=Blockly.JavaScript.INDENT+t+" = "+c+"["+r+"];\n"+l)+"}\n"},Blockly.JavaScript.math_number=function(a){c.nest++;var t="await wait("+c.nest+");\n"+c.tmp+" = "+parseFloat(a.getFieldValue("NUM"))+";\n";return c.nest--,[t,Blockly.JavaScript.ORDER_ATOMIC]},Blockly.JavaScript.math_arithmetic=function(a){var t={ADD:[" + ",Blockly.JavaScript.ORDER_ADDITION],MINUS:[" - ",Blockly.JavaScript.ORDER_SUBTRACTION],MULTIPLY:[" * ",Blockly.JavaScript.ORDER_MULTIPLICATION],DIVIDE:[" / ",Blockly.JavaScript.ORDER_DIVISION],POWER:[null,Blockly.JavaScript.ORDER_COMMA]}[a.getFieldValue("OP")],e=t[0],l=t[1];c.nest++;var o,r=Blockly.JavaScript.valueToCode(a,"A",l)||"0",i=Blockly.JavaScript.valueToCode(a,"B",l)||"0";if(!e){var n=c.tmp+c.tmp_count++,p=c.tmp+c.tmp_count++;return o=r+"var "+n+" = "+c.tmp+";\n"+i+"var "+p+" = "+c.tmp+";\nawait wait("+c.nest+");\n"+c.tmp+" = Math.pow("+n+", "+p+");",c.nest--,[o,Blockly.JavaScript.ORDER_FUNCTION_CALL]}n=c.tmp+c.tmp_count++,p=c.tmp+c.tmp_count++;return o=r+"var "+n+" = "+c.tmp+";\n"+i+"var "+p+" = "+c.tmp+";\nawait wait("+c.nest+");\n"+c.tmp+" = "+n+e+p+";\n",c.nest--,[o,l]},Blockly.JavaScript.math_single=function(a){alert("MY_math_single!!!");var t,e,l=a.getFieldValue("OP");if("NEG"==l)return"-"==(e=Blockly.JavaScript.valueToCode(a,"NUM",Blockly.JavaScript.ORDER_UNARY_NEGATION)||"0")[4]&&(e=" "+e),[t=e+c.tmp+"= (-1)*"+c.tmp+";\n",Blockly.JavaScript.ORDER_UNARY_NEGATION];switch(e="SIN"==l||"COS"==l||"TAN"==l?Blockly.JavaScript.valueToCode(a,"NUM",Blockly.JavaScript.ORDER_DIVISION)||"0":Blockly.JavaScript.valueToCode(a,"NUM",Blockly.JavaScript.ORDER_NONE)||"0",l){case"ABS":t=e+"await wait();\n"+c.tmp+" = Math.abs("+c.tmp+");\nawait wait();\n";break;case"ROOT":t=e+"await wait();\n"+c.tmp+" = Math.sqrt("+c.tmp+");\nawait wait();\n";break;case"LN":t=e+"await wait();\n"+c.tmp+" = Math.log("+c.tmp+");\nawait wait();\n";break;case"EXP":t=e+"await wait();\n"+c.tmp+" = Math.exp("+c.tmp+");\nawait wait();\n";break;case"POW10":t=e+"await wait();\n"+c.tmp+" = Math.pow(10,"+c.tmp+");\nawait wait();\n";break;case"ROUND":t=e+"await wait();\n"+c.tmp+" = Math.round("+c.tmp+");\nawait wait();\n";break;case"ROUNDUP":t=e+"await wait();\n"+c.tmp+" = Math.ceil("+c.tmp+");\nawait wait();\n";break;case"ROUNDDOWN":t=e+"await wait();\n"+c.tmp+" = Math.floor("+c.tmp+");\nawait wait();\n";break;case"SIN":t=e+"await wait();\n"+c.tmp+" = Math.sin("+genaration.tmp+" / 180 * Math.PI);\nawait wait();\n";break;case"COS":t=e+"await wait();\n"+c.tmp+" = Math.cos("+c.tmp+" / 180 * Math.PI);\nawait wait();\n";break;case"TAN":t=e+"await wait();\n"+c.tmp+" = Math.tan("+c.tmp+" / 180 * Math.PI);\nawait wait();\n"}if(t)return[t,Blockly.JavaScript.ORDER_FUNCTION_CALL];switch(l){case"LOG10":t="Math.log("+e+") / Math.log(10)";break;case"ASIN":t="Math.asin("+e+") / Math.PI * 180";break;case"ACOS":t="Math.acos("+e+") / Math.PI * 180";break;case"ATAN":t="Math.atan("+e+") / Math.PI * 180";break;default:throw"Unknown math operator: "+l}return[t,Blockly.JavaScript.ORDER_DIVISION]};e(1);Blockly.JavaScript.text=function(a){c.nest++;var t="await wait("+c.nest+");\n"+c.tmp+" = "+Blockly.JavaScript.quote_(a.getFieldValue("TEXT"))+";";return c.nest--,[t,Blockly.JavaScript.ORDER_ATOMIC]},Blockly.JavaScript.text_print=function(a){c.nest++;var t=(Blockly.JavaScript.valueToCode(a,"TEXT",Blockly.JavaScript.ORDER_NONE)||"''")+"await wait("+c.nest+");\nwindow.alert("+c.tmp+");\n";return c.nest--,t},Blockly.JavaScript.variables_get=function(a){c.nest++;var t="await wait("+c.nest+");\n"+c.tmp+" = "+Blockly.JavaScript.variableDB_.getName(a.getFieldValue("VAR"),Blockly.Variables.NAME_TYPE)+";\n";return c.nest--,[t,Blockly.JavaScript.ORDER_ATOMIC]},Blockly.JavaScript.variables_set=function(a){c.nest++;var t=Blockly.JavaScript.valueToCode(a,"VALUE",Blockly.JavaScript.ORDER_ASSIGNMENT)||"0",e=Blockly.JavaScript.variableDB_.getName(a.getFieldValue("VAR"),Blockly.Variables.NAME_TYPE),l=t+"await wait("+c.nest+");\n"+e+" = "+c.tmp+";\n";return c.nest--,l},o.Run=(()=>{if(!l.hasInstance()){Blockly.JavaScript.STATEMENT_PREFIX="";var a=Blockly.JavaScript.workspaceToCode(window.workspace);l.Instance().postMessage({type:"run",data:a})}}),o.StepInto=(()=>{l.hasInstance()&&l.Instance().postMessage({type:"stepInto"})}),o.StepOver=(()=>{l.hasInstance()&&l.Instance().postMessage({type:"stepOver"})}),o.StepOut=(()=>{l.hasInstance()&&l.Instance().postMessage({type:"stepOut"})}),o.Stop=(()=>{l.Stop()}),o.Start=(()=>{if(!l.hasInstance()){Blockly.JavaScript.STATEMENT_PREFIX="highlightBlock(%1);\n";var a=Blockly.JavaScript.workspaceToCode(window.workspace);l.Instance().postMessage({type:"start_debugging",data:a}),console.log(a)}}),document.getElementById("RunButton").onclick=o.Run,document.getElementById("StepIntoButton").onclick=o.StepInto,document.getElementById("StepOverButton").onclick=o.StepOver,document.getElementById("StepOutButton").onclick=o.StepOut,document.getElementById("StopButton").onclick=o.Stop,document.getElementById("StartButton").onclick=o.Start},function(a,t){Blockly.JavaScript.procedures_defreturn=function(a){var t=Blockly.JavaScript.variableDB_.getName(a.getFieldValue("NAME"),Blockly.Procedures.NAME_TYPE),e=Blockly.JavaScript.statementToCode(a,"STACK");Blockly.JavaScript.STATEMENT_PREFIX&&(e=Blockly.JavaScript.prefixLines(Blockly.JavaScript.STATEMENT_PREFIX.replace(/%1/g,"'"+a.id+"'"),Blockly.JavaScript.INDENT)+e),Blockly.JavaScript.INFINITE_LOOP_TRAP&&(e=Blockly.JavaScript.INFINITE_LOOP_TRAP.replace(/%1/g,"'"+a.id+"'")+e);var l=Blockly.JavaScript.valueToCode(a,"RETURN",Blockly.JavaScript.ORDER_NONE)||"";l&&(l="  return "+l+";\n");for(var o=[],c=0;c<a.arguments_.length;c++)o[c]=Blockly.JavaScript.variableDB_.getName(a.arguments_[c],Blockly.Variables.NAME_TYPE);var r="async function "+t+"("+o.join(", ")+") {\n  let local_over = isStepOver();\n  let local_out = isStepOut();\n"+e+"  if(local_out==false) flag_out = false;\n"+l+"}";return r=Blockly.JavaScript.scrub_(a,r),Blockly.JavaScript.definitions_[t]=r,null},Blockly.JavaScript.procedures_defnoreturn=Blockly.JavaScript.procedures_defreturn,Blockly.JavaScript.procedures_callreturn=function(a){for(var t=Blockly.JavaScript.variableDB_.getName(a.getFieldValue("NAME"),Blockly.Procedures.NAME_TYPE),e=[],l=0;l<a.arguments_.length;l++)e[l]=Blockly.JavaScript.valueToCode(a,"ARG"+l,Blockly.JavaScript.ORDER_COMMA)||"null";return["await "+t+"("+e.join(", ")+")",Blockly.JavaScript.ORDER_FUNCTION_CALL]},Blockly.JavaScript.procedures_callnoreturn=function(a){for(var t=Blockly.JavaScript.variableDB_.getName(a.getFieldValue("NAME"),Blockly.Procedures.NAME_TYPE),e=[],l=0;l<a.arguments_.length;l++)e[l]=Blockly.JavaScript.valueToCode(a,"ARG"+l,Blockly.JavaScript.ORDER_COMMA)||"null";return"await "+t+"("+e.join(", ")+");\n"}},function(a,t){Blockly.Generator.prototype.valueToCode=function(a,t,e){isNaN(e)&&goog.asserts.fail('Expecting valid order from block "%s".',a.type);var l=a.getInputTargetBlock(t);if(!l)return"";var o=this.blockToCode(l);if(""===o)return"";goog.asserts.assertArray(o,'Expecting tuple from value block "%s".',l.type);var c=o[0],r=o[1];return isNaN(r)&&goog.asserts.fail('Expecting valid order from value block "%s".',l.type),c&&e<=r&&(e!=r||0!=e&&99!=e)&&5!=e&&6!=e&&(c="("+c+")"),c}}]);
//# sourceMappingURL=bundle.js.map