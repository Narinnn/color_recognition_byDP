const PNGImage = require("pngjs-image");

const ImageModel = require("../models/ImageModel");
const RGBModel = require("../models/RGBModel");

let ImageProcessor = function() {
    this._imageModel = null;
    this._png = null;
};

ImageProcessor.prototype.constractor = ImageProcessor;

ImageProcessor.prototype.parse = function(data) {
    const [width, height] = data.shape;
    const pixels = this._getPixels(data);

    return new ImageModel(width, height, pixels);
};

ImageProcessor.prototype.save = function(imageModel) {
    const image = PNGImage.createImage(imageModel.width, imageModel.height);

    for(var y = 0; y < imageModel.height; y++) {
        for(var x = 0; x < imageModel.width; x++) {
            const pixel = imageModel.pixels[y * imageModel.width + x];
            
            image.setPixel(x, y, { red: pixel.R, green: pixel.G, blue: pixel.B, alpha: 255 });
        }
    }

    image.writeImage(["./storage/", imageModel.name , ".png"].join(""), err => {
        if(err) {
            return;
        }
    });
};

ImageProcessor.prototype._getPixels = function(data) {
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

module.exports = ImageProcessor;