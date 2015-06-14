var db = require('../lib/db');

module.exports = {

    getGoods: function(uid, needCount, cb) {
        db.getUserGoods(uid, function(cursor) {
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

    getUser: function(uid, cb) {
        uid && db.getUser(uid, cb);
    },

    getUsers: function(needCount, cb) {
        db.getUsers(function(cursor) {
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
    },

    getStats: function(cb) {
        db.getStats(cb);
    },

    addGood: function(uid, cb) {
        db.addUserGood(uid, cb);
    }
};
