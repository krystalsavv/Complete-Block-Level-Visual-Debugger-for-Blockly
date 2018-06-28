import './init.js';
import {Blocly_Debugger} from './init.js';
import './blockly/blockly_init.js';
import './blockly/core/generator.js';
import './blockly/generator/logic.js';
import './blockly/generator/loops.js';
import './blockly/generator/math.js';
import './blockly/generator/procedures.js';
import './blockly/generator/text.js';
import './blockly/generator/variables.js';
import './actions/run.js';
import './actions/step.js';
import './actions/stop.js';
import './actions/start.js';

document.getElementById("RunButton").onclick = Blocly_Debugger["Run"];
document.getElementById("StepIntoButton").onclick = Blocly_Debugger["StepInto"];
document.getElementById("StepOverButton").onclick = Blocly_Debugger["StepOver"];
document.getElementById("StepOutButton").onclick = Blocly_Debugger["StepOut"];
document.getElementById("StopButton").onclick = Blocly_Debugger["Stop"];
document.getElementById("StartButton").onclick = Blocly_Debugger["Start"];


//$("#RunButton").onclick((ev)=> Run(ev));