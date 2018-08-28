import {Debuggee_Worker, Blockly_Debugger} from '../init.js';

Blockly_Debugger.actions["Watch"] = {};
Blockly_Debugger.actions["Watch"].watches = [];


Blockly_Debugger.actions["Watch"].handler = () =>  {
    if(!Debuggee_Worker.hasInstance()) return; 
    Debuggee_Worker.Instance().postMessage({"type":"watch", "data": Blockly_Debugger.actions["Watch"].watches});
}