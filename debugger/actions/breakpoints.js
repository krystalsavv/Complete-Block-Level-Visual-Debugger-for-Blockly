import {Debuggee_Worker, Blocly_Debugger} from '../init.js';

Blocly_Debugger["Breakpoint"] = {};

Blocly_Debugger["Breakpoint"].handler = () => {
    if(!Debuggee_Worker.hasInstance()) return; 
    //console.log(locly_Debugger["Breakpoint"].breakpoints);
    Debuggee_Worker.Instance().postMessage({"type":"breakpoint", "data": Blocly_Debugger["Breakpoint"].breakpoints});
}


Blocly_Debugger["Breakpoint"].breakpoints = [];
