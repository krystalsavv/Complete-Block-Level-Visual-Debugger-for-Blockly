import {Debuggee_Worker, Blocly_Debugger} from '../init.js';

Blocly_Debugger["Start"] = () => {
    if(Debuggee_Worker.hasInstance()) return;  

    Blockly.JavaScript.STATEMENT_PREFIX = 'highlightBlock(%1);\nawait wait();\n';
    var code = Blockly.JavaScript.workspaceToCode(window.workspace); 
    Debuggee_Worker.Instance().postMessage({"type":"start_debugging", "data": code});
}
