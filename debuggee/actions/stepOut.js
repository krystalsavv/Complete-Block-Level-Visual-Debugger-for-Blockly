import {actions, flag, flag_out, flag_over} from "../init.js";

actions["stepOut"] = () => {
  require("../init.js").flag = true;
  require("../init.js").flag_over = false;
  require("../init.js").flag_out = true;
};

export function isStepOut(){
    if(require("../init.js").flag_out==true)
      return true;
    else
      return false;  
}