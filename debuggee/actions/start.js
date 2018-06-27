// import {actions, window} from "../init.js";
// import {stepInto_wait} from "./stepInto.js";
// import {isStepOut} from "./stepOut.js";
// import {isStepOver} from "./stepOver.js"; 
import {actions} from "../init.js";

var stepInto_wait = require("./stepInto.js").stepInto_wait;
var isStepOut = require("./stepOut.js").isStepOut;
var isStepOver = require("./stepOver.js").isStepOver;
var window = require("../init.js").window;

actions["start_debugging"] = async (content) => {
    window.alert(content);
    if(content!=undefined){
        await eval("async function code(){var local_over=false;var local_out=false;"+ content +" };  code();");
        postMessage({"type": "execution_finished"});
    } else {
        window.alert("The content is undefined.");
    }
};


function highlightBlock(id){
        postMessage({"type": "highlightBlock", "data" : id});
}