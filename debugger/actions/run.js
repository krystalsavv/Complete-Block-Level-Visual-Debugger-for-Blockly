import {Debuggee_Worker, Blocly_Debugger} from '../init.js';

Blocly_Debugger["Run"] = () => {

    if(Debuggee_Worker.hasInstance()) return; 

    Blockly.JavaScript.STATEMENT_PREFIX = '';
    var code = Blockly.JavaScript.workspaceToCode(window.workspace);
    Debuggee_Worker.Instance().postMessage({"type":"run", "data": code});
}