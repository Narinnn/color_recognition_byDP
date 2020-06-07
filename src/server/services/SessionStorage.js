let SessionStorage = function() {
    this._sessions = [];
};

SessionStorage.prototype.constractor = SessionStorage;

SessionStorage.prototype.getSession = function(key) {
    return this._sessions.find(session => session.key === key);
};

SessionStorage.prototype.setSession = function(session) {
    this._sessions.push(session);
};

module.exports = SessionStorage;