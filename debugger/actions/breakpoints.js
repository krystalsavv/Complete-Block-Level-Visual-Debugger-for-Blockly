import {Debuggee_Worker, Blockly_Debugger} from '../init.js';

Blockly_Debugger.actions["Breakpoint"] = {};

Blockly_Debugger.actions["Breakpoint"].handler = () => {
    if(!Debuggee_Worker.hasInstance()) return; 
    Debuggee_Worker.Instance().postMessage({"type":"breakpoint", "data": Blockly_Debugger["Breakpoint"].breakpoints});
}


Blockly_Debugger.actions["Breakpoint"].breakpoints = [];
