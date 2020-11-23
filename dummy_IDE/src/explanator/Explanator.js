
class Explanator {
    constructor(mode) {
        this.features_holder = new FeaturesHolder();
        this.mode = mode;
        this.explanations_to_print = {};
    }

    CreateExplanation(
        featureID,
        stateID,
        message = "No message inserted",
        overwrite = true,
        retainExplanationOnBlockExit = true
    ) {
        let tempExplanation = new Explanation(featureID,
            stateID,
            message,
            overwrite,
            retainExplanationOnBlockExit
        );
        this.features_holder.AddExplanationToFeature(featureID, tempExplanation);
    }
    ClearExplanations(featureID = "", stateID = "") {
        this.features_holder.ClearExplanationsFromFeature(featureID, stateID);
    }
    AskExplanation(featureID, stateID) {
        this.features_holder.AskExplanationFromFeature(featureID, stateID);
    }
    AskAllExplanations() {
        this.explanations_to_print = this.features_holder.AskAllExplanations();
        console.log(this.explanations_to_print);
    }
    AskLastExplanation(featureID, stateID) {
        this.features_holder.AskLastExplanationFromFeature(featureID, stateID);
    }
    ExitBlock(featureID, stateID) {
        this.features_holder.ExitBlock(featureID, stateID);
    }
}

// Manages a hash table of features
class FeaturesHolder {
    constructor() {
        this.features_holder = [];
    }
    AddExplanationToFeature(featureID, explanation) {
        if (featureID in this.features_holder) {
            this.features_holder[featureID].AddExplanationToLog(explanation);
        } else {
            this.features_holder[featureID] = new Feature(featureID);
            this.features_holder[featureID].AddExplanationToLog(explanation);
        }
    }
    ClearExplanationsFromFeature(featureID = "", stateID = "") {
        if ((featureID === "")) {
            this.features_holder = [];
        } else {
            if (featureID in this.features_holder) {
                this.features_holder[featureID].ClearExplanationsFromLog(stateID);
            } else {
                console.log(`Feature id: ${featureID} does not exist.`);
            }
        }
    }
    AskAllExplanations() {
        let explanations_to_print = {};
        Object.values(this.features_holder).forEach(element => {
            explanations_to_print[element.featureID] = element.AskAllExplanations();
        });
        return explanations_to_print;
    }
    AskExplanationFromFeature(featureID, stateID) {
        if (featureID in this.features_holder) {
            this.features_holder[featureID].AskExplanation(stateID);
        } else {
            console.log(`Feature id: ${featureID} does not exist.`);
        }
    }
    AskLastExplanationFromFeature(featureID, stateID) {
        if (featureID in this.features_holder) {
            this.features_holder[featureID].AskLastExplanation(stateID);
        } else {
            console.log(`Feature id: ${featureID} does not exist.`);
        }
    }
}

class Feature {
    constructor(featureID) {
        this.featureID = featureID;
        this.Explanations = new ExplanationsLog();
    }
    AddExplanationToLog(explanation) {
        this.Explanations.AddExplanation(explanation);
    }
    ClearExplanationsFromLog(stateID = "") {
        this.Explanations.ClearExplanations(stateID);
    }
    AskAllExplanations() {
        return this.Explanations.AskAllExplanations();
    }
    AskExplanation(stateID) {
        return this.Explanations.AskExplanation(stateID);
    }
    AskLastExplanation(stateID) {
        return this.Explanations.AskLastExplanation(stateID);
    }
}

// Simple log class, managing a log for a single feature
class ExplanationsLog {
    constructor() {
        this.log = [];
    }

    AddExplanation(explanation) {
        if (explanation.overwrite === true) {
            this.log.pop();
            this.log.push(explanation);
        } else {
            this.log.push(explanation);
        }
    }

    HasExplanation(stateID) {
        // might need a query for a state
    }

    AskAllExplanations() {
        if (!Array.isArray(this.log) || !this.log.length) {
            // log does not exist, is not an array, or is empty
            // ⇒ do not attempt to process log
            console.log("No Explanations!");
        } else {
            this.log.forEach(element => {
                let new_list_element = document.createElement("li");
                new_list_element.innerHTML = element.message;
                document.getElementById("helpDescription").appendChild(new_list_element);
            });
            return this.log;
        }
    }

    AskExplanation(stateID) {
        this.log.forEach(element => {
            if (element.stateID === stateID) {
                console.log(element.message)
            }
        });
    }

    // TODO
    AskLastExplanation() {
        console.log(this.log[log.length - 1]);
    }

    ClearExplanations(stateID = "") {
        if (stateID === "") {
            while (this.log.length > 0) {
                this.log.pop();
            }
        } else {
            let index = this.log.findIndex((x) => x.stateID == stateID);
            while (index != -1) {
                this.log.splice(index, 1);
                index = this.log.findIndex((x) => x.stateID == stateID);
            }
        }
    }

    ExitBlock(stateID) {
        for (var i = 0; i < this.log.length; i++) {
            if (
                this.log[i].stateID == stateID &&
                this.log[i].retainExplanationOnBlockExit == false
            ) {
                this.log.splice(index, 1);
            }
        }
    }
}

class Explanation {
    constructor(featureID,
        stateID,
        message = "No message inserted",
        overwrite = true,
        retainExplanationOnBlockExit = true
    ) {
        if (featureID === undefined || stateID === undefined) {
            window.alert("Feature or State undefined!");
        } else {
            this.featureID = featureID;
            this.stateID = stateID;
            this.message = message;
            this.overwrite = overwrite;
            this.retainExplanationOnBlockExit = retainExplanationOnBlockExit;
        }
    }
}

// turn to true for debug mode false for release.
const debugMode = false;
const explanator = new Explanator(debugMode);
export default explanator;

