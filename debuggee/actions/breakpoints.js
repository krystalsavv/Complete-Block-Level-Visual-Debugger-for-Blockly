import {actions} from "../init.js";

actions["breakpoint"] = (br) => {
    breakpoints = br;
   // console.log(breakpoints);
};
export var breakpoints = [];
export function hasBreakpoint(block_id){
    return breakpoints.includes(block_id);
}

export function updateBreakpoints(updated){
    breakpoints = updated;
}
