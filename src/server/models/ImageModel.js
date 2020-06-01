var ImageModel = function(width, height, pixels, name) {
    this._pixels = pixels;
    this._width = width;
    this._height = height;
    this._name = name || "";
};

ImageModel.prototype.constractor = ImageModel;

Object.defineProperty(ImageModel.prototype, "name", { 
    get: function() {
        return this._name;
    },
    set: function(value) {
        this._name = value;
    }
});
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