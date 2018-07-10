import {actions, flags} from "../init.js";

actions["stepUp"] = () => {
  flags.stepWait = true;
  flags.setTrue("up");
};

export function isStepUp(){
  return flags.up; 
}