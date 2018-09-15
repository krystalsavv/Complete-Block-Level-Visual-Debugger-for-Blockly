import {Debuggee_Worker, Blockly_Debugger} from '../init.js';

Blockly_Debugger.actions["Breakpoint"] = {};
Blockly_Debugger.actions["RunToCursor"] = {};

Blockly_Debugger.actions["Breakpoint"].breakpoints = [];

Blockly_Debugger.actions["Breakpoint"].handler = () => {
    if(!Debuggee_Worker.hasInstance()) return; 
    Debuggee_Worker.Instance().postMessage({"type":"breakpoint", "data": Blockly_Debugger.actions["Breakpoint"].breakpoints.map((obj)=>{return {"block_id" : obj.block_id,
                                                                                                                                                "enable" : obj.enable}}),});
}

Blockly_Debugger.actions["Breakpoint"].wait_view = (block_id) => {
    var CurrentSystemEditorId = window.workspace["blockly1"].getBlockById(block_id) ? "blockly1" : "blockly2";
    var block = window.workspace[CurrentSystemEditorId].getBlockById(block_id);
    while(block!=null){
        block.setCollapsed(false);
        block = block.parentBlock_;
    }
    window.workspace[CurrentSystemEditorId].traceOn_ = true;                // hilighting (gt den kanei an einai collapsed)
    window.workspace[CurrentSystemEditorId].highlightBlock(block_id);
    
    document.getElementById(block_id).style.stroke = 'red';
    document.getElementById(block_id).style.fill = 'yellow';
    document.getElementById(block_id).style['stroke-width'] = '5px';
}

Blockly_Debugger.actions["Breakpoint"].reset_view = (block_id) =>{
    document.getElementById(block_id).style.stroke = 'yellow';
    document.getElementById(block_id).style.fill = 'red';
    document.getElementById(block_id).style['stroke-width'] = '1px';
}

Blockly_Debugger.actions["Breakpoint"].disable = (block_id) =>{
    var i = Blockly_Debugger.actions["Breakpoint"].breakpoints.map((obj)=>{return obj.block_id;}).indexOf(block_id);
    if(i!=-1){
        document.getElementById(block_id).style.stroke = 'yellow';
        document.getElementById(block_id).style.fill = '#FA8258';
        document.getElementById(block_id).style['stroke-width'] = '1px';
        Blockly_Debugger.actions["Breakpoint"].breakpoints[i].enable = false;
        if(Debuggee_Worker.hasInstance()) 
            Debuggee_Worker.Instance().postMessage({"type":"breakpoint", "data": Blockly_Debugger.actions["Breakpoint"].breakpoints.map((obj)=>{return {"block_id" : obj.block_id,
                                                                                                                                                "enable" : obj.enable}}),});
    }
}

Blockly_Debugger.actions["Breakpoint"].enable = (block_id) =>{
    var i = Blockly_Debugger.actions["Breakpoint"].breakpoints.map((obj)=>{return obj.block_id;}).indexOf(block_id);
    if(i!=-1){
        document.getElementById(block_id).style.fill = 'red';
        Blockly_Debugger.actions["Breakpoint"].breakpoints[i].enable = true;
        if(Debuggee_Worker.hasInstance()) 
            Debuggee_Worker.Instance().postMessage({"type":"breakpoint", "data": Blockly_Debugger.actions["Breakpoint"].breakpoints.map((obj)=>{return {"block_id" : obj.block_id,
                                                                                                                                                "enable" : obj.enable}}),});
    }
}


Blockly_Debugger.actions["RunToCursor"].handler = (block_id) => {
    if(!Debuggee_Worker.hasInstance()) {
        Blockly_Debugger.actions["Start"].handler(block_id);
        return;
    }; 
    Debuggee_Worker.Instance().postMessage({"type":"runToCursor", "data": block_id});
}

Debuggee_Worker.AddOnDispacher("breakpoint_wait_view", Blockly_Debugger.actions["Breakpoint"].wait_view);
Debuggee_Worker.AddOnDispacher("breakpoint_reset_view", Blockly_Debugger.actions["Breakpoint"].reset_view);
