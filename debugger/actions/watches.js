import {Debuggee_Worker, Blockly_Debugger} from '../init.js';

Blockly_Debugger.actions["Watch"] = {};
Blockly_Debugger.actions["Variables"] = {};


Blockly_Debugger.actions["Watch"] = (function(){
    var watches = [];
    
    function handler(){
        dispatchEvent(new Event("updateWatchesTable"));
        if(!Debuggee_Worker.hasInstance()) return; 
        Debuggee_Worker.Instance().postMessage({"type":"watch", "data": watches});
    }

    function update(new_watches){
        watches = new_watches;
        console.log("Upadated watch Debugger:");
        console.log(watches);
        dispatchEvent(new Event("updateWatchesTable"));
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
    };

    function init(){
        // var variables1 = window.workspace["blockly1"].getAllVariables().map((variable) => {
        //     return variable.name;
        // });
        // var variables2 = (window.workspace["blockly2"].getAllVariables()).map((variable) => {
        //     return variable.name;
        // });


        var workspace_vars = [];
        workspace_vars[0] = window.workspace["blockly1"].getAllVariables().map((variable) => {
            return variable.name;
        });
        workspace_vars[1] = window.workspace["blockly2"].getAllVariables().map((variable) => {
            return variable.name;
        });

        for(var i = 0; i<workspace_vars.length; i++){
            var variables_names =  variables.map((variable) => {
                return variable.name;
            });   
            for(var j = 0; j<workspace_vars[i].length; ++j){
                if(variables_names.includes(workspace_vars[i][j])) continue;
                var nvar = {
                    "name" : workspace_vars[i][j],
                    "value" : undefined
                }
                variables.push(nvar);
            }
        }


        // var variables_names =  variables.map((variable) => {
        //     return variable.name;
        // });

        // for(var i = 0; i<variables1.length; ++i){
        //     if(variables_names.includes(variables1[i])) continue;
        //     var nvar = {
        //         "name" : variables1[i],
        //         "value" : undefined
        //     }
        //     variables.push(nvar);
        // }

        // variables_names =  variables.map((variable) => {
        //     return variable.name;
        // });
        
        // for(var i = 0; i<variables2.length; ++i){
        //     if(variables_names.includes(variables2[i])) continue;
        //     var nvar = {
        //         "name" : variables2[i],
        //         "value" : undefined
        //     }
        //     variables.push(nvar);
        // }
        dispatchEvent(new Event("updateTable"));
    };

    return {
        update : update,
        getVariables : getVariables,
        init : init       
    }
})();


Debuggee_Worker.AddOnDispacher("watches", Blockly_Debugger.actions["Watch"].update);
Debuggee_Worker.AddOnDispacher("variables", Blockly_Debugger.actions["Variables"].update);