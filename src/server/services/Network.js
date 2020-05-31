const Architect = require("synaptic").Architect;
const Trainer = require("synaptic").Trainer;

let Network = function() {
    this._perceptron = new Architect.Perceptron(3, 10, 1);
    this._trainer = new Trainer(this._perceptron);
};

Network.prototype.constractor = Network;

Network.prototype.train = function(model) {};

Network.prototype.recognize = function(pixel) {};

module.exports = Network;