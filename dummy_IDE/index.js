import './init_blockly.js';
import '../debugger/debugger.js';
import '../generator/blockly/blockly.js';
import {Blocly_Debugger} from '../debugger/debugger.js';

document.getElementById("ContinueButton").onclick = Blocly_Debugger["Continue"].handler;
document.getElementById("StepInButton").onclick = Blocly_Debugger["StepIn"].handler;
document.getElementById("StepOverButton").onclick = Blocly_Debugger["StepOver"].handler;
document.getElementById("StepParentButton").onclick = Blocly_Debugger["StepParent"].handler;
document.getElementById("StepOutButton").onclick = Blocly_Debugger["StepOut"].handler;
document.getElementById("StopButton").onclick = Blocly_Debugger["Stop"].handler;
document.getElementById("StartButton").onclick = Blocly_Debugger["Start"].handler;


//$("#RunButton").onclick((ev)=> Run(ev));