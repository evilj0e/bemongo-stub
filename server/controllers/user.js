var configs = require('../configs/default'),
    db      = require('./db');

module.exports = {
    index: function(req, res) {
        var data = configs.defaults(req),
            render = function() {
                return res.render('index', data, function(err, html) {
                    if (err) {
                        res.send(500, err);
                    } else {
                        res.send(html);
                    }
                });
            };

        data.contentType = 'user';

        db.getUser(req.user.id, function (err, user) {
            data.user = user;
            render();
        });
    },

    users: function(req, res) {
        var data = configs.defaults(req),
            render = function() {
                return res.render('index', data, function(err, html) {
                    if (err) {
                        res.send(500, err);
                    } else {
                        res.send(html);
                    }
                });
            };

        data.contentType = 'users';

        db.getUsers(false, function (result) {
            data.users = result;
            render();
        }, true);
    }
};
