import { Debuggee_Worker, Blocly_Debugger} from "../init.js";

Blocly_Debugger["Stop"] = {};

Blocly_Debugger["Stop"].handler = () => {
    Debuggee_Worker.Stop();
}
