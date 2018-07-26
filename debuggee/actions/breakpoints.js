import {Blockly_Debuggee, dispatcher} from '../init.js';

Blockly_Debuggee.actions["breakpoint"] = {};

Blockly_Debuggee.actions["breakpoint"] = (function(){
    var breakpoints = [];
    function handler(br){
        breakpoints = br;
    };

    function includes(block_id){
        return breakpoints.includes(block_id);
    };
    
    function update(updated){
        breakpoints = updated;
    };

    return {
        handler : handler,
        includes: includes,
        update : update
    };

})();


Blockly_Debuggee.actions["runToCursor"] = (function(){
    var cursorBreakpoint = "";
    function handler(block_id){
        Blockly_Debuggee.actions["runToCursor"].cursorBreakpoint = block_id;
        Blockly_Debuggee.state.stepWait = true;
        //console.log("cursorBreakpoint:   " + this.cursorBreakpoint);
    }

    return {
        cursorBreakpoint : cursorBreakpoint,
        handler : handler
    }
})();



dispatcher.breakpoint = Blockly_Debuggee.actions["breakpoint"].handler;
dispatcher.runToCursor = Blockly_Debuggee.actions["runToCursor"].handler;
