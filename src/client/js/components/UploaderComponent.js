"use strict";

var EventConstants = require("../constants/EventConstants");

var BaseComponent = require("./BaseComponent");

var UploaderComponent = function() {
    BaseComponent.call(this, ".input-container");

    this.$element = `<form id="upload-container">
                        <img id="upload-image" src="/assets/upload-icon.png">
                        <div>
                            <input id="picture" type="file" name="file">
                            <label id="label-picture" for="picture">Выберите изображение</label>
                            <span>или перетащите его сюда</span>
                        </div>
                    </form>`;
    this._dropZone = null;
};

UploaderComponent.prototype.constructor = UploaderComponent;

UploaderComponent.prototype = Object.create(BaseComponent.prototype);

UploaderComponent.prototype.initEventListeners = function() {
    this._dropZone = $("#upload-container");

    $("#picture").on("focus", function() {
        $("#label-picture").addClass("focus");
    });
    
    $("#picture").on("focusout", function() {
        $("#label-picture").removeClass("focus");
    });

    this._dropZone.on("drag dragstart dragend dragover dragenter dragleave drop", function() {
        return false;
    });

    this._dropZone.on("dragover dragenter", function() {
        this._dropZone.addClass("dragover");
    });

    this._dropZone.on("dragleave", function(data) {
        var dx = data.pageX - this._dropZone.offset().left;
        var dy = data.pageY - this._dropZone.offset().top;

        if ((dx < 0) || (dx > this._dropZone.width()) || (dy < 0) || (dy > this._dropZone.height())) {
            this._dropZone.removeClass("dragover");
        }
    });

    this._dropZone.on("drop", function(data) {
        this._dropZone.removeClass("dragover");
        
        var event = new CustomEvent(EventConstants.READY_FOR_UPLOAD, { detail: data.originalEvent.dataTransfer.files });

        document.dispatchEvent(event);
    });

    $("#picture").on("change", function() {
        var event = new CustomEvent(EventConstants.READY_FOR_UPLOAD, { detail: this.files });

        document.dispatchEvent(event);
    });
};

UploaderComponent.prototype.removeEventListeners = function() {
    $("#picture").off("focus");
    
    $("#picture").off("focusout");

    this._dropZone.off("drag dragstart dragend dragover dragenter dragleave drop");

    this._dropZone.off("dragover dragenter");

    this._dropZone.off("dragleave");

    this._dropZone.off("drop");

    $("#picture").off("change");
};

UploaderComponent.prototype.destroy = function() {
    this.removeEventListeners();

    this._dropZone = null;

    this.$parent.empty();

    this.$element = null;

    this.$parent = null;
};

module.exports = UploaderComponent;