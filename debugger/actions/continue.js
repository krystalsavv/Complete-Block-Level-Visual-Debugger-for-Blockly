import {Debuggee_Worker, Blocly_Debugger} from '../init.js';

Blocly_Debugger["Continue"] = {};

Blocly_Debugger["Continue"].handler = () => {
    Debuggee_Worker.Instance().postMessage({"type":"continue"});
}