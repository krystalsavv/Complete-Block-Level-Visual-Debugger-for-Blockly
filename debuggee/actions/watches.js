import {Blockly_Debuggee, dispatcher} from '../init.js';

Blockly_Debuggee.actions["watch"] = {};

Blockly_Debuggee.actions["watch"] = (function(){
    var watches = [];
    function handler(new_watches){
        watches = new_watches;
        // console.log("handler: " + watches);
    };

    function includes(variable){
        return watches.includes(variable);
    };
    
    function update(updated){
        watches = updated;
        // console.log( "Update:  " + watches);
    };

    function update_values(){
        var code = '';
        for(var i=0; i<watches.length; ++i){
          //  code += 'watches['+ i + '] = ' +  watches[i] + ';\n';   // prepei na diaxwrisw value me var name (sto 1o thelw value sto 2 thelw var name)
          code += 'console.log(' + watches[i] +');'
        }
        return code;
        // console.log(code);
        // eval(code);
    }
    return {
        handler : handler,
        includes: includes,
        update : update,
        update_values : update_values
    };

})();

dispatcher.watch = Blockly_Debuggee.actions["watch"].handler;
