export var Debuggee_Worker = (function (){
	var instance;
	var dispatcher;
	  
	function getInstance(){
		if(instance === undefined){
			instance = new Worker("./dist/debuggee.js"); // to path apo to localhost kai oxi apo edw
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
				// var block = window.workspace[data.CurrentSystemEditorId].getBlockById(data.id);		// gia na anoigei to block an exw mesa bp (to kanei se ola :P)
				// block.setCollapsed(false);
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