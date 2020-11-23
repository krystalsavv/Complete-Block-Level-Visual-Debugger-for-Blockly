// CUSTOM BLOCK DEFINITIONS
import * as Blockly from 'blockly';
const enumerated_ids = {
    LIGHTBULB: {
        ON: 'on',
        OFF: 'off'
    },
    PLAYER: {
        ALIVE: 'player.alive',
        DEAD: 'player.dead',
        POWEREDUP: 'player.poweredup'
    },
    DOOR: {
        OPEN: 'open',
        CLOSED: 'closed'
    }
};

// CREATE EXPLANATION
Blockly.Blocks['createexplanation'] = {

    init: function () {
        this.appendDummyInput()
            .appendField("Create Explanation for Feature")
            .appendField(new Blockly.FieldDropdown(this.generateFeatures, this.handleTypeSelection.bind(this)), "feature_ids");

        this.selected_feature = this.getFieldValue("feature_ids");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(300);
        this.setTooltip("");
        this.setHelpUrl("");
    },

    handleTypeSelection: function (newType) {
        // Avoid unnecessary updates if someone clicks the same field twice
        if (this.selected_feature !== newType) {
            // Update this.selected_feature to the new value
            this.selected_feature = newType;
            // Add or remove fields as appropriate
            this.updateShape();
        }
    },

    updateShape: function () {
        // Remove the old input (so that we don't have inputs stack repeatedly)
        if (this.getInput('appendExplanation')) {
            this.removeInput('appendState');
            this.removeInput('appendExplanation');
        }
        this.appendDummyInput('appendState')
            .appendField('Select State: ')
            .appendField(new Blockly.FieldDropdown(this.generateStates(this.selected_feature)), 'state_ids')
        // Append the new input based on the value of this.columnType
        this.appendDummyInput('appendExplanation')
            .appendField("Message")
            .appendField(new Blockly.FieldTextInput(""), "message_input")
            .appendField("Overwrite Last")
            .appendField(new Blockly.FieldCheckbox("FALSE"), "overwrite_explanation")
            .appendField("Retain Explanation on block exit")
            .appendField(new Blockly.FieldCheckbox("FALSE"), "retain_explanation");
    },

    generateFeatures: function () {
        let options = [];
        let features = Object.keys(enumerated_ids);
        features.forEach(element => {
            options.push([element, element.toUpperCase()]);
        });
        return options;
    },
    generateStates: function (selected_feature) {
        let options = [];

        console.log(selected_feature);
        let states = enumerated_ids[Object.keys(enumerated_ids).filter(function (k) {
            return selected_feature === k;
        }).pop() || ''];
        console.log(states);

        Object.keys(states).forEach(element => {
            options.push([element, element.toUpperCase()]);
        });
        console.log(options);
        return options;
    }
};

// CLEAR EXPLANATIONS
Blockly.Blocks['clearexplanations'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Clear Explanations");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(300);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

// ASK EXPLANATION
Blockly.Blocks['askexplanation'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Ask Explanation from Feature")
            .appendField(new Blockly.FieldDropdown(this.generateFeatures, this.handleTypeSelection.bind(this)), "ask_feature_ids");

        this.selected_feature = this.getFieldValue("ask_feature_ids");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(345);
        this.setTooltip("");
        this.setHelpUrl("");
    },
    handleTypeSelection: function (newType) {
        // Avoid unnecessary updates if someone clicks the same field twice
        if (this.selected_feature !== newType) {
            // Update this.selected_feature to the new value
            this.selected_feature = newType;
            // Add or remove fields as appropriate
            this.updateShape();
        }
    },

    updateShape: function () {
        // Remove the old input (so that we don't have inputs stack repeatedly)
        if (this.getInput('appendAskState')) {
            this.removeInput('appendAskState');
        }
        this.appendDummyInput('appendAskState')
            .appendField('With State: ')
            .appendField(new Blockly.FieldDropdown(this.generateStates(this.selected_feature)), 'ask_state_ids')
    },

    generateFeatures: function () {
        let options = [];
        let features = Object.keys(enumerated_ids);
        features.forEach(element => {
            options.push([element, element.toUpperCase()]);
        });
        return options;
    },
    generateStates: function (selected_feature) {
        let options = [];

        console.log(selected_feature);
        let states = enumerated_ids[Object.keys(enumerated_ids).filter(function (k) {
            return selected_feature === k;
        }).pop() || ''];
        console.log(states);

        Object.keys(states).forEach(element => {
            options.push([element, element.toUpperCase()]);
        });
        console.log(options);
        return options;
    }
};

// ASK ALL EXPLANATIONS
Blockly.Blocks['askallexplanations'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Ask All Explanations");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(300);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};