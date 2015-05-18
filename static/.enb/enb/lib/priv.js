function Blocks() {
    this._methods = {};
}

Blocks.prototype = {

    declare: function(name, method) {
        this._methods[name] = method;
        return this;
    },

    get: function(name) {
        var method = this._methods[name];

        if (method) {
            return method;
        } else {
            throw new Error('Priv method ' + name + ' was not found');
        }
    },

    exec: function(name) {
        var args = Array.prototype.slice.call(arguments, 1),
            method = this._methods[name];

        if (method) {
            return method.apply(this, args);
        } else {
            throw new Error('Priv method ' + name + ' was not found');
        }
    }

};

module.exports = Blocks;