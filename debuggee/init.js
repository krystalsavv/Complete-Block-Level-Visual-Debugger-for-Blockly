export var window = {
    alert : function(msg) {
      postMessage({"type": "alert", "data" : msg});
    }
} ;  

export var actions = {};

export var flags = {
  stepWait : true,
  in : true, 
  over : false,
  out : false
}