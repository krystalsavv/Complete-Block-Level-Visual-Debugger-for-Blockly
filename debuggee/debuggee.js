import {actions} from "./init.js";
import './actions/actions.js';

onmessage = function (msg) {
    let obj = msg.data;
    actions[obj.type](obj.data);
}

