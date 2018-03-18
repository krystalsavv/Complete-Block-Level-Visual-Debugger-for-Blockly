/*import 'blockly/demos/interpreter/acorn_interpreter.js';
import 'blockly/blockly_compressed.js';
import 'blockly/blocks_compressed.js';
import 'blockly/javascript_compressed.js';
import 'blockly/msg/js/en.js';
*/

var instractions = {                                    // from debuggee
    "alert" : (msg) => {
        alert(msg);
    },
    "highlightBlock" : (id) =>{
        workspace.traceOn_ = true;
        workspace.highlightBlock(id);
    }
}

 var workspace = Blockly.inject('blocklyDiv',
        {media: '../../media/',
         toolbox: document.getElementById('toolbox')});
         
    Blockly.Xml.domToWorkspace(workspace,
        document.getElementById('startBlocks'));

    var worker;
    function Run(){
        if(typeof(Worker) !== "undefined") {
            if(typeof(worker) == "undefined") {
                worker = new Worker("src/thread.js");
            }
            worker.onmessage = function(msg) {
                let obj = msg.data;
                let data = obj.data;
                instractions[obj.type](data);
                };
        } else {
            document.getElementById("result").innerHTML = "Sorry, your browser does not support Web Workers.";
        }
        //var code = "var x = 2; window.alert(x);"
        var code = Blockly.JavaScript.workspaceToCode(workspace);
        worker.postMessage({"type":"run", "data": code});
    }

    var start = false;
    function Step(){
        if(!start){
            start = true;
            if(typeof(Worker) !== "undefined") {
                if(typeof(worker) == "undefined") {
                    worker = new Worker("src/thread.js");
                }
                worker.onmessage = function(msg) {
                    let obj = msg.data;
                    let data = obj.data;
                    instractions[obj.type](data);
                };
            } else {
                document.getElementById("result").innerHTML = "Sorry, your browser does not support Web Workers.";
            }

            Blockly.JavaScript.STATEMENT_PREFIX = 'highlightBlock(%1);\nawait step_wait();\n';
            //var code = "var x = 2; await step_wait(); window.alert(x); await step_wait(); window.alert(++x) ;"
            var code = Blockly.JavaScript.workspaceToCode(workspace); 
            worker.postMessage({"type":"code", "data": code});
        }else{
            worker.postMessage({"type":"step"});
        }
    }