import {Debuggee_Worker, Blockly_Debugger} from '../init.js';

Blockly_Debugger.actions["Watch"] = {};
Blockly_Debugger.actions["Variables"] = {};


Blockly_Debugger.actions["Watch"].watches = [];
Blockly_Debugger.actions["Watch"].handler = () => {
    if(!Debuggee_Worker.hasInstance()) return; 
    Debuggee_Worker.Instance().postMessage({"type":"watch", "data": Blockly_Debugger.actions["Watch"].watches});
}


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
        getVariables : getVariables,
        
    }
})();

 Debuggee_Worker.AddOnDispacher("variables", Blockly_Debugger.actions["Variables"].update);