"use strict";

var BaseComponent = function(parent) {
    this.$element = "";

    this.$parent = $(parent);
};

BaseComponent.prototype.constructor = BaseComponent;

BaseComponent.prototype.initEventListeners = function() {};

BaseComponent.prototype.show = function() {
    this.$parent.append(this.$element);
};

module.exports = BaseComponent;