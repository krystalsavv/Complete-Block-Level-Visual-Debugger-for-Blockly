import "./procedures.js"
import "./logic.js"
import "./loops.js"


/* 
// function definition
Blockly.JavaScript['procedures_defreturn'] = function(block) {
    // Define a procedure with a return value.
    var funcName = Blockly.JavaScript.variableDB_.getName(
        block.getFieldValue('NAME'), Blockly.Procedures.NAME_TYPE);
    var branch = Blockly.JavaScript.statementToCode(block, 'STACK');
    if (Blockly.JavaScript.STATEMENT_PREFIX) {
      branch = Blockly.JavaScript.prefixLines(
          Blockly.JavaScript.STATEMENT_PREFIX.replace(/%1/g,
          '\'' + block.id + '\''), Blockly.JavaScript.INDENT) + branch;
    }
    if (Blockly.JavaScript.INFINITE_LOOP_TRAP) {
      branch = Blockly.JavaScript.INFINITE_LOOP_TRAP.replace(/%1/g,
          '\'' + block.id + '\'') + branch;
    }
    var returnValue = Blockly.JavaScript.valueToCode(block, 'RETURN',
        Blockly.JavaScript.ORDER_NONE) || '';
    if (returnValue) {
      returnValue = '  return ' + returnValue + ';\n';
    }
    var args = [];
    for (var x = 0; x < block.arguments_.length; x++) {
      args[x] = Blockly.JavaScript.variableDB_.getName(block.arguments_[x],
          Blockly.Variables.NAME_TYPE);
    }
    var code = 'async function ' + funcName + '(' + args.join(', ') + ') {\n' +
        '  let local_over = isStepOver();\n  let local_out = isStepOut();\n' +
        branch + '  if(local_out==false) flag_out = false;\n' + returnValue + '}'; 
    code = Blockly.JavaScript.scrub_(block, code);
    Blockly.JavaScript.definitions_[funcName] = code;
    return null;
  };
  Blockly.JavaScript['procedures_defnoreturn'] =
  Blockly.JavaScript['procedures_defreturn'];


// function call 
Blockly.JavaScript['procedures_callreturn'] = function(block) {
    // Call a procedure with a return value.
    var funcName = Blockly.JavaScript.variableDB_.getName(
        block.getFieldValue('NAME'), Blockly.Procedures.NAME_TYPE);
    var args = [];
    for (var x = 0; x < block.arguments_.length; x++) {
      args[x] = Blockly.JavaScript.valueToCode(block, 'ARG' + x,
          Blockly.JavaScript.ORDER_COMMA) || 'null';
    }
    var code = "await " + funcName + '(' + args.join(', ') + ')';
    return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
  };
  
Blockly.JavaScript['procedures_callnoreturn'] = function(block) {
    // Call a procedure with no return value.
    var funcName = Blockly.JavaScript.variableDB_.getName(
        block.getFieldValue('NAME'), Blockly.Procedures.NAME_TYPE);
    var args = [];
    for (var x = 0; x < block.arguments_.length; x++) {
      args[x] = Blockly.JavaScript.valueToCode(block, 'ARG' + x,
          Blockly.JavaScript.ORDER_COMMA) || 'null';
    }
    var code = "await " + funcName + '(' + args.join(', ') + ');\n';
    return code;
  };




  // If/elseif/else condition.
  Blockly.JavaScript['controls_if'] = function(block) {
    var n = 0;
    var argument = Blockly.JavaScript.valueToCode(block, 'IF' + n,
        Blockly.JavaScript.ORDER_NONE) || 'false';
    var branch = Blockly.JavaScript.statementToCode(block, 'DO' + n);
    var code = 'if (' + argument + ') {\n' + 
    '  let local_over = isStepOver();\n'                              // me
     + branch + '}';
    for (n = 1; n <= block.elseifCount_; n++) {
      argument = Blockly.JavaScript.valueToCode(block, 'IF' + n,
          Blockly.JavaScript.ORDER_NONE) || 'false';
      branch = Blockly.JavaScript.statementToCode(block, 'DO' + n);
      code += ' else if (' + argument + ') {\n' + 
      '  let local_over = isStepOver();\n'                            // me
      + branch + '}';
    }
    if (block.elseCount_) {
      branch = Blockly.JavaScript.statementToCode(block, 'ELSE');
      code += ' else {\n' +
      '  let local_over = isStepOver();\n'                            // me
      + branch + '}';
    }
    return code + '\n';
  };








  // Loops
  Blockly.JavaScript['controls_repeat_ext'] = function(block) {
    // Repeat n times.
    if (block.getField('TIMES')) {
      // Internal number.
      var repeats = String(Number(block.getFieldValue('TIMES')));
    } else {
      // External number.
      var repeats = Blockly.JavaScript.valueToCode(block, 'TIMES',
          Blockly.JavaScript.ORDER_ASSIGNMENT) || '0';
    }
    var branch = Blockly.JavaScript.statementToCode(block, 'DO');
    branch = Blockly.JavaScript.addLoopTrap(branch, block.id);
    var code = '';
    var loopVar = Blockly.JavaScript.variableDB_.getDistinctName(
        'count', Blockly.Variables.NAME_TYPE);
    var endVar = repeats;
    if (!repeats.match(/^\w+$/) && !Blockly.isNumber(repeats)) {
      var endVar = Blockly.JavaScript.variableDB_.getDistinctName(
          'repeat_end', Blockly.Variables.NAME_TYPE);
      code += 'var ' + endVar + ' = ' + repeats + ';\n';
    }
    code += 'for (var ' + loopVar + ' = 0; ' +
        loopVar + ' < ' + endVar + '; ' +
        loopVar + '++) {\n' +
        '  let local_over = isStepOver();\n'                            // me
        + branch + '}\n';
    return code;
  };
  
  Blockly.JavaScript['controls_repeat'] =
      Blockly.JavaScript['controls_repeat_ext'];
  
  Blockly.JavaScript['controls_whileUntil'] = function(block) {
    // Do while/until loop.
    var until = block.getFieldValue('MODE') == 'UNTIL';
    var argument0 = Blockly.JavaScript.valueToCode(block, 'BOOL',
        until ? Blockly.JavaScript.ORDER_LOGICAL_NOT :
        Blockly.JavaScript.ORDER_NONE) || 'false';
    var branch = Blockly.JavaScript.statementToCode(block, 'DO');
    branch = Blockly.JavaScript.addLoopTrap(branch, block.id);
    if (until) {
      argument0 = '!' + argument0;
    }
    return 'while (' + argument0 + ') {\n' +
        '  let local_over = isStepOver();\n'                            // me
        + branch + '}\n';
  };
  
  Blockly.JavaScript['controls_for'] = function(block) {
    // For loop.
    var variable0 = Blockly.JavaScript.variableDB_.getName(
        block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
    var argument0 = Blockly.JavaScript.valueToCode(block, 'FROM',
        Blockly.JavaScript.ORDER_ASSIGNMENT) || '0';
    var argument1 = Blockly.JavaScript.valueToCode(block, 'TO',
        Blockly.JavaScript.ORDER_ASSIGNMENT) || '0';
    var increment = Blockly.JavaScript.valueToCode(block, 'BY',
        Blockly.JavaScript.ORDER_ASSIGNMENT) || '1';
    var branch = Blockly.JavaScript.statementToCode(block, 'DO');
    branch = Blockly.JavaScript.addLoopTrap(branch, block.id);
    var code;
    if (Blockly.isNumber(argument0) && Blockly.isNumber(argument1) &&
        Blockly.isNumber(increment)) {
      // All arguments are simple numbers.
      var up = parseFloat(argument0) <= parseFloat(argument1);
      code = 'for (' + variable0 + ' = ' + argument0 + '; ' +
          variable0 + (up ? ' <= ' : ' >= ') + argument1 + '; ' +
          variable0;
      var step = Math.abs(parseFloat(increment));
      if (step == 1) {
        code += up ? '++' : '--';
      } else {
        code += (up ? ' += ' : ' -= ') + step;
      }
      code += ') {\n' +
        '  let local_over = isStepOver();\n'                            // me
        + branch + '}\n';
    } else {
      code = '';
      // Cache non-trivial values to variables to prevent repeated look-ups.
      var startVar = argument0;
      if (!argument0.match(/^\w+$/) && !Blockly.isNumber(argument0)) {
        startVar = Blockly.JavaScript.variableDB_.getDistinctName(
            variable0 + '_start', Blockly.Variables.NAME_TYPE);
        code += 'var ' + startVar + ' = ' + argument0 + ';\n';
      }
      var endVar = argument1;
      if (!argument1.match(/^\w+$/) && !Blockly.isNumber(argument1)) {
        var endVar = Blockly.JavaScript.variableDB_.getDistinctName(
            variable0 + '_end', Blockly.Variables.NAME_TYPE);
        code += 'var ' + endVar + ' = ' + argument1 + ';\n';
      }
      // Determine loop direction at start, in case one of the bounds
      // changes during loop execution.
      var incVar = Blockly.JavaScript.variableDB_.getDistinctName(
          variable0 + '_inc', Blockly.Variables.NAME_TYPE);
      code += 'var ' + incVar + ' = ';
      if (Blockly.isNumber(increment)) {
        code += Math.abs(increment) + ';\n';
      } else {
        code += 'Math.abs(' + increment + ');\n';
      }
      code += 'if (' + startVar + ' > ' + endVar + ') {\n';
      code += Blockly.JavaScript.INDENT + incVar + ' = -' + incVar + ';\n';
      code += '}\n';
      code += 'for (' + variable0 + ' = ' + startVar + ';\n' +
          '     ' + incVar + ' >= 0 ? ' +
          variable0 + ' <= ' + endVar + ' : ' +
          variable0 + ' >= ' + endVar + ';\n' +
          '     ' + variable0 + ' += ' + incVar + ') {\n' +
          '  let local_over = isStepOver();\n'                            // me
          + branch + '}\n';
    }
    return code;
  };
  
  Blockly.JavaScript['controls_forEach'] = function(block) {
    // For each loop.
    var variable0 = Blockly.JavaScript.variableDB_.getName(
        block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
    var argument0 = Blockly.JavaScript.valueToCode(block, 'LIST',
        Blockly.JavaScript.ORDER_ASSIGNMENT) || '[]';
    var branch = Blockly.JavaScript.statementToCode(block, 'DO');
    branch = Blockly.JavaScript.addLoopTrap(branch, block.id);
    var code = '';
    // Cache non-trivial values to variables to prevent repeated look-ups.
    var listVar = argument0;
    if (!argument0.match(/^\w+$/)) {
      listVar = Blockly.JavaScript.variableDB_.getDistinctName(
          variable0 + '_list', Blockly.Variables.NAME_TYPE);
      code += 'var ' + listVar + ' = ' + argument0 + ';\n';
    }
    var indexVar = Blockly.JavaScript.variableDB_.getDistinctName(
        variable0 + '_index', Blockly.Variables.NAME_TYPE);
    branch = Blockly.JavaScript.INDENT + variable0 + ' = ' +
        listVar + '[' + indexVar + '];\n' + branch;
    code += 'for (var ' + indexVar + ' in ' + listVar + ') {\n' +
    '  let local_over = isStepOver();\n'                            // me
    + branch + '}\n';
    return code;
  }; */