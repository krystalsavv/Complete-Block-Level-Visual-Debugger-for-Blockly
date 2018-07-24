import {Debuggee_Worker, Blocly_Debugger} from '../init.js';

export var breakpoints = [];

Blocly_Debugger["Breakpoint"] = (block_id) => {
    if(!Debuggee_Worker.hasInstance()) return; 
    Debuggee_Worker.Instance().postMessage({"type":"breakpoint", "data":breakpoints});
}