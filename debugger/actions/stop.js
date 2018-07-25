import { Debuggee_Worker, Blockly_Debugger} from "../init.js";

Blockly_Debugger.actions["Stop"] = {};

Blockly_Debugger.actions["Stop"].handler = () => {
    Debuggee_Worker.Stop();
}
