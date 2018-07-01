import {generation} from '../blockly_init.js'; 

Blockly.JavaScript['variables_get'] = function(block) {
    // Variable getter.
    generation.nest++;
    var code = 'await wait(' + generation.nest + ');\n' + generation.tmp + ' = ' + Blockly.JavaScript.variableDB_.getName(block.getFieldValue('VAR'),Blockly.Variables.NAME_TYPE) + ';\n';
    generation.nest--;
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
  };

Blockly.JavaScript['variables_set'] = function(block) {
    generation.nest++;
    var argument0 = Blockly.JavaScript.valueToCode(block, 'VALUE',
        Blockly.JavaScript.ORDER_ASSIGNMENT) || '0';
    var varName = Blockly.JavaScript.variableDB_.getName(
        block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
        var code = argument0 + 
                   'await wait(' + generation.nest + ');\n' +        
                   varName + ' = ' + generation.tmp + ';\n';
        generation.nest--;
        return code;
  };