import {generation} from '../blockly_init.js'

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
      goog.asserts.assert(block.outputConnection,               //!! Now blockly 
        'Expecting string from statement block "%s".', block.type);
      code[0] = 'await $id(eval(update_values()), await wait(' + my_nest + ', ' + '\'' + block.id + '\', \''+ generation.currentSystemEditorId + '\'), ' + code[0] + ')';
      return [this.scrub_(block, code[0]), code[1]];
    } else if (goog.isString(code)) {
      var id = block.id.replace(/\$/g, '$$$$');  // Issue 251.  //!! Now blockly 
      if (this.STATEMENT_PREFIX) {
        code = this.STATEMENT_PREFIX.replace(/%1/g, 'eval(update_values()), await wait(' + my_nest + ', \'' + block.id + '\', \''+ generation.currentSystemEditorId + '\') ') +
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
  id = id.replace(/\$/g, '$$$$');  // Issue 251.  //!! Now blockly 
  if (this.INFINITE_LOOP_TRAP) {
    branch = this.INFINITE_LOOP_TRAP.replace(/%1/g, '\'' + id + '\'') + branch;
  }
  if (this.STATEMENT_PREFIX) {
    branch += this.prefixLines(this.STATEMENT_PREFIX.replace(/%1/g, 'eval(update_values()), await wait(' + generation.nest + ', \'' + id + '\', \''+ generation.currentSystemEditorId + '\')'), this.INDENT);
  }
  return branch;
};


Blockly.Generator.prototype.workspaceToCode = function(workspace) {
  if (!workspace) {
    // Backwards compatability from before there could be multiple workspaces.
    console.warn('No workspace specified in workspaceToCode call.  Guessing.');
    workspace = Blockly.getMainWorkspace();
  }
  var code = [];
  this.init(workspace);
  var blocks = workspace.getTopBlocks(true);
  generation.currentSystemEditorId = workspace.systemEditorId;
  var line = "\n// start source code of another editor\n";
  // var line = "\n// start source code of another editor\nCurrentSystemEditorId = '" + workspace.systemEditorId + "';\n";
  code.push(line);
  for (var x = 0, block; block = blocks[x]; x++) {
    line = this.blockToCode(block);
    if (goog.isArray(line)) {
      // Value blocks return tuples of code and operator order.
      // Top-level blocks don't care about operator order.
      line = line[0];
    }
    if (line) {
      if (block.outputConnection && this.scrubNakedValue) {
        // This block is a naked value.  Ask the language's code generator if
        // it wants to append a semicolon, or something.
        line = this.scrubNakedValue(line);
      }
      code.push(line);
    }
  }
  code = code.join('\n');  // Blank line between each section.
  code = this.finish(code);
  // Final scrubbing of whitespace.
  code = code.replace(/^\s+\n/, '');
  code = code.replace(/\n\s+$/, '\n');
  code = code.replace(/[ \t]+\n/g, '\n');
  return code;
};