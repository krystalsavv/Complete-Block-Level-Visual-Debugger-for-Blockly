var flag = true;
let window = {
    alert : function(x) {
      postMessage(x);
    }
} ;  


var instractions = {
  "run" :  () => {
    window.alert(content);
    if(content!=undefined)
      eval(content);
     // eval("async function code(){"+ content +"} code();");
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
    //window.alert("step button pressed");
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
                      //   console.log("reject in");
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
    window.alert("Step");
}

async function myCode(){
   let str = " var x = 0;"+
   " x++;"+
   " window.alert(x);"+
    "await step_wait();"+
    "x++;"+
    "window.alert(x);";
    window.alert(str);
    eval("async function code(){"+str +"} code();");

    /*var x = 0;
    x++;
    window.alert(x);
    await step_wait();
    x++;
    window.alert(x);*/
}


/*addEventListener("run",function (){
  window.alert(content);
  if(content!=undefined)
    eval(content);
   // eval("async function code(){"+ content +"} code();");
  else 
    alert("The content is undefined.");
});

addEventListener("code",async function (){
  window.alert(content);
  if(content!=undefined)
    eval("async function code(){"+ content +"} code();");
  else 
    alert("The content is undefined.");
});

addEventListener("step",function (){
  //window.alert("step button pressed");
  flag = true;
});*/

onmessage = function (msg) {
 // obj = JSON.parse(msg.data);
  obj = msg.data;
  content = obj.content;
  window.alert(obj.content);
  window.alert(obj.type);
 // instractions.

 // dispatchEvent(new Event(obj.type));
}

//myCode();