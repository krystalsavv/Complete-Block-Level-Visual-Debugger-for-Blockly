import {generation} from '../blockly_init.js'; 

Blockly.JavaScript['variables_get'] = function(block) {
    // Variable getter.
    var code = generation.tmp + ' = ' + Blockly.JavaScript.variableDB_.getName(block.getFieldValue('VAR'),Blockly.Variables.NAME_TYPE) + ';\n';
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
  };

Blockly.JavaScript['variables_set'] = function(block) {
    var argument0 = Blockly.JavaScript.valueToCode(block, 'VALUE',
        Blockly.JavaScript.ORDER_ASSIGNMENT) || '0';
    var varName = Blockly.JavaScript.variableDB_.getName(
        block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
    return argument0 + varName + ' = ' + generation.tmp + ';\n';
    // return varName + ' = ' + argument0 + ';\n';
  };