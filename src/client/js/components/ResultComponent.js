"use strict";

var EventConstants = require("../constants/EventConstants");

var BaseComponent = require("./BaseComponent");

var ResultComponent = function() {
    BaseComponent.call(this, ".output-container");

    this.$element = document.createElement("div");
    this.$element.classList.add("result-picture");

    this._img = null;
    this._preloader = null;
};

ResultComponent.prototype.constructor = ResultComponent;

ResultComponent.prototype = Object.create(BaseComponent.prototype);

ResultComponent.prototype.initEventListeners = function() {
    $(document).on(EventConstants.PICTURE_IS_PROCESSING, function(event) {
        this.$element.style.backgroundImage = "none";

        if(this._preloader) {
            if(this._img) {
                this._img.remove();
                this._img = null;
            }

            this._preloader.style.display = "flex";
        } else {
            this._preloader = document.createElement("img");
            this._preloader.src = "/assets/preloader.gif";

            this.$element.append(this._preloader);
        }
    }.bind(this));

    $(document).on(EventConstants.RESULT_IS_READY, function(data) {
        var response = data.detail;

        if(response && response.url) {
            this._preloader.style.display = "none";

            this._img = document.createElement("img");
            this._img.src = response.url;

            this.$element.append(this._img);
        }
    }.bind(this));
};

module.exports = ResultComponent;