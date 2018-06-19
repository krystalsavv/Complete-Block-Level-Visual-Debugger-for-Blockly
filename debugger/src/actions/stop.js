import { Debuggee_Worker, Blocly_Debugger} from "../init";

Blocly_Debugger["Stop"] = () => {
    Debuggee_Worker.Stop();
}
