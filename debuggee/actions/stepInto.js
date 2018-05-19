import {actions, flag, flag_out, flag_over} from "../init.js";

actions["stepInto"] = () => {

    // require("../init.js").flag_over = false;
    // require("../init.js").flag = true;
    flag = true;
    flag_over = false;
};

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
  
function next_message() { 
    return sleep(0); 
}
  
export async function stepInto_wait(local_over){
    if(flag_out==true) return;
    else if(local_over==true) return;
    else if(local_over==false){
        flag = false;
      while (flag==false) {
        await next_message();
      }
    }else{
      window.alert("Problem in StepInto with local_over" + local_over);
    }
}