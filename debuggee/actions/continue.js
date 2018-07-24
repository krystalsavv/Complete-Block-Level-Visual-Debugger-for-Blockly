import {actions, flags} from "../init.js";

actions["continue"] = (content) => {
    flags.stepWait = true;
    flags.setTrue("continue");
};

export function isContinue(){
  return flags.continue; 
}