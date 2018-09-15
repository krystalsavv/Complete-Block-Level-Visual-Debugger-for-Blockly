import { Debuggee_Worker, Blockly_Debugger} from "../init.js";

Blockly_Debugger.actions["Stop"] = {};

Blockly_Debugger.actions["Stop"].handler = () => {
    document.getElementById("val_table").innerHTML = '';
    Debuggee_Worker.Stop();
}
