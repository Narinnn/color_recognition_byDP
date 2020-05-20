var PNGImage = require("pngjs-image");

var PNGSaver = function() {};

PNGSaver.prototype.constractor = PNGSaver;

PNGSaver.prototype.save = function(imageModel) {
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

module.exports = PNGSaver;