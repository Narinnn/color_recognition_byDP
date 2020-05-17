var ImageParser = require("./parsers/ImageParser");

var Analyzer = function() {
    this.neuralNetwork = null;
};

Analyzer.prototype.constractor = Analyzer;

Analyzer.prototype.run = function(data) {
    
    const image = new ImageParser();
    const imageModel = image.parse(data);
};

module.exports = Analyzer;