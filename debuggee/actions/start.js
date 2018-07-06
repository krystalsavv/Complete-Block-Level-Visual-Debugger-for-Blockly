import {actions} from "../init.js";

var wait = require("./stepInto.js").wait;
var isStepOut = require("./stepOut.js").isStepOut;
var isStepOver = require("./stepOver.js").isStepOver;
var window = require("../init.js").window;

actions["start_debugging"] = async (content) => {
    //window.alert(content);
    if(content!=undefined){
        await eval("async function code(){var local_over=false;var local_out=false; "+ content +" };  code();");
        postMessage({"type": "execution_finished"});
    } else {
        window.alert("The content is undefined.");
    }
};

async function $id(wait_call, code){
    return code;
}
