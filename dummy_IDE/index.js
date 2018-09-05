import './init_blockly.js';
import '../debugger/debugger.js';
import '../generator/blockly/blockly.js';
import {Blockly_Debugger} from '../debugger/debugger.js';

document.getElementById("ContinueButton").onclick = Blockly_Debugger.actions["Continue"].handler;
document.getElementById("StepInButton").onclick = Blockly_Debugger.actions["StepIn"].handler;
document.getElementById("StepOverButton").onclick = Blockly_Debugger.actions["StepOver"].handler;
document.getElementById("StepParentButton").onclick = Blockly_Debugger.actions["StepParent"].handler;
document.getElementById("StepOutButton").onclick = Blockly_Debugger.actions["StepOut"].handler;
document.getElementById("StopButton").onclick = Blockly_Debugger.actions["Stop"].handler;
document.getElementById("StartButton").onclick = Blockly_Debugger.actions["Start"].handler;

//$("#RunButton").onclick((ev)=> Run(ev));


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


