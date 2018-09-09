import {Blockly_Debuggee, dispatcher} from '../init.js';

Blockly_Debuggee.actions["watch"] = {};
Blockly_Debuggee.actions["variables"] = {};


Blockly_Debuggee.actions["watch"] = (function(){
    var watches = [];
    function handler(new_watches){
        watches = new_watches;
        console.log("Handler:");
        console.log(watches);
    };

    function includes(variable){
        return watches.includes(variable);
    };
    
    function update(updated){            
        watches = updated;
        console.log( "Update:");
        console.log(watches);
    };


    function update_values(){
        var code = '';
        for(var i=0; i<watches.length; ++i){
            code += 'watches[' + i + '].value = ' + watches[i].code + ';\n';
        }
        var end_code =  `var temp_nest = Blockly_Debuggee.state.currNest;  
                          \nBlockly_Debuggee.state.currNest = -1;\n`
                          + code +
                         'Blockly_Debuggee.state.currNest = temp_nest;';
        return end_code;
    }
    
    function getWatches(){
        return watches;
    }
    
    function updateDebugger(){
        postMessage({"type": "watches", "data" : watches});
    }


    return {
        handler : handler,
        includes: includes,
        update : update,
        update_values : update_values,
        getWatches : getWatches,
        updateDebugger : updateDebugger
    };

})();


Blockly_Debuggee.actions["variables"] = (function(){
    var variables = [];
    function update(new_vars){
        variables = new_vars;
    };


    function update_values(){
        var code = '';
        for(var i=0; i<variables.length; ++i){
            code += 'variables[' + i + '].value = ' + variables[i].name + ';\n';
        }
        return code;
    }
    
    function getVariables(){
        return variables;
    }
    
    function updateDebugger(){
        postMessage({"type": "variables", "data" : variables});
    }

    function define_variables(){
        var code = '';
        for(var i=0; i<variables.length; ++i){
            code += 'var ' + variables[i].name + ';\n';
        }
        return code;
    }

    return {
        update : update,
        update_values : update_values,
        getVariables : getVariables,
        updateDebugger : updateDebugger,
        define_variables : define_variables
    }
})();


dispatcher.watch = Blockly_Debuggee.actions["watch"].handler;