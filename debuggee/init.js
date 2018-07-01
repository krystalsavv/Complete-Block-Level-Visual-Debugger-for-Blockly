export var window = {
    alert : function(msg) {
      postMessage({"type": "alert", "data" : msg});
    }
} ;  

export var actions = {};

export var flags = {
  currentNest : 0,
  stepWait : false,
  in : true, 
  over : false,
  out : false
}