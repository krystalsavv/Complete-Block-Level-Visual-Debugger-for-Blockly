var flag = true;
let window = {
    alert : function(msg) {
      postMessage({"type": "alert", "data" : msg});
    }
} ;  

var instractions = {
  "run" :  () => {
    window.alert(content);
    if(content!=undefined)
      eval(content);
    else 
      alert("The content is undefined.");
  },

  "code" : async () => {
    window.alert(content);
    if(content!=undefined)
      eval("async function code(){"+ content +"} code();");
    else 
      alert("The content is undefined.");
  },
  
  "step" : () => {
    flag = true;
  }
};

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function next_message() { 
  return sleep(0); 
}

async function step_wait(){
  flag = false;
  while (flag==false) {
    await next_message();
  }
}


function highlightBlock(id){
  postMessage({"type": "highlightBlock", "data" : id});
}


onmessage = function (msg) {
  let obj = msg.data;
  content = obj.data;
  instractions[obj.type]();
}