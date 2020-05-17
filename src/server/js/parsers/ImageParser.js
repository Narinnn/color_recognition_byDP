

var ImageModel = require("../models/ImageModel");
var RGBModel = require("../models/RGBModel");

var ImageParser = function() {};

ImageParser.prototype.constractor = ImageParser;

ImageParser.prototype.parse = function(data) {
    const [width, height] = data.shape;
    const pixels = this._getPixels(data);

    return new ImageModel(width, height, pixels);
};

ImageParser.prototype._getPixels = function(data) {
    const result = [];
    const [width, height, offset] = data.shape;
    const buffer = data.data;

    const dimension = width * height * offset;

    for(var i = 0; i < dimension; i += offset) {
        const red = buffer[i];
        const green = buffer[i + 1];
        const blue = buffer[i + 2];

        result.push(new RGBModel(red, green, blue));
    }

    return result;
};

module.exports = ImageParser;