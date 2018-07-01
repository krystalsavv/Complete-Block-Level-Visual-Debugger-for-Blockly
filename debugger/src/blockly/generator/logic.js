import {generation} from '../blockly_init.js'; 

Blockly.JavaScript['controls_if'] = function(block) {
  // Den kanw kapou generation.nest++/--;
  var n = 0;
  var args = [];
   var branchs = [];
   var tmps = [];
   var code = '';
   for(n = 0; n<=block.elseifCount_; ++n){
    tmps[n] = generation.tmp + generation.tmp_count++;
  }
  
  args[0] = Blockly.JavaScript.valueToCode(block, 'IF' + 0,
      Blockly.JavaScript.ORDER_NONE) || 'false';
  branchs[0] = Blockly.JavaScript.statementToCode(block, 'DO' + 0);
  
  for (n = 1; n <= block.elseifCount_; n++) {
    args[n] = Blockly.JavaScript.valueToCode(block, 'IF' + n,
        Blockly.JavaScript.ORDER_NONE) || 'false';
    branchs[n] = Blockly.JavaScript.statementToCode(block, 'DO' + n);
  }

  for(n = 0; n<=block.elseifCount_; ++n){
    code += args[n] + tmps[n] + ' = ' + generation.tmp + ';\n'; 
  }
  code += 'if (' + tmps[0] + ') {\n' + 
  // '  let local_over = isStepOver();\n' +                              // me
  branchs[0] + '}';
  for (n = 1; n <= block.elseifCount_; n++) {
    code += ' else if (' + tmps[n] + ') {\n' + 
      // '  let local_over = isStepOver();\n' +                            // me
      branchs[n] + '}';
  }

  if (block.elseCount_) {
    var branch = Blockly.JavaScript.statementToCode(block, 'ELSE');
    code += ' else {\n' +
    // '  let local_over = isStepOver();\n' +                           // me
    branch + '}';
  }
  alert(code);
  return code + '\n';
};


Blockly.JavaScript['logic_compare'] = function(block) {
  // Comparison operator.
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
  generation.nest++;
  var argument0 = Blockly.JavaScript.valueToCode(block, 'A', order) || '0';
  var argument1 = Blockly.JavaScript.valueToCode(block, 'B', order) || '0';
  var tmp0 = generation.tmp + generation.tmp_count++;
  var tmp1 = generation.tmp + generation.tmp_count++;
  var code = argument0 + 'var ' + tmp0 + ' = ' + generation.tmp +';\n' +
         argument1 + 'var ' + tmp1 + ' = ' + generation.tmp +';\n' +
         'await wait(' + generation.nest + ');\n' + 
         generation.tmp +' = (' + tmp0 + operator + tmp1 + ');\n';
  generation.nest--;       
  //var code = argument0 + ' ' + operator + ' ' + argument1;
  return [code, order];
};

Blockly.JavaScript['logic_operation'] = function(block) {
  // Operations 'and', 'or'.
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
  var code = argument0 + ' ' + operator + ' ' + argument1;
  return [code, order];
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


