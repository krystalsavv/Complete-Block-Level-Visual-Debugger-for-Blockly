import {actions, flags, window} from "../init.js";

actions["stepInto"] = () => {
    flags.stepWait = true;
    // flags.in = true;
    // flags.over = false;
};

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
  
function next_message() { 
    return sleep(0); 
}
  
async function wait(){
    flags.stepWait = false;
   // highlightBlock(blocksID[currBlock]);
   // ++currBlock;
    while(!flags.stepWait){
      await next_message();
    }
  }


// export async function stepInto_wait(local_over){
//     if(flags.out==true) return;
//     else if(local_over==true) return;
//     else if(local_over==false){
//         flags.in = false;
//       while (flags.in == false) {
//         await next_message();
//       }
//     }else{
//       window.alert("Problem in StepInto with local_over" + local_over);
//     }
// }