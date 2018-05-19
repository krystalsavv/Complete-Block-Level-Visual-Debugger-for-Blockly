import { DebuggeeWorker, Blocly_Debugger} from "../init";

Blocly_Debugger["Stop"] = () => {
    DebuggeeWorker.Stop();
}
