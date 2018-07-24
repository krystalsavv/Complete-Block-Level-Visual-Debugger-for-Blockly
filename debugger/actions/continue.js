import {Debuggee_Worker, Blocly_Debugger} from '../init.js';

Blocly_Debugger["Continue"] = () => {
    Debuggee_Worker.Instance().postMessage({"type":"continue"});
}