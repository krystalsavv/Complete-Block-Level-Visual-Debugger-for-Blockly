export var window = {
    alert : function(msg) {
      postMessage({"type": "alert", "data" : msg});
    }
} ;  

export var actions = {};

export var flag = true;
export var flag_over = false;
export var flag_out = false;