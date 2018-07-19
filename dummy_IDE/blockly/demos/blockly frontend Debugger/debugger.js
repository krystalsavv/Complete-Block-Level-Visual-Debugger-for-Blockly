'use strict';

function run(){
    var code = Blockly.JavaScript.workspaceToCode(workspace);
    alert('Ready to execute this code:\n\n' + code);
    eval(code);
 }