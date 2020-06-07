const Architect = require("synaptic").Architect;
const Trainer = require("synaptic").Trainer;

const RGBModel = require("../models/RGBModel");

let Network = function() {
    this._perceptron = null;
    this._trainer = null;
    this._knowledge = [];
};

Network.prototype.constractor = Network;

Network.prototype.train = function(data) {
    if(data.length > 0) {
        const model = data.map(item => {
            return { input: item.input, output: item.output };
        });
        const set = data.map(item => item.color);
        const colors = [...new Set(set)];

        this._knowledge = colors.map(color => {
            const [red, green, blue] = color.split(",");

            return new RGBModel(red, green, blue);
        });

        const outputs = model[0].output.length;

        this._perceptron = new Architect.Perceptron(3, 14, outputs);
        this._trainer = new Trainer(this._perceptron);

        this._trainer.train(model, {
            rate: .1,
            iterations: 100000,
            error: .005,
            shuffle: true,
            log: 1000,
            cost: Trainer.cost.CROSS_ENTROPY
        });
    }
};

Network.prototype.trained = function() {
    let result = "not_ready";

    if(this._perceptron) {
        result = "trained";
    }

    return result;
};

Network.prototype.recognize = function(pixel) {
    if(this._perceptron) {
        const input = [];

        input.push(pixel.R / 255);
        input.push(pixel.G / 255);
        input.push(pixel.B / 255);

        const result = this._perceptron.activate(input);
        const decision = this._makeDecision(result);

        return this._knowledge[decision];
    } else {
        return [];
    }
};

Network.prototype._makeDecision = function(data) {
    let decision = 0;
    let max = 0;

    for(let i = 0; i < data.length; i++) {
        const item = data[i];

        if(item > max) {
            decision = i;
            max = item;
        }
    }

    return decision;
};

module.exports = Network;