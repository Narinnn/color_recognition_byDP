var PNGImage = require("pngjs-image");

var PNGSaver = function() {};

PNGSaver.prototype.constractor = PNGSaver;

PNGSaver.prototype.save = function(imageModel) {
    const image = PNGImage.createImage(imageModel.width, imageModel.height);

    for(var row = 0; row < imageModel.height; row++) {
        for(var col = 0; col < imageModel.width; col++) {
            const pixel = imageModel.pixels[row * imageModel.width + col];
            
            image.setPixel(col, row, { red: pixel.R, green: pixel.G, blue: pixel.B, alpha: 255 });
        }
    }

    image.writeImage(["./storage/", imageModel.name , ".png"].join(""), err => {
        if(err) {
            return;
        }
    });
};

module.exports = PNGSaver;