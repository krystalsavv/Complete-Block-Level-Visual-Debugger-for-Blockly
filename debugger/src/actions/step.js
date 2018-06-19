import {Debuggee_Worker, Blocly_Debugger} from '../init.js';

Blocly_Debugger["StepInto"] = () => {
    if(!Debuggee_Worker.hasInstance()) return; 
    Debuggee_Worker.Instance().postMessage({"type":"stepInto"});
}

Blocly_Debugger["StepOver"] = () => {
    if(!Debuggee_Worker.hasInstance()) return; 
    Debuggee_Worker.Instance().postMessage({"type":"stepOver"});
}

Blocly_Debugger["StepOut"] = () => {
    if(!Debuggee_Worker.hasInstance()) return; 
    Debuggee_Worker.Instance().postMessage({"type":"stepOut"});
}