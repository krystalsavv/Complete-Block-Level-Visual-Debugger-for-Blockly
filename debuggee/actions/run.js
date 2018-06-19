import {actions, window} from "../init.js";

actions["run"] = (content) => {
    window.alert(content);
    if(content!=undefined){
      eval(content);
      postMessage({"type": "execution_finished"});
    }else{ 
      window.alert("The content is undefined.");
    }
};

