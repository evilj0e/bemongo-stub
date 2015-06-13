var db = require('../lib/db');

module.exports = {

    getGoods: function(uid, needCount, cb) {
        db.getUserGoods(uid, function(err, cursor) {
            cursor.toArray(function(err, arr) {
                var result = '';

                if (needCount === true || !arr.length) {
                    result = 'Всего товаров: ' + arr.length;
                } else {
                    result = arr;
                }

                cb(result);
            });
        });
    },

    postGood: function(req, res) {
        par = req.query.s;

        res.send('set par=' + par);
    },

    addUser: function(req, res) {
        data = req.query.name;

        db.addUser(data);

        res.send('set name = ' + data);
    },

    getUser: function(uid, cb) {
        uid && db.getUser(uid, cb)
    },

    getUsers: function(needCount, cb) {
        db.getUsers(function(err, cursor) {
            cursor.toArray(function(err, arr) {
                var result = '';

                if (needCount === true || !arr.length) {
                    result = 'Всего зарегистрировано пользователей: ' + arr.length;
                } else {
                    result = arr;
                }

                cb(result);
            });
        });
    }
};