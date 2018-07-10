import {actions, flags} from "../init.js";

actions["stepOver"] = () => {
  flags.stepWait = true;
  flags.setTrue("over");
  // flags.in = false;
  // flags.over = true;
};

export function isStepOver(){
      return flags.over;  
  }