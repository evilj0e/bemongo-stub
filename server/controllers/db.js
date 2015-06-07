var db = require('../lib/db');

module.exports = {

    getGoods: function(req, res) {
        var user_id = (req.query.user && req.query.user.split('/')[0]) || req.user.id;

        db.getUser(user_id, function(err, user) {
            var page = user.name;

            db.getUserGoods(user_id, function(err, cursor) {
                cursor.toArray(function(err, arr) {

                    arr.forEach(function(item) {
                        page += '<br>' + item.content;
                    });

                    res.send(page);
                });
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

    getUsers: function(req, res) {
        db.getUsers(function(err, cursor)
        {
            cursor.toArray(function(err, arr) {
                var result = '';

                arr.forEach(function(user) {
                    result += JSON.stringify(user, null, 2);
                });

                res.end(result);
            });
        });
    }
};