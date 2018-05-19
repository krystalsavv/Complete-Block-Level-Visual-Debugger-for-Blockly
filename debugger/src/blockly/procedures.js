// function definition
Blockly.JavaScript['procedures_defreturn'] = function(block) {
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