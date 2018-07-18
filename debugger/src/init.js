window.workspace = {};
window.workspace["blockly1"] = Blockly.inject('blocklyDiv',
	{media: '../../media/',
	 toolbox: document.getElementById('toolbox')});
window.workspace["blockly1"].systemEditorId = 'blockly1';

Blockly.Xml.domToWorkspace(window.workspace["blockly1"],
	document.getElementById('startBlocks'));

window.workspace["blockly2"] = Blockly.inject('blocklyDiv2',
	{media: '../../media/',
	 toolbox: document.getElementById('toolbox')});
window.workspace["blockly2"].systemEditorId = 'blockly2';	 

// Blockly.Xml.domToWorkspace(window.workspace["blockly2"],
// 	document.getElementById('startBlocks'));


export var Debuggee_Worker = (function (){
	var instance;
	var dispatcher;
	  
	function getInstance(){
		if(instance === undefined){
			// instance = new Worker("../../debuggee/index.js");
			instance = new Worker("../dist/worker.js");
			initDispacher();
			instance.onmessage = function(msg) {
                let obj = msg.data;
                let data = obj.data;
                dispatcher[obj.type](data);
            };
		}		
	return instance;	
	}

	function Stop(){
		if(!hasInstance()) return;
		instance.terminate();
		instance = undefined;
	}

	function AddOnDispacher(event, callback){
		dispatcher[event] = callback;
	}


	function hasInstance(){
	 	if(instance === undefined) return false;
	 	else return true;
	}

	function initDispacher(){
		dispatcher = {                              
			"alert" : (msg) => {
				window.alert(msg);
			},
			"prompt" : (msg) => {
				Debuggee_Worker.Instance().postMessage({"type":"prompt","data": window.prompt(msg)}); 
			},
			"highlightBlock" : (data) => {
				window.workspace[data.CurrentSystemEditorId].traceOn_ = true;
				window.workspace[data.CurrentSystemEditorId].highlightBlock(data.id);
			}, 
			"execution_finished" : () => {
				instance = undefined;
			}
		}
	}

	return {
		Instance : getInstance,
		Stop: Stop,
		AddOnDispacher: AddOnDispacher,
		hasInstance: hasInstance
	};

})();

export var Blocly_Debugger = {};