var configs = require('../configs/default'),
    db      = require('./db');

module.exports = {
    index: function(req, res, next) {
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

        data.contentType = 'userGoods';

        db.getGoods(req.user.id, false, function (result) {
            data.userGoods = result;
            render();
        });
    },

    users: function(req, res, next) {
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

        db.getUsers(false, function(result) {
            data.users = result;
            render();
        }, true);
    }
};