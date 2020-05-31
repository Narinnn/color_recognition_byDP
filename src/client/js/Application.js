"use strict";

var EventConstants = require("./constants/EventConstants");

var DataProvider = require("./services/DataProvider");

var UploaderComponent = require("./components/UploaderComponent");
var TargetComponent = require("./components/TargetComponent");
var ResultComponent = require("./components/ResultComponent");

var Application = function() {
    this._uploaderView = null;
    this._trainView = null;
    this._targetView = null;
    this._resultView = null;
    this._statisticView = null;
    
    this._dataProvider = new DataProvider("http://localhost:9000/");

    this.initEventListeners();
};

Application.prototype.constructor = Application;

Application.prototype.start = function() {
    this._uploaderView = new UploaderComponent();
    this._uploaderView.show();
    this._uploaderView.initEventListeners();

    this._targetView = new TargetComponent();
    this._targetView.show();
    this._targetView.initEventListeners();

    this._resultView = new ResultComponent();
    this._resultView.show();
    this._resultView.initEventListeners();
};

Application.prototype.initEventListeners = function() {
    $(document).ready(function() {
        this.start();
    }.bind(this));

    $(document).on(EventConstants.READY_FOR_UPLOAD, function(data) {
        var formData = new FormData();
        var files = data.detail;
        
		$(files).each(function(index, file) {
			if (file.type == 'image/png' || file.type == 'image/jpeg') {
				formData.append('picture', file);
			}
        });

        this._dataProvider.makeRequest({ relative: "upload", request: { type: "POST", data: formData }, event: EventConstants.PICTURE_UPLOADED });
    }.bind(this));
};

module.exports = Application;