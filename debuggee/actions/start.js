import '../init.js';
import {dispatcher} from '../init.js';
var Blockly_debuggee = require("../init.js").Blockly_Debuggee;
var window = require("../init.js").window;

Blockly_debuggee.actions.start_debugging = (function (){
    async function handler(content){
        if(content!=undefined){        
            Blockly_debuggee.actions.breakpoint.update(content.breakpoints);
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
        await Blockly_debuggee.wait(nest, block_id, CurrentSystemEditorId);
    };

    function isStepOver(){
        return Blockly_debuggee.state.isState("stepOver");
    };


    function isStepParent(){
        return Blockly_debuggee.state.isState("stepParent");
    };

    return {
        handler : handler
    };
})();


dispatcher.start_debugging = Blockly_debuggee.actions["start_debugging"].handler;
