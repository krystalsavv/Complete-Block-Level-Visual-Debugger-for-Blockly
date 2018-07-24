import {actions} from "../init.js";
import {isStepIn} from "./stepIn.js";
import {isStepOut} from "./stepOut.js";
import {hasBreakpoint, updateBreakpoints} from "./breakpoints.js";

var isStepOver = require("./stepOver.js").isStepOver;
var isStepParent = require("./stepParent.js").isStepParent;
var isContinue = require("./continue.js").isContinue;
var window = require("../init.js").window;
var flags = require("../init.js").flags;

actions["start_debugging"] = async (content) => {
    //window.alert(content);
    if(content!=undefined){        
        updateBreakpoints(content.breakpoints);
        await eval("async function code(){ "+ content.code +" };  code();");
        postMessage({"type": "execution_finished"});
    } else {
        window.alert("The content is undefined.");
    }
};

async function $id(wait_call, code){
    return code;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
  
function next_message() { 
    return sleep(0); 
}

export async function wait(nest, block_id, CurrentSystemEditorId){
    highlightBlock(block_id, CurrentSystemEditorId);
    if(isContinue() && !hasBreakpoint(block_id)) {
        return;
    }
    if(flags.currNest == -1) return;    // stepOver + stepOut for functions                   
    if(isStepIn() || isContinue() || nest <= flags.currNest){
        if(flags.currId  === block_id && !isContinue()) return;
        if(isStepParent() && nest == flags.currNest) return;
        while(!flags.stepWait){
            await next_message();
        }
        flags.stepWait = false;
        flags.currId = block_id;
        if(isStepOut()){
            flags.currNest = -1;
            flags.out = false;
        }else{
            flags.currNest = nest;
        }       
    }
}


function highlightBlock(id, CurrentSystemEditorId){
    postMessage({"type": "highlightBlock", "data" : {"id" : id, "CurrentSystemEditorId" : CurrentSystemEditorId}});
}