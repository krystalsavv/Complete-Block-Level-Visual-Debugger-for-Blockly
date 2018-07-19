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