

var ImageModel = function(width, height, pixels) {
    this._pixels = pixels;
    this._width = width;
    this._height = height;
};

ImageModel.prototype.constractor = ImageModel;



Object.defineProperty(ImageModel.prototype, "width", { 
    get: function() {
        return this._width;
    }
});
Object.defineProperty(ImageModel.prototype, "height", {
    get: function() {
        return this._height;
    }
});
Object.defineProperty(ImageModel.prototype, "dimension", {
    get: function() {
        return this._width * this._height;
    }
});
Object.defineProperty(ImageModel.prototype, "pixels", {
    get: function() {
        return this._pixels;
    }
});

module.exports = ImageModel;