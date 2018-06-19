import {actions, flags} from "../init.js";

actions["stepOut"] = () => {
  flags.in = true;
  flags.over = false;
  flags.out = true;
};

export function isStepOut(){
    if(flags.out == true)
      return true;
    else
      return false;  
}