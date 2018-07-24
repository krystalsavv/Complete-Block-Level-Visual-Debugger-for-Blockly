import './init_blockly.js';
import '../debugger/debugger.js';
import '../generator/blockly/blockly.js';
import {Blocly_Debugger} from '../debugger/debugger.js';

document.getElementById("ContinueButton").onclick = Blocly_Debugger["Continue"];
document.getElementById("StepInButton").onclick = Blocly_Debugger["StepIn"];
document.getElementById("StepOverButton").onclick = Blocly_Debugger["StepOver"];
document.getElementById("StepParentButton").onclick = Blocly_Debugger["StepParent"];
document.getElementById("StepOutButton").onclick = Blocly_Debugger["StepOut"];
document.getElementById("StopButton").onclick = Blocly_Debugger["Stop"];
document.getElementById("StartButton").onclick = Blocly_Debugger["Start"];


//$("#RunButton").onclick((ev)=> Run(ev));