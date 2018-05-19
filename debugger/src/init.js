window.workspace = Blockly.inject('blocklyDiv',
	{media: '../../media/',
	 toolbox: document.getElementById('toolbox')});
	 
Blockly.Xml.domToWorkspace(window.workspace,
	document.getElementById('startBlocks'));
		

export var DebuggeeWorker = (function (){
	var instance;
	var dispatcher;
	  
	function getInstance(){
		if(instance === undefined){
			instance = new Worker("../../debuggee/bundle.js");
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
				alert(msg);
			},
			"highlightBlock" : (id) => {
				window.workspace.traceOn_ = true;
				window.workspace.highlightBlock(id);
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