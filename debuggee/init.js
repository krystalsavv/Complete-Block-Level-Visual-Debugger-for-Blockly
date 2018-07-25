export var window = {
    alert : function(msg) {
      postMessage({"type": "alert", "data" : msg});
    },
    prompt : async function (msg){
      postMessage({"type": "prompt", "data" : msg});
      while(flags.promptMsg == undefined){
        await next_message();
      }
      var tmp = flags.promptMsg;
      flags.promptMsg = undefined;
      return tmp;
    }
} ;  

export var Blockly_Debuggee = {};
Blockly_Debuggee.actions = {};

Blockly_Debuggee.state = {
  currNest : 0,
  currId : '',
  promptMsg : undefined,
  stepWait : false,
  currState: {
    stepIn : false,
    stepOver : false,
    stepParent : false,
    stepOut : false,
    continue : true
  },
  isState: function(state){
    return this.currState[state];
  },
  setState: function(new_state) {
    this.currState["stepIn"] = false;
    this.currState["stepOver"] = false;
    this.currState["stepParent"] = false;
    this.currState["stepOut"] = false;
    this.currState["continue"] = false;
    this.currState[new_state] = true;
  }
};


Blockly_Debuggee.wait = (function(){
  function highlightBlock(id, CurrentSystemEditorId){
    postMessage({"type": "highlightBlock", "data" : {"id" : id, "CurrentSystemEditorId" : CurrentSystemEditorId}});
  }

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  
  function next_message() { 
    return sleep(0); 
  }

  async function wait(nest, block_id, CurrentSystemEditorId){
    highlightBlock(block_id, CurrentSystemEditorId);
    if(Blockly_Debuggee.state.isState("continue") && !Blockly_Debuggee.actions.breakpoint.includes(block_id)){    
      return;
    }
    if(Blockly_Debuggee.state.currNest == -1) return;    // stepOver + stepOut for functions                   
      if(Blockly_Debuggee.state.isState("stepIn") || Blockly_Debuggee.state.isState("continue") || nest <= Blockly_Debuggee.state.currNest){
        if(Blockly_Debuggee.state.currId  === block_id && !Blockly_Debuggee.state.isState("continue")) return;
        if(Blockly_Debuggee.state.isState("stepParent") && nest == Blockly_Debuggee.state.currNest) return;
        while(!Blockly_Debuggee.state.stepWait){
            await next_message();
        }
        Blockly_Debuggee.state.stepWait = false;
        Blockly_Debuggee.state.currId = block_id;
        if(Blockly_Debuggee.state.isState("stepOut")){
            Blockly_Debuggee.state.currNest = -1;
            Blockly_Debuggee.state.currState.stepOut = false;                                  
        }else{
            Blockly_Debuggee.state.currNest = nest;
        }       
    }
  };

  return wait;  
})();

export var dispatcher = {
  prompt : (promptMsg) => {
    flags.promptMsg = promptMsg;
  }
};



