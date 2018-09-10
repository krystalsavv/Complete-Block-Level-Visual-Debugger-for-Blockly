import '../debugger/debugger.js';
import '../generator/blockly/blockly.js';
import {Blockly_Debugger} from '../debugger/debugger.js'; 

addEventListener("updateTable",function (){
    let variables = Blockly_Debugger.actions["Variables"].getVariables();
    document.getElementById("variables").innerHTML = '';
    for(var i = 0; i<variables.length; ++i){
        document.getElementById("variables").innerHTML += `<tr>
                                                            <td>` + variables[i].name + `</td>
                                                            <td>` +  variables[i].value + `</td>
                                                            <td>` + typeof variables[i].value + `</td>
                                                          </tr>`;
    }
});


addEventListener("updateWatchesTable",function (){
    let watches = Blockly_Debugger.actions["Watch"].getWatches();
    document.getElementById("watches").innerHTML = '';
    for(var i = 0; i<watches.length; ++i){
        document.getElementById("watches").innerHTML += `<tr>
                                                            <td>` + watches[i].name + `</td>
                                                            <td>` + watches[i].code + `</td>
                                                            <td>` + watches[i].value + `</td>
                                                            <td>` + typeof watches[i].value + `</td>
                                                        </tr>`;
    }
});