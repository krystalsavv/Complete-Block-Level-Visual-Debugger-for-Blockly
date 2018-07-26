import {Debuggee_Worker, Blockly_Debugger} from '../init.js';

Blockly_Debugger.actions["Breakpoint"] = {};
Blockly_Debugger.actions["RunToCursor"] = {};

Blockly_Debugger.actions["Breakpoint"].breakpoints = [];

Blockly_Debugger.actions["Breakpoint"].handler = () => {
    if(!Debuggee_Worker.hasInstance()) return; 
    Debuggee_Worker.Instance().postMessage({"type":"breakpoint", "data": Blockly_Debugger.actions["Breakpoint"].breakpoints});
}



Blockly_Debugger.actions["RunToCursor"].handler = (block_id) => {
    if(!Debuggee_Worker.hasInstance()) {
        Blockly_Debugger.actions["Start"].handler(block_id);
        return;
    }; 
    Debuggee_Worker.Instance().postMessage({"type":"runToCursor", "data": block_id});
}