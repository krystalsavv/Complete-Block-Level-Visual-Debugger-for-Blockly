import {Debuggee_Worker, Blockly_Debugger} from '../init.js';
import './watches.js';

// function addCode(js){                                // gia na kanw debug to eval 
//     var e = document.createElement('script');
//     e.type = 'text/javascript';
//     e.src  = 'data:text/javascript;charset=utf-8,'+escape(js);
//     document.head.appendChild(e);
// }

Blockly_Debugger.actions["Start"] = {};

Blockly_Debugger.actions["Start"].handler = (cursorBreakpoint) => {
    if(Debuggee_Worker.hasInstance()) return;
    Blockly.JavaScript.STATEMENT_PREFIX = 'await $id(%1, 0);\n';
    var code1 = Blockly.JavaScript.workspaceToCode(window.workspace["blockly1"]);
    var code2 = Blockly.JavaScript.workspaceToCode(window.workspace["blockly2"]); 
    var code = code1 + code2;
    

    var variables1 = window.workspace["blockly1"].getAllVariables().map((variable) => {
        return variable.name;
    });
    var variables2 = (window.workspace["blockly2"].getAllVariables()).map((variable) => {
        return variable.name;
    });
    

    console.log( window.workspace["blockly1"].getAllVariables());

    var variables= [];
    for(var i = 0; i<variables1.length; ++i){
        var nvar = {
            "name" : variables1[i],
            "value" : undefined
        }
        variables.push(nvar);
    }

    var variables_names =  variables.map((variable) => {
        return variable.name;
    });
    for(var i = 0; i<variables2.length; ++i){
        if(variables_names.includes(variables2[i])) continue;
        var nvar = {
            "name" : variables2[i],
            "value" : undefined
        }
        variables.push(nvar);
    }
    Blockly_Debugger.actions["Variables"].update(variables);

    // var code = "async function code(){\n" + code1 + code2 +" };\ncode();";
    // addCode(code);
    if(cursorBreakpoint instanceof MouseEvent) cursorBreakpoint = "";
    Debuggee_Worker.Instance().postMessage({"type":"start_debugging", "data": {"code": code, 
                                                                               "breakpoints": Blockly_Debugger.actions["Breakpoint"].breakpoints,
                                                                               "cursorBreakpoint": cursorBreakpoint,
                                                                               "watches": Blockly_Debugger.actions["Watch"].watches,            // prepei na kanw allages gt kanoyn allo pragma
                                                                               "variables": variables
                                                                            }});
    console.log(code1 + code2);
}
