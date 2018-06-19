export var window = {
    alert : function(msg) {
      postMessage({"type": "alert", "data" : msg});
    }
} ;  

export var actions = {};

export var flags = {
  in : true, 
  over : false,
  out : false
}