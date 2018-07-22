import {actions, flags, window} from "../init.js";


actions["stepIn"] = () => {
    flags.stepWait = true;
    flags.setTrue("in");
};

export function isStepIn(){
    return flags.in; 
}