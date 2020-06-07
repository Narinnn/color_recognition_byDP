"use strict";

var EventConstants = require("../constants/EventConstants");
var BaseComponent = require("./BaseComponent");

var TargetComponent = function() {
    BaseComponent.call(this, ".output-container");

    this.$element = document.createElement("div");
    this.$element.classList.add("target-picture");
    
    this._img = null;
    this._preloader = null;
};

TargetComponent.prototype.constructor = TargetComponent;

TargetComponent.prototype = Object.create(BaseComponent.prototype);

TargetComponent.prototype.initEventListeners = function() {
    $(document).on(EventConstants.PICTURE_UPLOADED, function(data) {
        var response = data.detail;

        if(response && response.type === "ok") {
            this.$element.innerHTML = "";
            this.$element.style.backgroundImage = "none";

            this._preloader = document.createElement("img");
            this._preloader.src = "/assets/preloader.gif";

            this.$element.append(this._preloader);
            
            this._img = document.createElement("img");
            
            this._img.onload = function() {
                this._preloader.style.display = "none";
            }.bind(this);
            
            this._img.src = [response.session.baseUrl, response.session.target].join("");

            this.$element.append(this._img);

            document.dispatchEvent(new CustomEvent(EventConstants.PICTURE_IS_PROCESSING, { detail: response.session }));
        }
    }.bind(this));
};

TargetComponent.prototype.removeEventListeners = function() {
    $(document).off(EventConstants.PICTURE_UPLOADED);
};

TargetComponent.prototype.destroy = function() {
    this.removeEventListeners();

    this.$parent.empty();

    this._img = null;

    this.$element = null;

    this.$parent = null;
};

module.exports = TargetComponent;