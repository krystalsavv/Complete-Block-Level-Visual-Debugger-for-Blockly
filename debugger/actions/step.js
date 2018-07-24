import {Debuggee_Worker, Blocly_Debugger} from '../init.js';

Blocly_Debugger["StepIn"] = {}; 
Blocly_Debugger["StepOver"] = {};
Blocly_Debugger["StepParent"] = {};
Blocly_Debugger["StepOut"] = {}; 

Blocly_Debugger["StepIn"].handler = () => {
    if(!Debuggee_Worker.hasInstance()) return; 
    Debuggee_Worker.Instance().postMessage({"type":"stepIn"});
}

Blocly_Debugger["StepOver"].handler = () => {
    if(!Debuggee_Worker.hasInstance()) return; 
    Debuggee_Worker.Instance().postMessage({"type":"stepOver"});
}

Blocly_Debugger["StepParent"].handler = () => {
    if(!Debuggee_Worker.hasInstance()) return; 
    Debuggee_Worker.Instance().postMessage({"type":"stepParent"});
}

Blocly_Debugger["StepOut"].handler = () => {
    if(!Debuggee_Worker.hasInstance()) return; 
    Debuggee_Worker.Instance().postMessage({"type":"stepOut"});
}