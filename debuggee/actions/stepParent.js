import {actions, flags} from "../init.js";

actions["stepParent"] = () => {
  flags.stepWait = true;
  flags.setTrue("Parent");
};

export function isStepParent(){
  return flags.parent; 
}