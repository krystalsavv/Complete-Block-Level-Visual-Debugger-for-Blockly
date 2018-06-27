import {generation} from './blockly_init.js'; 

Blockly.JavaScript['math_number'] = function(block) {
    // Numeric value.
    var code = generation.tmp + ' = ' + parseFloat(block.getFieldValue('NUM')) + ';\n';
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
  };


Blockly.JavaScript['math_arithmetic'] = function(block) {
    // Basic arithmetic operators, and power.
    var OPERATORS = {
      'ADD': [' + ', Blockly.JavaScript.ORDER_ADDITION],
      'MINUS': [' - ', Blockly.JavaScript.ORDER_SUBTRACTION],
      'MULTIPLY': [' * ', Blockly.JavaScript.ORDER_MULTIPLICATION],
      'DIVIDE': [' / ', Blockly.JavaScript.ORDER_DIVISION],
      'POWER': [null, Blockly.JavaScript.ORDER_COMMA]  // Handle power separately.
    };
    var tuple = OPERATORS[block.getFieldValue('OP')];
    var operator = tuple[0];
    var order = tuple[1];
    var argument0 = Blockly.JavaScript.valueToCode(block, 'A', order) || '0';
    var argument1 = Blockly.JavaScript.valueToCode(block, 'B', order) || '0';
    var code;
    // Power in JavaScript requires a special case since it has no operator.
    if (!operator) {
      tmp0 = generation.tmp + generation.tmp_count++;
      tmp1 = generation.tmp + generation.tmp_count++; 
      code = argument0 + tmp0 + ' = ' + generation.tmp +';' +
             '\nawait wait();\n' +
             argument1 + tmp1 + ' = ' + generation.tmp +';' +
             '\nawait wait();\n' +
             generation.tmp + ' = Math.pow(' + tmp0 + ', ' + tmp1 + ');';
      return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
    }
    tmp0 = generation.tmp + generation.tmp_count++;
    tmp1 = generation.tmp + generation.tmp_count++;
    code = argument0 + tmp0 + ' = ' + generation.tmp + 
           ';\nawait wait();\n' +
           argument1 + tmp1 + ' = ' + generation.tmp + 
           ';\nawait wait();\n' +
           generation.tmp +' = ' + tmp0 + operator + tmp1 + ';\n';
    // code = argument0 + operator + argument1;
    return [code, order];
  };