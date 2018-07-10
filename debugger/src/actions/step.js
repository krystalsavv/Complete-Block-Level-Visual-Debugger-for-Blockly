import {Debuggee_Worker, Blocly_Debugger} from '../init.js';

Blocly_Debugger["StepIn"] = () => {
    if(!Debuggee_Worker.hasInstance()) return; 
    Debuggee_Worker.Instance().postMessage({"type":"stepIn"});
}

Blocly_Debugger["StepOver"] = () => {
    if(!Debuggee_Worker.hasInstance()) return; 
    Debuggee_Worker.Instance().postMessage({"type":"stepOver"});
}

Blocly_Debugger["StepUp"] = () => {
    if(!Debuggee_Worker.hasInstance()) return; 
    Debuggee_Worker.Instance().postMessage({"type":"stepUp"});
}

Blocly_Debugger["StepOut"] = () => {
    if(!Debuggee_Worker.hasInstance()) return; 
    Debuggee_Worker.Instance().postMessage({"type":"stepOut"});
}