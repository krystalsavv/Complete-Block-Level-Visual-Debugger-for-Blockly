import {actions, flags, window} from "../init.js";

actions["stepInto"] = () => {
    flags.in = true;
    flags.stepWait = true;
    flags.currentNest++;
    // flags.in = true;
    // flags.over = false;
};

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
  
function next_message() { 
    return sleep(0); 
}

var count  = 0 ;

export async function wait(nest, block){
    count ++;
    console.log("wait"+ count + ' curr:' + flags.currentNest + ' nest:' + nest);
    while(flags.currentNest <= nest){
        if(flags.currentNest == nest && flags.stepWait) {
            break;
        }
        console.log(flags.currentNest);
        while(!flags.stepWait){
            await next_message();
        }
        flags.stepWait = false;
    }
    if(flags.currentNest > nest && !block){
        //if(block) flags.currentNest = nest + 1;
        flags.currentNest = nest;
    }
    console.log("\tout " + flags.currentNest);
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