let Session = function(key, target, result, baseUrl) {
    this._key = key;
    this._target = target;
    this._result = result;
    this._baseUrl = baseUrl;
    this._status = "open";
};

Session.prototype.constractor = Session;

Session.prototype.toJson = function() {
    return {
        key: this._key,
        target: this._target,
        result: this._result,
        baseUrl: this._baseUrl,
        status: this._status
    };
};

Object.defineProperty(Session.prototype, "key", { 
    get: function() {
        return this._key;
    }
});
Object.defineProperty(Session.prototype, "target", { 
    get: function() {
        return this._target;
    }
});
Object.defineProperty(Session.prototype, "result", { 
    get: function() {
        return this._result;
    }
});
Object.defineProperty(Session.prototype, "status", {
    get: function() {
        return this._status;
    },
    set: function(value) {
        this._status = value;
    }
});

module.exports = Session;