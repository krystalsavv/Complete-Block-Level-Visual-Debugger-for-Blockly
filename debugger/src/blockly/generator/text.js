import {generation} from '../blockly_init.js'; 


Blockly.JavaScript['text'] = function(block) {
    // Text value.
    generation.nest++;
    var code = 'await wait(' + generation.nest + ');\n' + generation.tmp + ' = ' + Blockly.JavaScript.quote_(block.getFieldValue('TEXT')) + ';';
    generation.nest--;
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
  };

Blockly.JavaScript['text_print'] = function(block) {
    // Print statement.
    generation.nest++;
    var argument0 = Blockly.JavaScript.valueToCode(block, 'TEXT',
        Blockly.JavaScript.ORDER_NONE) || '\'\'';
    var code = argument0 + 
        'await wait(' + generation.nest + ');\n' +
        'window.alert(' + generation.tmp + ');\n';
    generation.nest--;
    return code;
  };