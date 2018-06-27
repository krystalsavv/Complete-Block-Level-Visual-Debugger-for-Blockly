import {generation} from './blockly_init.js'; 


Blockly.JavaScript['text'] = function(block) {
    // Text value.
    var code = generation.tmp + ' = ' + Blockly.JavaScript.quote_(block.getFieldValue('TEXT')) + ';';
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
  };

Blockly.JavaScript['text_print'] = function(block) {
    // Print statement.
    var argument0 = Blockly.JavaScript.valueToCode(block, 'TEXT',
        Blockly.JavaScript.ORDER_NONE) || '\'\'';

    return argument0 + 'window.alert(' + generation.tmp + ');\n';
  };