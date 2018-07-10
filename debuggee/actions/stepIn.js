import {actions, flags, window} from "../init.js";
import {isStepOut} from "./stepOut.js";
import {isStepUp} from "./stepUp.js";

actions["stepIn"] = () => {
    flags.stepWait = true;
    flags.setTrue("in");
};

export function isStepIn(){
    return flags.in; 
}

