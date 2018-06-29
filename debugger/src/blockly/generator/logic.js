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