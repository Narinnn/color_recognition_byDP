"use strict";

var EventConstants = require("../constants/EventConstants");
var BaseComponent = require("./BaseComponent");

var TargetComponent = function() {
    BaseComponent.call(this, ".output-container");

    this.$element = document.createElement("div");
    this.$element.classList.add("target-picture");
    
    this._img = null;
};

TargetComponent.prototype.constructor = TargetComponent;

TargetComponent.prototype = Object.create(BaseComponent.prototype);

TargetComponent.prototype.initEventListeners = function() {
    $(document).on(EventConstants.PICTURE_UPLOADED, function(data) {
        var response = data.detail;

        if(response && response.url) {
            this.$element.innerHTML = "";
            this.$element.style.backgroundImage = "none";
            
            this._img = document.createElement("img");
            this._img.src = response.url;

            this.$element.append(this._img);

            document.dispatchEvent(new CustomEvent(EventConstants.PICTURE_IS_PROCESSING));
        }
    }.bind(this));
};

module.exports = TargetComponent;