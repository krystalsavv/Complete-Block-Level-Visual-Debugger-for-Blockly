import {Debuggee_Worker, Blocly_Debugger} from '../init.js';

Blocly_Debugger["Start"] = () => {
    if(Debuggee_Worker.hasInstance()) return;  

    Blockly.JavaScript.STATEMENT_PREFIX = 'await $id(%1, 0);\n';
    var code1 = Blockly.JavaScript.workspaceToCode(window.workspace["blockly1"]);
    var code2 = Blockly.JavaScript.workspaceToCode(window.workspace["blockly2"]); 
    Debuggee_Worker.Instance().postMessage({"type":"start_debugging", "data": code1 + code2});
    console.log(code1 + code2);
}
