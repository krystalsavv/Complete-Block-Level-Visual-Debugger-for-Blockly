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

  "code" : async function () {
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


async function loop(){
    return new Promise((resolve, reject)=>{
      setTimeout(async ()=>{
                     if(flag === true){
                       resolve();
                     }
                     else {
                       let wait = await loop().then(()=>{
                         //console.log("resolve in");
                         resolve();          
                       }, 
                       ()=>{
                         //console.log("reject in");
                         reject();
                       });
                     }
                   },100);
    });
   }


async function step_wait(){
    flag = false;
    let wait = await loop().then(()=>{console.log("Step");}, 
    ()=>{});
    //window.alert("Step");
}

function highlightBlock(id){
  postMessage({"type": "highlightBlock", "data" : id});
}


onmessage = function (msg) {
  let obj = msg.data;
  content = obj.data;
  instractions[obj.type]();
}