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
    $(document).on(EventConstants.PICTURE_IS_PROCESSING, function(data) {
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

        document.dispatchEvent(new CustomEvent(EventConstants.GET_RESULT, { detail: data.detail }));
    }.bind(this));

    $(document).on(EventConstants.GOT_RESULT, function(data) {
        var session = data.detail;

        if(session) {
            this._preloader.style.display = "none";
            
            this._img = document.createElement("img");
            this._img.src = [session.baseUrl, session.result].join("");

            this.$element.append(this._img);
        }
    }.bind(this));
};

module.exports = ResultComponent;