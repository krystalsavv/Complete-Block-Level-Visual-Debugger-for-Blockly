import {actions, flag, flag_out, flag_over} from "../init.js";

actions["stepOver"] = () => {
  require("../init.js").flag = true;
  require("../init.js").flag_over = true;
};

export function isStepOver(){
    if(require("../init.js").flag_over==true)
      return true;
    else
      return false;  
  }