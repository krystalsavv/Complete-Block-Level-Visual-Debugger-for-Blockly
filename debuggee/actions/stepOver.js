import {actions, flags} from "../init.js";

actions["stepOver"] = () => {
  flags.in = true;
  flags.over = true;
};

export function isStepOver(){
    if(flags.over==true)
      return true;
    else
      return false;  
  }