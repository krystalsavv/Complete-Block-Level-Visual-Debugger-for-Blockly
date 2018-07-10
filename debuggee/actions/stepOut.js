import {actions, flags} from "../init.js";

actions["stepOut"] = () => {
  flags.stepWait = true;
  flags.setTrue("out");
};

export function isStepOut(){
    return flags.out;  
}