import {DebuggeeWorker, Blocly_Debugger} from '../init.js';

Blocly_Debugger["Start"] = () => {
    if(DebuggeeWorker.hasInstance()) return;  

    Blockly.JavaScript.STATEMENT_PREFIX = 'highlightBlock(%1);\nawait stepInto_wait(local_over);\n';
    var code = Blockly.JavaScript.workspaceToCode(window.workspace); 
    DebuggeeWorker.Instance().postMessage({"type":"start_debugging", "data": code});
}
