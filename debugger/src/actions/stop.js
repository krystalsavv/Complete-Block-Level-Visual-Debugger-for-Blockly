import { Debuggee_Worker, Blocly_Debugger} from "../init.js";

Blocly_Debugger["Stop"] = () => {
    Debuggee_Worker.Stop();
}
