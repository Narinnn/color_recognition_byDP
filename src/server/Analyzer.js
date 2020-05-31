var ImageProcessor = require("./services/ImageProcessor");
var Network = require("./services/Network");

var Analyzer = function() {
    this._imageModel = null;
    this._resultModel = null;
    this._imageProcessor = null;
    this._nn = null;
};

Analyzer.prototype.constractor = Analyzer;

Analyzer.prototype.init = function() {
    this._imageProcessor = new ImageProcessor();
    this._nn = new Network();
};

Analyzer.prototype.run = function(data) {
    this._imageModel = image.parse(data);
};

Analyzer.prototype.train = function(model) {
};

module.exports = Analyzer;