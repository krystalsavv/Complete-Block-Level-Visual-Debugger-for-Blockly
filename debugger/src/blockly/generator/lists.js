'use strict';
import {generation} from '../blockly_init.js'

Blockly.JavaScript['lists_length'] = function(block) {
    // String or array length.
    var argument0 = Blockly.JavaScript.valueToCode(block, 'VALUE',
        Blockly.JavaScript.ORDER_FUNCTION_CALL) || '[]';
    //return ['var ' + my_list + ' = ' + argument0 + ';\n' + my_list + '.length', Blockly.JavaScript.ORDER_MEMBER];
    return [ '(' + argument0 + ')' + '.length', Blockly.JavaScript.ORDER_MEMBER];
  };
  
  Blockly.JavaScript['lists_isEmpty'] = function(block) {
    // Is the string null or array empty?
    var argument0 = Blockly.JavaScript.valueToCode(block, 'VALUE',
        Blockly.JavaScript.ORDER_MEMBER) || '[]';
    //return ['var ' + my_list + ' = ' + argument0 + ';\n' + '!' + my_list + '.length', Blockly.JavaScript.ORDER_LOGICAL_NOT];
    return [ '!' + '(' + argument0 + ')' + '.length', Blockly.JavaScript.ORDER_LOGICAL_NOT];
  };



  Blockly.JavaScript['lists_indexOf'] = function(block) {
    // Find an item in the list.
    var operator = block.getFieldValue('END') == 'FIRST' ?
        'indexOf' : 'lastIndexOf';
    var argument0 = Blockly.JavaScript.valueToCode(block, 'FIND',
        Blockly.JavaScript.ORDER_NONE) || '\'\'';
    var argument1 = Blockly.JavaScript.valueToCode(block, 'VALUE',
        Blockly.JavaScript.ORDER_MEMBER) || '[]';
    var code = '(' + argument1  + ')' + '.' + operator + '(' + argument0 + ') + 1';
    return [code, Blockly.JavaScript.ORDER_MEMBER];
  };


Blockly.JavaScript['lists_getIndex'] = function(block) {
    // Get element at index.
    // Note: Until January 2013 this block did not have MODE or WHERE inputs.
    var mode = block.getFieldValue('MODE') || 'GET';
    var where = block.getFieldValue('WHERE') || 'FROM_START';
    var at = Blockly.JavaScript.valueToCode(block, 'AT',
        Blockly.JavaScript.ORDER_UNARY_NEGATION) || '1';
    var list = Blockly.JavaScript.valueToCode(block, 'VALUE',
        Blockly.JavaScript.ORDER_MEMBER) || '[]';
  
    list = '(' + list + ')';
    if (where == 'FIRST') {
      if (mode == 'GET') {
        var code = list + '[0]';
        return [code, Blockly.JavaScript.ORDER_MEMBER];
      } else if (mode == 'GET_REMOVE') {
        var code = list + '.shift()';
        return [code, Blockly.JavaScript.ORDER_MEMBER];
      } else if (mode == 'REMOVE') {
        return list + '.shift();\n';
      }
    } else if (where == 'LAST') {
      if (mode == 'GET') {
        var code = list + '.slice(-1)[0]';
        return [code, Blockly.JavaScript.ORDER_MEMBER];
      } else if (mode == 'GET_REMOVE') {
        var code = list + '.pop()';
        return [code, Blockly.JavaScript.ORDER_MEMBER];
      } else if (mode == 'REMOVE') {
        return list + '.pop();\n';
      }
    } else if (where == 'FROM_START') {
      // Blockly uses one-based indicies.
      if (Blockly.isNumber(at)) {
        // If the index is a naked number, decrement it right now.
        at = parseFloat(at) - 1;
      } else {
        // If the index is dynamic, decrement it in code.
        at += ' - 1';
      }
      if (mode == 'GET') {
        var code = list + '[' + at + ']';
        return [code, Blockly.JavaScript.ORDER_MEMBER];
      } else if (mode == 'GET_REMOVE') {
        var code = list + '.splice(' + at + ', 1)[0]';
        return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
      } else if (mode == 'REMOVE') {
        return list + '.splice(' + at + ', 1);\n';
      }
    } else if (where == 'FROM_END') {
      if (mode == 'GET') {
        var code = list + '.slice(-' + at + ')[0]';
        return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
      } else if (mode == 'GET_REMOVE' || mode == 'REMOVE') {
        var functionName = Blockly.JavaScript.provideFunction_(
            'lists_remove_from_end',
            [ 'function ' + Blockly.JavaScript.FUNCTION_NAME_PLACEHOLDER_ +
                '(list, x) {',
              '  x = list.length - x;',
              '  return list.splice(x, 1)[0];',
              '}']);
        code = functionName + '(' + list + ', ' + at + ')';
        if (mode == 'GET_REMOVE') {
          return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
        } else if (mode == 'REMOVE') {
          return code + ';\n';
        }
      }
    } else if (where == 'RANDOM') {
      var functionName = Blockly.JavaScript.provideFunction_(
          'lists_get_random_item',
          [ 'function ' + Blockly.JavaScript.FUNCTION_NAME_PLACEHOLDER_ +
              '(list, remove) {',
            '  var x = Math.floor(Math.random() * list.length);',
            '  if (remove) {',
            '    return list.splice(x, 1)[0];',
            '  } else {',
            '    return list[x];',
            '  }',
            '}']);
      code = functionName + '(' + list + ', ' + (mode != 'GET') + ')';
      if (mode == 'GET' || mode == 'GET_REMOVE') {
        return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
      } else if (mode == 'REMOVE') {
        return code + ';\n';
      }
    }
    throw 'Unhandled combination (lists_getIndex).';
  };
  

  Blockly.JavaScript['lists_setIndex'] = function(block) {
    // Set element at index.
    // Note: Until February 2013 this block did not have MODE or WHERE inputs.
    var list = Blockly.JavaScript.valueToCode(block, 'LIST',
        Blockly.JavaScript.ORDER_MEMBER) || '[]';
    var mode = block.getFieldValue('MODE') || 'GET';
    var where = block.getFieldValue('WHERE') || 'FROM_START';
    var at = Blockly.JavaScript.valueToCode(block, 'AT',
        Blockly.JavaScript.ORDER_NONE) || '1';
    var value = Blockly.JavaScript.valueToCode(block, 'TO',
        Blockly.JavaScript.ORDER_ASSIGNMENT) || 'null';
    // Cache non-trivial values to variables to prevent repeated look-ups.
    // Closure, which accesses and modifies 'list'.
 
    list = '(' + list + ')';
    function cacheList() {
      if (list.match(/^\w+$/)) {
        return '';
      }
      var listVar = Blockly.JavaScript.variableDB_.getDistinctName(
          'tmp_list', Blockly.Variables.NAME_TYPE);
      var code = 'var ' + listVar + ' = ' + list + ';\n';
      list = listVar;
      return code;
    }
    if (where == 'FIRST') {
      if (mode == 'SET') {
        return list + '[0] = ' + value + ';\n';
      } else if (mode == 'INSERT') {
        return list + '.unshift(' + value + ');\n';
      }
    } else if (where == 'LAST') {
      if (mode == 'SET') {
        var code = cacheList();
        code += list + '[' + list + '.length - 1] = ' + value + ';\n';
        return code;
      } else if (mode == 'INSERT') {
        return list + '.push(' + value + ');\n';
      }
    } else if (where == 'FROM_START') {
      // Blockly uses one-based indicies.
      if (Blockly.isNumber(at)) {
        // If the index is a naked number, decrement it right now.
        at = parseFloat(at) - 1;
      } else {
        // If the index is dynamic, decrement it in code.
        at += ' - 1';
      }
      if (mode == 'SET') {
        return list + '[' + at + '] = ' + value + ';\n';
      } else if (mode == 'INSERT') {
        return list + '.splice(' + at + ', 0, ' + value + ');\n';
      }
    } else if (where == 'FROM_END') {
      var code = cacheList();
      if (mode == 'SET') {
        code += list + '[' + list + '.length - ' + at + '] = ' + value + ';\n';
        return code;
      } else if (mode == 'INSERT') {
        code += list + '.splice(' + list + '.length - ' + at + ', 0, ' + value +
            ');\n';
        return code;
      }
    } else if (where == 'RANDOM') {
      var code = cacheList();
      var xVar = Blockly.JavaScript.variableDB_.getDistinctName(
          'tmp_x', Blockly.Variables.NAME_TYPE);
      code += 'var ' + xVar + ' = Math.floor(Math.random() * ' + list +
          '.length);\n';
      if (mode == 'SET') {
        code += list + '[' + xVar + '] = ' + value + ';\n';
        return code;
      } else if (mode == 'INSERT') {
        code += list + '.splice(' + xVar + ', 0, ' + value + ');\n';
        return code;
      }
    }
    throw 'Unhandled combination (lists_setIndex).';
  };

  Blockly.JavaScript['lists_split'] = function(block) {
    // Block for splitting text into a list, or joining a list into text.
    var value_input = Blockly.JavaScript.valueToCode(block, 'INPUT',
        Blockly.JavaScript.ORDER_MEMBER);
    var value_delim = Blockly.JavaScript.valueToCode(block, 'DELIM',
        Blockly.JavaScript.ORDER_NONE) || '\'\'';
    var mode = block.getFieldValue('MODE');
    if (mode == 'SPLIT') {
      if (!value_input) {
        value_input = '\'\'';
      }
      var functionName = 'split';
    } else if (mode == 'JOIN') {
      if (!value_input) {
        value_input = '[]';
      }
      var functionName = 'join';
    } else {
      throw 'Unknown mode: ' + mode;
    }
    var code = '(' + value_input + ')' + '.' + functionName + '(' + value_delim + ')';
    return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
  };