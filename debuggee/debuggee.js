import {actions} from "./init.js";
import "./actions/stepIn.js";
import "./actions/stepOut.js";
import "./actions/stepParent.js";
import "./actions/stepOver.js";
import "./actions/start.js";
import "./actions/run.js";

onmessage = function (msg) {
    let obj = msg.data;
    actions[obj.type](obj.data);
}

