"use strict";

var EventConstants = require("./constants/EventConstants");

var DataProvider = require("./services/DataProvider");

var UploaderComponent = require("./components/UploaderComponent");
var TrainComponent = require("./components/TrainComponent");
var TargetComponent = require("./components/TargetComponent");
var ResultComponent = require("./components/ResultComponent");

var Application = function() {
    this._uploaderView = null;
    this._trainView = null;
    this._trainView = null;
    this._targetView = null;
    this._resultView = null;
    this._statisticView = null;
    this._views = null;
    
    this._dataProvider = new DataProvider("http://localhost:9000/");

    this.initEventListeners();
};

Application.prototype.constructor = Application;

Application.prototype.start = function() {
    this._views = [];

    this._trainView = new TrainComponent();
    this._trainView.show();
    this._trainView.initEventListeners();

    this._views.push(this._trainView);

    this._dataProvider.makeRequest({ relative: "", request: { type: "GET" }, event: EventConstants.READY_FOR_USE });
};

Application.prototype.initEventListeners = function() {
    $(document).ready(function() {
        this.start();
    }.bind(this));

    $(document).on(EventConstants.READY_FOR_USE, function(data) {
        var response = data.detail;

        if(response && response.status === "trained") {
            document.dispatchEvent(new CustomEvent(EventConstants.TRAINED_NN));
        }
    }.bind(this));

    $(document).on(EventConstants.TRAIN_NN, function(data) {
        var formData = new FormData();
        var files = data.detail;
        
		$(files).each(function(index, file) {
			formData.append('model', file);
        });

        this._dataProvider.makeRequest({ relative: "train", request: { type: "POST", data: formData }, event: EventConstants.TRAINED_NN });
    }.bind(this));

    $(document).on(EventConstants.TRAINED_NN, function(data) {
        if(this._views) {
            for(var i = 0; i < this._views.length; i++) {
                this._views[i].destroy();
            }

            this._views = null;
        }

        this._views = [];

        this._trainView = new TrainComponent();
        this._trainView.show();
        this._trainView.initEventListeners();

        this._views.push(this._trainView);

        this._uploaderView = new UploaderComponent();
        this._uploaderView.show();
        this._uploaderView.initEventListeners();

        this._views.push(this._uploaderView);

        this._targetView = new TargetComponent();
        this._targetView.show();
        this._targetView.initEventListeners();

        this._views.push(this._targetView);

        this._resultView = new ResultComponent();
        this._resultView.show();
        this._resultView.initEventListeners();

        this._views.push(this._resultView);
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

    $(document).on(EventConstants.GET_RESULT, function(data) {
        var session = data.detail;

        if(session && session.status) {
            switch(session.status) {
                case "done": {
                    document.dispatchEvent(new CustomEvent(EventConstants.GOT_RESULT, { detail: session }));
                    break;
                }
                case "rejected": {break;}
                default: {
                    setTimeout(function() {
                        var endPoint = ["session", "?", ["key", session.key].join("=")].join("");

                        this._dataProvider.makeRequest({ relative: endPoint, request: { type: "GET" }, event: EventConstants.GET_RESULT });
                    }.bind(this), 2000);
                }
            }
        }
    }.bind(this));
};

module.exports = Application;