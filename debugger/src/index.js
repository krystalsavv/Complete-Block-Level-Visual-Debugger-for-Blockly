import {Blocly_Debugger} from './init.js';
import './blockly/blockly.js';
import './actions/run.js';
import './actions/step.js';
import './actions/stop.js';
import './actions/start.js';

document.getElementById("RunButton").onclick = Blocly_Debugger["Run"];
document.getElementById("StepInButton").onclick = Blocly_Debugger["StepIn"];
document.getElementById("StepOverButton").onclick = Blocly_Debugger["StepOver"];
document.getElementById("StepUpButton").onclick = Blocly_Debugger["StepUp"];
document.getElementById("StepOutButton").onclick = Blocly_Debugger["StepOut"];
document.getElementById("StopButton").onclick = Blocly_Debugger["Stop"];
document.getElementById("StartButton").onclick = Blocly_Debugger["Start"];


//$("#RunButton").onclick((ev)=> Run(ev));