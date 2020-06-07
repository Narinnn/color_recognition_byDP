"use strict";

var EventConstants = require("../constants/EventConstants");

var BaseComponent = require("./BaseComponent");

var TrainComponent = function() {
    BaseComponent.call(this, ".input-container");

    this.$element = `<form id="train-container">
                        <img id="upload-model" src="/assets/model-icon.png">
                        <div>
                            <input id="model" type="file" name="file">
                            <label id="label-model" for="model">Выберите модель для обучения</label>
                        </div>
                    </form>`;
};

TrainComponent.prototype.constructor = TrainComponent;

TrainComponent.prototype = Object.create(BaseComponent.prototype);

TrainComponent.prototype.initEventListeners = function() {
    $("#model").on("focus", function() {
        $("#label-model").addClass("focus");
    });

    $("#model").on("focusout", function() {
        $("#label-model").removeClass("focus");
    });

    $("#model").on("change", function() {
        var img = document.getElementById("upload-model");

        img.src = "/assets/preloader.gif";
        
        document.dispatchEvent(new CustomEvent(EventConstants.TRAIN_NN, { detail: this.files }));
    });
};

TrainComponent.prototype.removeEventListeners = function() {
    $("#model").off("focus");

    $("#model").off("focusout");

    $("#model").off("change");
};

TrainComponent.prototype.destroy = function() {
    this.removeEventListeners();

    this.$parent.empty();

    this.$element = null;

    this.$parent = null;
};

module.exports = TrainComponent;