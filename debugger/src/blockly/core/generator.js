Blockly.Generator.prototype.valueToCode = function(block, name, order) {
    if (isNaN(order)) {
      goog.asserts.fail('Expecting valid order from block "%s".', block.type);
    }
    var targetBlock = block.getInputTargetBlock(name);
    if (!targetBlock) {
      return '';
    }
    var tuple = this.blockToCode(targetBlock);
    if (tuple === '') {
      // Disabled block.
      return '';
    }
    // Value blocks must return code and order of operations info.
    // Statement blocks must only return code.
    goog.asserts.assertArray(tuple, 'Expecting tuple from value block "%s".',
        targetBlock.type);
    var code = tuple[0];
    var innerOrder = tuple[1];
    if (isNaN(innerOrder)) {
      goog.asserts.fail('Expecting valid order from value block "%s".',
          targetBlock.type);
    }
    if (code && order <= innerOrder) {
      if (order == innerOrder && (order == 0 || order == 99)) {
        // Don't generate parens around NONE-NONE and ATOMIC-ATOMIC pairs.
        // 0 is the atomic order, 99 is the none order.  No parentheses needed.
        // In all known languages multiple such code blocks are not order
        // sensitive.  In fact in Python ('a' 'b') 'c' would fail.
      } else {
        // The operators outside this code are stonger than the operators
        // inside this code.  To prevent the code from being pulled apart,
        // wrap the code in parentheses.
        // Technically, this should be handled on a language-by-language basis.
        // However all known (sane) languages use parentheses for grouping.
        if(order != 5 && order != 6)                    // for * / % + -
            code = '(' + code + ')';
      }
    }
    return code;
  };