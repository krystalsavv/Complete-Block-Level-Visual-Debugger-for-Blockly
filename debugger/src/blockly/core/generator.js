import {generation} from '../blockly_init'


Blockly.Generator.prototype.blockToCode = function(block) {
    if (!block) {
      return '';
    }
    if (block.disabled) {
      // Skip past this block if it is disabled.
      return this.blockToCode(block.getNextBlock());
    }
  
    var func = this[block.type];
    goog.asserts.assertFunction(func,
        'Language "%s" does not know how to generate code for block type "%s".',
        this.name_, block.type);
    // First argument to func.call is the value of 'this' in the generator.
    // Prior to 24 September 2013 'this' was the only way to access the block.
    // The current prefered method of accessing the block is through the second
    // argument to func.call, which becomes the first parameter to the generator.
    var my_nest = ++generation.nest;
    var code = func.call(block, block);
    generation.nest--;
    if (goog.isArray(code)) {
      // Value blocks return tuples of code and operator order.
      code[0] = 'await $id(await wait(' + my_nest + ', ' + '\'' + block.id + '\'),' + code[0] + ')';
      return [this.scrub_(block, code[0]), code[1]];
    } else if (goog.isString(code)) {
      if (this.STATEMENT_PREFIX) {
        code = this.STATEMENT_PREFIX.replace(/%1/g, 'await wait(' + my_nest + ', \'' + block.id + '\')') +
            code;
      }
      return this.scrub_(block, code);
    } else if (code === null) {
      // Block has handled code generation itself.
      return '';
    } else {
      goog.asserts.fail('Invalid code generated: %s', code);
    }
  };



Blockly.Generator.prototype.addLoopTrap = function(branch, id) {
  if (this.INFINITE_LOOP_TRAP) {
    branch = this.INFINITE_LOOP_TRAP.replace(/%1/g, '\'' + id + '\'') + branch;
  }
  if (this.STATEMENT_PREFIX) {
    branch += this.prefixLines(this.STATEMENT_PREFIX.replace(/%1/g, 'await wait(' + generation.nest + ', \'' + id + '\')'), this.INDENT);
  }
  return branch;
};