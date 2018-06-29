import {generation} from '../blockly_init.js'; 

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
      var tmp0 = generation.tmp + generation.tmp_count++;
      var tmp1 = generation.tmp + generation.tmp_count++; 
      code = argument0 + 'var ' + tmp0 + ' = ' + generation.tmp +';' +
             '\nawait wait();\n' +
             argument1 + 'var ' + tmp1 + ' = ' + generation.tmp +';' +
             '\nawait wait();\n' +
             generation.tmp + ' = Math.pow(' + tmp0 + ', ' + tmp1 + ');';
      return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
    }
    var tmp0 = generation.tmp + generation.tmp_count++;
    var tmp1 = generation.tmp + generation.tmp_count++;
    code = argument0 + 'var ' + tmp0 + ' = ' + generation.tmp + 
           ';\nawait wait();\n' +
           argument1 + 'var ' + tmp1 + ' = ' + generation.tmp + 
           ';\nawait wait();\n' +
           generation.tmp +' = ' + tmp0 + operator + tmp1 + ';\n';
    // code = argument0 + operator + argument1;
    return [code, order];
  };


  Blockly.JavaScript['math_single'] = function(block) {
    // Math operators with single operand.
    alert("MY_math_single!!!");
    var operator = block.getFieldValue('OP');
    var code;
    var arg; 
    if (operator == 'NEG') {
      // Negation is a special case given its different operator precedence.
      arg = Blockly.JavaScript.valueToCode(block, 'NUM',
          Blockly.JavaScript.ORDER_UNARY_NEGATION) || '0';
      if (arg[4] == '-') {
        // --3 is not legal in JS.
        arg = ' ' + arg;
      }
      //code = '-' + arg;
      code = arg + generation.tmp + '= (-1)*' + generation.tmp + ';\n';
      return [code, Blockly.JavaScript.ORDER_UNARY_NEGATION];
    }
    if (operator == 'SIN' || operator == 'COS' || operator == 'TAN') {
      arg = Blockly.JavaScript.valueToCode(block, 'NUM',
          Blockly.JavaScript.ORDER_DIVISION) || '0';
    } else {
      arg = Blockly.JavaScript.valueToCode(block, 'NUM',
          Blockly.JavaScript.ORDER_NONE) || '0';
    }
    // First, handle cases which generate values that don't need parentheses
    // wrapping the code.
    switch (operator) {
      case 'ABS':
        code = arg + 'await wait();\n' + generation.tmp + ' = Math.abs(' + generation.tmp + ');\nawait wait();\n';
        break;
      case 'ROOT':
        code = arg + 'await wait();\n' + generation.tmp + ' = Math.sqrt(' + generation.tmp + ');\nawait wait();\n';
        break;
      case 'LN':
        code = arg + 'await wait();\n' + generation.tmp + ' = Math.log(' + generation.tmp + ');\nawait wait();\n';
        break;
      case 'EXP':
        code = arg + 'await wait();\n' + generation.tmp + ' = Math.exp(' + generation.tmp + ');\nawait wait();\n';
        break;
      case 'POW10':
        code = arg + 'await wait();\n' + generation.tmp + ' = Math.pow(10,' + generation.tmp + ');\nawait wait();\n';
        break;
      case 'ROUND':
        code = arg + 'await wait();\n' + generation.tmp + ' = Math.round(' + generation.tmp + ');\nawait wait();\n';
        break;
      case 'ROUNDUP':
        code = arg + 'await wait();\n' + generation.tmp + ' = Math.ceil(' + generation.tmp + ');\nawait wait();\n';
        break;
      case 'ROUNDDOWN':
        code = arg + 'await wait();\n' + generation.tmp + ' = Math.floor(' + generation.tmp + ');\nawait wait();\n';
        break;
      case 'SIN':
        code = arg + 'await wait();\n' + generation.tmp + ' = Math.sin(' + genaration.tmp + ' / 180 * Math.PI);\nawait wait();\n';
        break;
      case 'COS':
        code = arg + 'await wait();\n' + generation.tmp + ' = Math.cos(' + generation.tmp + ' / 180 * Math.PI);\nawait wait();\n';
        break;
      case 'TAN':
        code = arg + 'await wait();\n' + generation.tmp + ' = Math.tan(' + generation.tmp + ' / 180 * Math.PI);\nawait wait();\n';
        break;
    }
    if (code) {
      return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
    }
    // Second, handle cases which generate values that may need parentheses
    // wrapping the code.
    switch (operator) {
      case 'LOG10':
        code = 'Math.log(' + arg + ') / Math.log(10)';
        break;
      case 'ASIN':
        code = 'Math.asin(' + arg + ') / Math.PI * 180';
        break;
      case 'ACOS':
        code = 'Math.acos(' + arg + ') / Math.PI * 180';
        break;
      case 'ATAN':
        code = 'Math.atan(' + arg + ') / Math.PI * 180';
        break;
      default:
        throw 'Unknown math operator: ' + operator;
    }
    return [code, Blockly.JavaScript.ORDER_DIVISION];
  };
  