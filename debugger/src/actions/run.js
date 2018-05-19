import {DebuggeeWorker, Blocly_Debugger} from '../init.js';

Blocly_Debugger["Run"] = () => {

    if(DebuggeeWorker.hasInstance()) return; 

    Blockly.JavaScript.STATEMENT_PREFIX = '';
    var code = Blockly.JavaScript.workspaceToCode(window.workspace);
    DebuggeeWorker.Instance().postMessage({"type":"run", "data": code});
}