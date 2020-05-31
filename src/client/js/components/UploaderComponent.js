"use strict";

var EventConstants = require("../constants/EventConstants");

var BaseComponent = require("./BaseComponent");

var UploaderComponent = function() {
    BaseComponent.call(this, ".input-container");

    this.$element = `<form id="upload-container">
                        <img id="upload-image" src="/assets/upload-icon.png">
                        <div>
                            <input id="picture" type="file" name="file">
                            <label for="picture">Выберите изображение</label>
                            <span>или перетащите его сюда</span>
                        </div>
                    </form>`;
};

UploaderComponent.prototype.constructor = UploaderComponent;

UploaderComponent.prototype = Object.create(BaseComponent.prototype);

UploaderComponent.prototype.initEventListeners = function() {
    var dropZone = $("#upload-container");

    $("#picture").focus(function() {
        $("label").addClass("focus");
    }).focusout(function() {
        $("label").removeClass("focus");
    });

    dropZone.on("drag dragstart dragend dragover dragenter dragleave drop", function() {
        return false;
    });

    dropZone.on("dragover dragenter", function() {
        dropZone.addClass("dragover");
    });

    dropZone.on("dragleave", function(data) {
        var dx = data.pageX - dropZone.offset().left;
        var dy = data.pageY - dropZone.offset().top;

        if ((dx < 0) || (dx > dropZone.width()) || (dy < 0) || (dy > dropZone.height())) {
            dropZone.removeClass("dragover");
        }
    });

    dropZone.on("drop", function(data) {
        dropZone.removeClass("dragover");
        
        var event = new CustomEvent(EventConstants.READY_FOR_UPLOAD, { detail: data.originalEvent.dataTransfer.files });

        document.dispatchEvent(event);
    });

    $("#picture").change(function() {
        var event = new CustomEvent(EventConstants.READY_FOR_UPLOAD, { detail: this.files });

        document.dispatchEvent(event);
    });
};

module.exports = UploaderComponent;