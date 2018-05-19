import {DebuggeeWorker, Blocly_Debugger} from '../init.js';

Blocly_Debugger["StepInto"] = () => {
    if(!DebuggeeWorker.hasInstance()) return; 
    DebuggeeWorker.Instance().postMessage({"type":"stepInto"});
}

Blocly_Debugger["StepOver"] = () => {
    if(!DebuggeeWorker.hasInstance()) return; 
    DebuggeeWorker.Instance().postMessage({"type":"stepOver"});
}

Blocly_Debugger["StepOut"] = () => {
    if(!DebuggeeWorker.hasInstance()) return; 
    DebuggeeWorker.Instance().postMessage({"type":"stepOut"});
}