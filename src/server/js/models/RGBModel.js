var RGBModel = function(red, green, blue) {
    this._red = red;
    this._green = green;
    this._blue = blue;
};

RGBModel.prototype.constractor = RGBModel;

Object.defineProperty(RGBModel.prototype, "R", { 
    get: function() {
        return this._red;
    }
});
Object.defineProperty(RGBModel.prototype, "G", {
    get: function() {
        return this._green;
    }
});
Object.defineProperty(RGBModel.prototype, "B", {
    get: function() {
        return this._blue;
    }
});

module.exports = RGBModel;