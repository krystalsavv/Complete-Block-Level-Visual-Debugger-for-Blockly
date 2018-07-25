import {Blockly_Debuggee, dispatcher} from '../init.js';

Blockly_Debuggee.actions.breakpoint = {};

Blockly_Debuggee.actions.breakpoint = (function(){
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

dispatcher.breakpoint = Blockly_Debuggee.actions["breakpoint"].handler;
