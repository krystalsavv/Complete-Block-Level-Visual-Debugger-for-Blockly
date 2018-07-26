import '../init.js';
import {dispatcher} from '../init.js';
var Blockly_Debuggee = require("../init.js").Blockly_Debuggee;
var window = require("../init.js").window;

Blockly_Debuggee.actions.start_debugging = (function (){
    async function handler(content){
        if(content!=undefined){        
            Blockly_Debuggee.actions.breakpoint.update(content.breakpoints);
            Blockly_Debuggee.actions["runToCursor"].cursorBreakpoint = content.cursorBreakpoint;
            await eval("async function code(){ "+ content.code +" };  code();");
            postMessage({"type": "execution_finished"});
        } else {
            window.alert("The content is undefined.");
        }
    };

    async function $id(wait_call, code){
        return code;
    };

    async function wait(nest, block_id, CurrentSystemEditorId){
        await Blockly_Debuggee.wait(nest, block_id, CurrentSystemEditorId);
    };

    function isStepOver(){
        return Blockly_Debuggee.state.isState("stepOver");
    };


    function isStepParent(){
        return Blockly_Debuggee.state.isState("stepParent");
    };

    return {
        handler : handler
    };
})();


dispatcher.start_debugging = Blockly_Debuggee.actions["start_debugging"].handler;
