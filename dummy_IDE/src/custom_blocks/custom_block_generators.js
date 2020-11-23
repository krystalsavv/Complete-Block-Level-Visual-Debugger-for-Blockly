// BLOCK CODE GENERATION
import * as Blockly from 'blockly';
import explanator from '../explanator/Explanator.js';

// CREATE EXPLANATION
Blockly.JavaScript['createexplanation'] = function (block) {
    var dropdown_features = block.getFieldValue('feature_ids');
    var dropdown_states = block.getFieldValue('state_ids');
    var text_message_input = block.getFieldValue('message_input');
    var checkbox_overwrite_explanation = block.getFieldValue('overwrite_explanation') == 'TRUE';
    var checkbox_retain_explanation = block.getFieldValue('retain_explanation') == 'TRUE';
    var code = 'explanator.CreateExplanation(' + '\"' + dropdown_features + '\",\"' + dropdown_states + '\",\"' + text_message_input + '\",' + checkbox_overwrite_explanation + ',' + checkbox_retain_explanation + ');\n';
    return code;
};

// CLEAR EXPLANATIONS
Blockly.JavaScript['clearexplanations'] = function (block) {
    var code = 'explanator.ClearExplanations();\n';
    return code;
};

// ASK EXPLANATION
Blockly.JavaScript['askexplanation'] = function (block) {
    var ask_dropdown_features = block.getFieldValue('ask_feature_ids');
    var ask_dropdown_states = block.getFieldValue('ask_state_ids');
    var code = 'explanator.AskExplanation(' + '\"' + ask_dropdown_features + '\",\"' + ask_dropdown_states + '\");\n';
    return code;
};

// ASK ALL EXPLANATIONS
Blockly.JavaScript['askallexplanations'] = function (block) {
    var code = 'explanator.AskAllExplanations();\n';
    return code;
};