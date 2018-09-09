import {generation} from '../blockly_init.js'

// Blockly.JavaScript['procedures_defreturn'] = function(block) {
//     // Define a procedure with a return value.
//     var funcName = Blockly.JavaScript.variableDB_.getName(
//         block.getFieldValue('NAME'), Blockly.Procedures.NAME_TYPE);
//     var branch = Blockly.JavaScript.statementToCode(block, 'STACK');
//     if (Blockly.JavaScript.STATEMENT_PREFIX) {
//       branch = Blockly.JavaScript.prefixLines(
//           Blockly.JavaScript.STATEMENT_PREFIX.replace(/%1/g, 'await wait(' + "0" + ', \'' + block.id + '\', \'' + generation.currentSystemEditorId + '\'), eval(update_values())'
//         ), Blockly.JavaScript.INDENT) + branch ;
//     }
//     if (Blockly.JavaScript.INFINITE_LOOP_TRAP) {
//       branch = Blockly.JavaScript.INFINITE_LOOP_TRAP.replace(/%1/g,
//           '\'' + block.id + '\'') + branch;
//     }
//     var returnValue = Blockly.JavaScript.valueToCode(block, 'RETURN',
//         Blockly.JavaScript.ORDER_NONE) || '';
//     if (returnValue) {
//       returnValue = '  let $returnValue = ' + returnValue + ';\n' + '  if(Blockly_Debuggee.state.currNest != -1) Blockly_Debuggee.state.currState.parent = false;\n  Blockly_Debuggee.state.currNest = global_nest;\n' + '  return $returnValue;\n';
//     }else{
//         returnValue = '  if(Blockly_Debuggee.state.currNest != -1) Blockly_Debuggee.state.currState.parent = false;\n  Blockly_Debuggee.state.currNest = global_nest;\n' + '  return;\n';
//     }
//     var args = [];
//     for (var x = 0; x < block.arguments_.length; x++) {
//       args[x] = Blockly.JavaScript.variableDB_.getName(block.arguments_[x],
//           Blockly.Variables.NAME_TYPE);
//     }
//     var code = 'async function ' + funcName + '(' + args.join(', ') + ') {\n' +  
//         '  let global_nest = Blockly_Debuggee.state.currNest;\n' + 
//         '  if(isStepOver() || isStepParent()) Blockly_Debuggee.state.currNest = -1;\n' +
//         branch +    
//         returnValue + '}'; 
//     code = Blockly.JavaScript.scrub_(block, code);
//     Blockly.JavaScript.definitions_[funcName] = code;
//     return null;
//   };


  Blockly.JavaScript['procedures_defreturn'] = function(block) {
    // Define a procedure with a return value.
    var funcName = Blockly.JavaScript.variableDB_.getName(
        block.getFieldValue('NAME'), Blockly.Procedures.NAME_TYPE);
    var branch = Blockly.JavaScript.statementToCode(block, 'STACK');
    if (Blockly.JavaScript.STATEMENT_PREFIX) {
      var id = block.id.replace(/\$/g, '$$$$');  // Issue 251.
        branch = Blockly.JavaScript.prefixLines(
            Blockly.JavaScript.STATEMENT_PREFIX.replace(/%1/g, 'await eval(update_values()), await wait(' + "0" + ', \'' + id + '\', \'' + generation.currentSystemEditorId + '\')'
        ), Blockly.JavaScript.INDENT) + branch ;
    }

    if (Blockly.JavaScript.INFINITE_LOOP_TRAP) {
      branch = Blockly.JavaScript.INFINITE_LOOP_TRAP.replace(/%1/g,
          '\'' + block.id + '\'') + branch;
    }
    var returnValue = Blockly.JavaScript.valueToCode(block, 'RETURN',
        Blockly.JavaScript.ORDER_NONE) || '';

     if (returnValue) {
         returnValue = '  let $returnValue = ' + returnValue + ';\n' + '  if(Blockly_Debuggee.state.currNest != -1) Blockly_Debuggee.state.currState.parent = false;\n  Blockly_Debuggee.state.currNest = global_nest;\n' + '  return $returnValue;\n';
     }else{
         returnValue = '  if(Blockly_Debuggee.state.currNest != -1) Blockly_Debuggee.state.currState.parent = false;\n  Blockly_Debuggee.state.currNest = global_nest;\n' + '  return;\n';
     }


    var args = [];
    for (var i = 0; i < block.arguments_.length; i++) {
      args[i] = Blockly.JavaScript.variableDB_.getName(block.arguments_[i],
          Blockly.Variables.NAME_TYPE);
    }
      var code =  'async function ' + funcName + '(' + args.join(', ') + ') {\n' +  
                '  let global_nest = Blockly_Debuggee.state.currNest;\n' + 
                '  if(isStepOver() || isStepParent()) Blockly_Debuggee.state.currNest = -1;\n' +
                branch +    
                returnValue + '}';
    code = Blockly.JavaScript.scrub_(block, code);
    // Add % so as not to collide with helper functions in definitions list.
    Blockly.JavaScript.definitions_['%' + funcName] = code;
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

  Blockly.JavaScript['procedures_ifreturn'] = function(block) {
  // Conditionally return value from a procedure.
  var condition = Blockly.JavaScript.valueToCode(block, 'CONDITION',
      Blockly.JavaScript.ORDER_NONE) || 'false';
  var code = 'if (' + condition + ') {\n' + '  Blockly_Debuggee.state.currNest = global_nest;\n  Blockly_Debuggee.state.currState.parent = false;\n';
  if (block.hasReturnValue_) {
    var value = Blockly.JavaScript.valueToCode(block, 'VALUE',
        Blockly.JavaScript.ORDER_NONE) || 'null';
    code += '  return ' + value + ';\n';
  } else {
    code += '  return;\n';
  }
  code += '}\n';
  return code;
};
