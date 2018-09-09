import {Debuggee_Worker, Blockly_Debugger} from '../init.js';

Blockly_Debugger.actions["Watch"] = {};
Blockly_Debugger.actions["Variables"] = {};


Blockly_Debugger.actions["Watch"] = (function(){
    var watches = [];
    
    function handler(){
        if(!Debuggee_Worker.hasInstance()) return; 
        Debuggee_Worker.Instance().postMessage({"type":"watch", "data": watches});
    }

    function update(new_watches){
        watches = new_watches;
        //dispatchEvent(new Event("updateTable"));
    };
    
    function getWatches(){
        return watches;
    }

    function init(){
        for(var i=0; i<watches.length; ++i){
            watches[i].value = undefined;
        }
    }

    return {
        handler : handler,
        update : update,
        getWatches : getWatches,
        init : init       
    }
})();



Blockly_Debugger.actions["Variables"] = (function(){
    var variables = [];

    function handler() {};     

    function update(new_vars){
        variables = new_vars;
        dispatchEvent(new Event("updateTable"));
    };
    
    function getVariables(){
        return variables;
    }

    return {
        update : update,
        getVariables : getVariables       
    }
})();


Debuggee_Worker.AddOnDispacher("watches", Blockly_Debugger.actions["Watch"].update);
Debuggee_Worker.AddOnDispacher("variables", Blockly_Debugger.actions["Variables"].update);