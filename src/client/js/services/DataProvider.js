"use strict";

var EventConstants = require("../constants/EventConstants");

var ResultComponent = function(baseApiUrl) {
    this._baseApiUrl = baseApiUrl;
};

ResultComponent.prototype.constructor = ResultComponent;

ResultComponent.prototype.makeRequest = function(data) {
    var request = data.request || {};

    request.url = this._baseApiUrl + data.relative;
    request.contentType = false;
    request.processData = false;
    request.success = function(response) {
        document.dispatchEvent(new CustomEvent(data.event, { detail: response }));
    };
    request.error = function(response) {
        // var event = new Event(EventConstants.WRONG_FILE_UPLOADED);

        // document.dispatchEvent(event, response);
    }.bind(this);

    $.ajax(request);
};

module.exports = ResultComponent;