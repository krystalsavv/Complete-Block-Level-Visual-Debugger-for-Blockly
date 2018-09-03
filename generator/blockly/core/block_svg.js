import {Blockly_Debugger} from '../../../debugger/debugger.js';

  Blockly.BlockSvg.prototype.showContextMenu_ = function(e) {
    if (this.workspace.options.readOnly || !this.contextMenu) {
      return;
    }
    // Save the current block in a variable for use in closures.
    var block = this;
    var menuOptions = [];
  
    if (this.isDeletable() && this.isMovable() && !block.isInFlyout) {
      menuOptions.push(Blockly.ContextMenu.blockDuplicateOption(block));
      if (this.isEditable() && !this.collapsed_ &&
          this.workspace.options.comments) {
        menuOptions.push(Blockly.ContextMenu.blockCommentOption(block));
      }
  
      // Option to make block inline.
      if (!this.collapsed_) {
        for (var i = 1; i < this.inputList.length; i++) {
          if (this.inputList[i - 1].type != Blockly.NEXT_STATEMENT &&
              this.inputList[i].type != Blockly.NEXT_STATEMENT) {
            // Only display this option if there are two value or dummy inputs
            // next to each other.
            var inlineOption = {enabled: true};
            var isInline = this.getInputsInline();
            inlineOption.text = isInline ?
                Blockly.Msg['EXTERNAL_INPUTS'] : Blockly.Msg['INLINE_INPUTS'];
            inlineOption.callback = function() {
              block.setInputsInline(!isInline);
            };
            menuOptions.push(inlineOption);
            break;
          }
        }
      }
  
      if (this.workspace.options.collapse) {
        // Option to collapse/expand block.
        if (this.collapsed_) {
          var expandOption = {enabled: true};
          expandOption.text = Blockly.Msg['EXPAND_BLOCK'];
          expandOption.callback = function() {
            block.setCollapsed(false);
          };
          menuOptions.push(expandOption);
        } else {
          var collapseOption = {enabled: true};
          collapseOption.text = Blockly.Msg['COLLAPSE_BLOCK'];
          collapseOption.callback = function() {
            block.setCollapsed(true);
          };
          menuOptions.push(collapseOption);
        }
      }
  
      if (this.workspace.options.disable) {
        // Option to disable/enable block.
        var disableOption = {
          text: this.disabled ?
              Blockly.Msg['ENABLE_BLOCK'] : Blockly.Msg['DISABLE_BLOCK'],
          enabled: !this.getInheritedDisabled(),
          callback: function() {
            block.setDisabled(!block.disabled);
          }
        };
        menuOptions.push(disableOption);
      }
  
      menuOptions.push(Blockly.ContextMenu.blockDeleteOption(block));
    }
  

        // Breakpoints
    var breakpointOption = {
      text: (!Blockly_Debugger.actions["Breakpoint"].breakpoints.includes(block.id)) ? "Add Breakpoint" : "Remove Breakpoint",
      enabled: true,
      callback: function() {
          if(!Blockly_Debugger.actions["Breakpoint"].breakpoints.includes(block.id)) {
            Blockly_Debugger.actions["Breakpoint"].breakpoints.push(block.id);
            block.setCollapsed(false);                                  // expand the block if it is collapted 
          } else {
            var index = Blockly_Debugger.actions["Breakpoint"].breakpoints.indexOf(block.id);
            if (index !== -1) Blockly_Debugger.actions["Breakpoint"].breakpoints.splice(index, 1);
          }
          Blockly_Debugger.actions["Breakpoint"].handler();
          alert("Selected: " + block.id + "\n breakpoints: " + Blockly_Debugger.actions["Breakpoint"].breakpoints);
        }
    };
    menuOptions.push(breakpointOption);

    // Run to cursor
    var runToCursorOption = {
      text: "Run to cursor",
      enabled: true,
      callback: function() {
        Blockly_Debugger.actions["RunToCursor"].handler(block.id);
       // window.alert("Run to cursor   " + block.id);
      }
    };
    menuOptions.push(runToCursorOption);


    // Add/Remove watch
    var watchOption = {
      text: (block.type==="variables_set" || block.type==="variables_get") ?((!Blockly_Debugger.actions["Watch"].watches.includes(block.getVars()[0])) ? "Add Watch" : "Remove Watch") : "Add Watch",
      enabled: (block.type==="variables_set" || block.type==="variables_get") ? true : false,
      //enabled: true,
      callback: function(){
        //alert(block.nextConnection);
        // console.log(block.nextConnection);  
        // console.log(block.nextConnection.sourceBlock_.getVars());  
        if(!Blockly_Debugger.actions["Watch"].watches.includes(block.getVars()[0])){
          Blockly_Debugger.actions["Watch"].watches.push(block.getVars()[0]);
        }else{
          var index = Blockly_Debugger.actions["Watch"].watches.indexOf(block.getVars()[0]);
          if (index !== -1) Blockly_Debugger.actions["Watch"].watches.splice(index, 1);
        }
        Blockly_Debugger.actions["Watch"].handler();        
        alert(Blockly_Debugger.actions["Watch"].watches);

      }
    }

    menuOptions.push(watchOption);






    menuOptions.push(Blockly.ContextMenu.blockHelpOption(block));





  
    // Allow the block to add or modify menuOptions.
    if (this.customContextMenu) {
      this.customContextMenu(menuOptions);
    }
  
    Blockly.ContextMenu.show(e, menuOptions, this.RTL);
    Blockly.ContextMenu.currentBlock = this;
  };






// Blockly.BlockSvg.prototype.showContextMenu_ = function(e) {
//     if (this.workspace.options.readOnly || !this.contextMenu) {
//       return;
//     }
//     // Save the current block in a variable for use in closures.
//     var block = this;
//     var menuOptions = [];
  
//     if (this.isDeletable() && this.isMovable() && !block.isInFlyout) {
//       // Option to duplicate this block.
//       var duplicateOption = {
//         text: Blockly.Msg.DUPLICATE_BLOCK,
//         enabled: true,
//         callback: function() {
//           Blockly.duplicate_(block);
//         }
//       };
//       if (this.getDescendants().length > this.workspace.remainingCapacity()) {
//         duplicateOption.enabled = false;
//       }
//       menuOptions.push(duplicateOption);
  
//       if (this.isEditable() && !this.collapsed_ &&
//           this.workspace.options.comments) {
//         // Option to add/remove a comment.
//         var commentOption = {enabled: !goog.userAgent.IE};
//         if (this.comment) {
//           commentOption.text = Blockly.Msg.REMOVE_COMMENT;
//           commentOption.callback = function() {
//             block.setCommentText(null);
//           };
//         } else {
//           commentOption.text = Blockly.Msg.ADD_COMMENT;
//           commentOption.callback = function() {
//             block.setCommentText('');
//           };
//         }
//         menuOptions.push(commentOption);
//       }
  
//       // Option to make block inline.
//       if (!this.collapsed_) {
//         for (var i = 1; i < this.inputList.length; i++) {
//           if (this.inputList[i - 1].type != Blockly.NEXT_STATEMENT &&
//               this.inputList[i].type != Blockly.NEXT_STATEMENT) {
//             // Only display this option if there are two value or dummy inputs
//             // next to each other.
//             var inlineOption = {enabled: true};
//             var isInline = this.getInputsInline();
//             inlineOption.text = isInline ?
//                 Blockly.Msg.EXTERNAL_INPUTS : Blockly.Msg.INLINE_INPUTS;
//             inlineOption.callback = function() {
//               block.setInputsInline(!isInline);
//             };
//             menuOptions.push(inlineOption);
//             break;
//           }
//         }
//       }
  
//       if (this.workspace.options.collapse) {
//         // Option to collapse/expand block.
//         if (this.collapsed_) {
//           var expandOption = {enabled: true};
//           expandOption.text = Blockly.Msg.EXPAND_BLOCK;
//           expandOption.callback = function() {
//             block.setCollapsed(false);
//           };
//           menuOptions.push(expandOption);
//         } else {
//           var collapseOption = {enabled: true};
//           collapseOption.text = Blockly.Msg.COLLAPSE_BLOCK;
//           collapseOption.callback = function() {
//             block.setCollapsed(true);
//           };
//           menuOptions.push(collapseOption);
//         }
//       }
  
//       if (this.workspace.options.disable) {
//         // Option to disable/enable block.
//         var disableOption = {
//           text: this.disabled ?
//               Blockly.Msg.ENABLE_BLOCK : Blockly.Msg.DISABLE_BLOCK,
//           enabled: !this.getInheritedDisabled(),
//           callback: function() {
//             block.setDisabled(!block.disabled);
//           }
//         };
//         menuOptions.push(disableOption);
//       }
  
//       // Option to delete this block.
//       // Count the number of blocks that are nested in this block.
//       var descendantCount = this.getDescendants().length;
//       var nextBlock = this.getNextBlock();
//       if (nextBlock) {
//         // Blocks in the current stack would survive this block's deletion.
//         descendantCount -= nextBlock.getDescendants().length;
//       }
//       var deleteOption = {
//         text: descendantCount == 1 ? Blockly.Msg.DELETE_BLOCK :
//             Blockly.Msg.DELETE_X_BLOCKS.replace('%1', String(descendantCount)),
//         enabled: true,
//         callback: function() {
//           block.dispose(true, true);
//         }
//       };
//       menuOptions.push(deleteOption);
//     }
  

//     // Breakpoints
//     var breakpointOption = {
//       text: (!Blockly_Debugger.actions["Breakpoint"].breakpoints.includes(block.id)) ? "Add Breakpoint" : "Remove Breakpoint",
//       enabled: true,
//       callback: function() {
//           if(!Blockly_Debugger.actions["Breakpoint"].breakpoints.includes(block.id)) {
//             Blockly_Debugger.actions["Breakpoint"].breakpoints.push(block.id);
//             block.setCollapsed(false);                                  // expand the block if it is collapted 
//           } else {
//             var index = Blockly_Debugger.actions["Breakpoint"].breakpoints.indexOf(block.id);
//             if (index !== -1) Blockly_Debugger.actions["Breakpoint"].breakpoints.splice(index, 1);
//           }
//           Blockly_Debugger.actions["Breakpoint"].handler();
//           alert("Selected: " + block.id + "\n breakpoints: " + Blockly_Debugger.actions["Breakpoint"].breakpoints);
//         }
//     };
//     menuOptions.push(breakpointOption);

//     // Run to cursor
//     var runToCursorOption = {
//       text: "Run to cursor",
//       enabled: true,
//       callback: function() {
//         Blockly_Debugger.actions["RunToCursor"].handler(block.id);
//        // window.alert("Run to cursor   " + block.id);
//       }
//     };
//     menuOptions.push(runToCursorOption);


//     // Add/Remove watch
//     var watchOption = {
//       text: (block.type==="variables_set" || block.type==="variables_get") ?((!Blockly_Debugger.actions["Watch"].watches.includes(block.getVars()[0])) ? "Add Watch" : "Remove Watch") : "Add Watch",
//       enabled: (block.type==="variables_set" || block.type==="variables_get") ? true : false,
//       //enabled: true,
//       callback: function(){
//         //alert(block.nextConnection);
//         // console.log(block.nextConnection);  
//         // console.log(block.nextConnection.sourceBlock_.getVars());  
//         if(!Blockly_Debugger.actions["Watch"].watches.includes(block.getVars()[0])){
//           Blockly_Debugger.actions["Watch"].watches.push(block.getVars()[0]);
//         }else{
//           var index = Blockly_Debugger.actions["Watch"].watches.indexOf(block.getVars()[0]);
//           if (index !== -1) Blockly_Debugger.actions["Watch"].watches.splice(index, 1);
//         }
//         Blockly_Debugger.actions["Watch"].handler();        
//         alert(Blockly_Debugger.actions["Watch"].watches);

//       }
//     }

//     menuOptions.push(watchOption);

//     // Option to get help.
//     var url = goog.isFunction(this.helpUrl) ? this.helpUrl() : this.helpUrl;
//     var helpOption = {enabled: !!url};
//     helpOption.text = Blockly.Msg.HELP;
//     helpOption.callback = function() {
//       block.showHelp_();
//     };
//     menuOptions.push(helpOption);
    
//     // Allow the block to add or modify menuOptions.
//     if (this.customContextMenu && !block.isInFlyout) {
//       this.customContextMenu(menuOptions);
//     }
  
//     Blockly.ContextMenu.show(e, menuOptions, this.RTL);
//     Blockly.ContextMenu.currentBlock = this;


//   };
