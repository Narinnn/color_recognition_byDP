let Utils = function() {};

Utils.getToken = function() {
    return Math.floor(Math.random() * 1e12).toString(16);
};

module.exports = Utils;