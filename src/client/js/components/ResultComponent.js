"use strict";

var EventConstants = require("../constants/EventConstants");

var BaseComponent = require("./BaseComponent");

var ResultComponent = function() {
    BaseComponent.call(this, ".output-container");

    this.$element = document.createElement("div");
    this.$element.classList.add("result-picture");

    this._img = null;
    this._gif = null;
};

ResultComponent.prototype.constructor = ResultComponent;

ResultComponent.prototype = Object.create(BaseComponent.prototype);

ResultComponent.prototype.initEventListeners = function() {
    $(document).on(EventConstants.PICTURE_IS_PROCESSING, function(event) {
        this.$element.style.backgroundImage = "none";

        if(this._gif) {
            if(this._img) {
                this._img.remove();
                this._img = null;
            }

            this._gif.style.display = "flex";
        } else {
            this._gif = document.createElement("img");
            this._gif.src = "/assets/preloader.gif";

            this.$element.append(this._gif);
        }
    }.bind(this));
};

module.exports = ResultComponent;