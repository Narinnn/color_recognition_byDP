const ImageProcessor = require("./services/ImageProcessor");
const ImageModel = require("./models/ImageModel");
const Network = require("./services/Network");

let Analyzer = function() {
    this._imageModel = null;
    this._resultModel = null;
    this._imageService = null;
    this._nn = null;
};

Analyzer.prototype.constractor = Analyzer;

Analyzer.prototype.init = function() {
    this._imageService = new ImageProcessor();
    this._nn = new Network();
};

Analyzer.prototype.run = function(data) {
    this._imageModel = this._imageService.parse(data);

    const pixels = [];

    for(let i = 0; i < this._imageModel.dimension; i++) {
        const result = this._nn.recognize(this._imageModel.pixels[i]);

        pixels.push(result);
    }

    this._resultModel = new ImageModel(this._imageModel.width, this._imageModel.height, pixels, "check");

    this._imageService.save(this._resultModel);

    console.log("Result has saved");
};

Analyzer.prototype.train = function(data) {
    this._nn.train(data);
};

module.exports = Analyzer;