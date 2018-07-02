import {generation} from '../blockly_init.js'; 

Blockly.JavaScript['controls_if'] = function(block) {
  generation.nest++;
  var n = 0;
  var argument = Blockly.JavaScript.valueToCode(block, 'IF' + n,
      Blockly.JavaScript.ORDER_NONE) || 'false';
  var branch = Blockly.JavaScript.statementToCode(block, 'DO' + n);
  var code = argument + 'await wait('+ generation.nest + ', true);\nif (' + generation.tmp + ') {\n' + branch + '}';
  for (n = 1; n <= block.elseifCount_; n++) {
    argument = Blockly.JavaScript.valueToCode(block, 'IF' + n,
        Blockly.JavaScript.ORDER_NONE) || 'false';
    branch = Blockly.JavaScript.statementToCode(block, 'DO' + n);
    code += ' else {\n' + argument + 'if (' + generation.tmp + ') {\n' + branch + '}';
  }
  if (block.elseCount_) {
    branch = Blockly.JavaScript.statementToCode(block, 'ELSE');
    code += ' else {\n' + branch + '}';
  }

  for(n = 0; n < block.elseifCount_; ++n){
    code += '}';
  }
  generation.nest--;
  return code + '\n';

};


Blockly.JavaScript['logic_compare'] = function(block) {
  // Comparison operator.
  generation.nest++;
  var OPERATORS = {
    'EQ': '==',
    'NEQ': '!=',
    'LT': '<',
    'LTE': '<=',
    'GT': '>',
    'GTE': '>='
  };
  var operator = OPERATORS[block.getFieldValue('OP')];
  var order = (operator == '==' || operator == '!=') ?
      Blockly.JavaScript.ORDER_EQUALITY : Blockly.JavaScript.ORDER_RELATIONAL;
  var argument0 = Blockly.JavaScript.valueToCode(block, 'A', order) || '0';
  var argument1 = Blockly.JavaScript.valueToCode(block, 'B', order) || '0';
  var tmp0 = generation.tmp + generation.tmp_count++;
  var tmp1 = generation.tmp + generation.tmp_count++;
  var code = argument0 + 'var ' + tmp0 + ' = ' + generation.tmp +';\n' +
         argument1 + 'var ' + tmp1 + ' = ' + generation.tmp +';\n' +
         'await wait(' + generation.nest + ');\n' + 
         //'if(' + tmp0 + operator + tmp1 + ') ' +  generation.tmp +' = true;\nelse '+  generation.tmp +' = false;\n'
         //generation.tmp + ' = (' + tmp0 + operator + tmp1 + ') ? true : false;\n' + 
         generation.tmp +' = (' + tmp0 + operator + tmp1 + ');\n';
  generation.nest--;       
  //return [code, order];
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['logic_operation'] = function(block) {
  // Operations 'and', 'or'.
  generation.nest++;
  var operator = (block.getFieldValue('OP') == 'AND') ? '&&' : '||';
  var order = (operator == '&&') ? Blockly.JavaScript.ORDER_LOGICAL_AND :
      Blockly.JavaScript.ORDER_LOGICAL_OR;
  var argument0 = Blockly.JavaScript.valueToCode(block, 'A', order);
  var argument1 = Blockly.JavaScript.valueToCode(block, 'B', order);
  if (!argument0 && !argument1) {
    // If there are no arguments, then the return value is false.
    argument0 = 'false';
    argument1 = 'false';
  } else {
    // Single missing arguments have no effect on the return value.
    var defaultArgument = (operator == '&&') ? 'true' : 'false';
    if (!argument0) {
      argument0 = defaultArgument;
    }
    if (!argument1) {
      argument1 = defaultArgument;
    }
  }

  var tmp0 = generation.tmp + generation.tmp_count++;
  var tmp1 = generation.tmp + generation.tmp_count++;
  var code = argument0 + 'var ' + tmp0 + ' = ' + generation.tmp +';\n' +
         argument1 + 'var ' + tmp1 + ' = ' + generation.tmp +';\n' +
         'await wait(' + generation.nest + ');\n' + 
         generation.tmp +' = (' + tmp0 + operator + tmp1 + ');\n';
  //return [code, order];
  generation.nest--;
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['logic_negate'] = function(block) {
  // Negation.
  var order = Blockly.JavaScript.ORDER_LOGICAL_NOT;
  var argument0 = Blockly.JavaScript.valueToCode(block, 'BOOL', order) ||
      'true';
  var code = '!' + argument0;
  return [code, order];
};

Blockly.JavaScript['logic_boolean'] = function(block) {
  // Boolean values true and false.
  var code = (block.getFieldValue('BOOL') == 'TRUE') ? 'true' : 'false';
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['logic_null'] = function(block) {
  // Null data type.
  return ['null', Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['logic_ternary'] = function(block) {
  // Ternary operator.
  var value_if = Blockly.JavaScript.valueToCode(block, 'IF',
      Blockly.JavaScript.ORDER_CONDITIONAL) || 'false';
  var value_then = Blockly.JavaScript.valueToCode(block, 'THEN',
      Blockly.JavaScript.ORDER_CONDITIONAL) || 'null';
  var value_else = Blockly.JavaScript.valueToCode(block, 'ELSE',
      Blockly.JavaScript.ORDER_CONDITIONAL) || 'null';
  var code = value_if + ' ? ' + value_then + ' : ' + value_else;
  return [code, Blockly.JavaScript.ORDER_CONDITIONAL];
};


