var configs = require('../configs/default'),
    db      = require('../lib/db');

module.exports = {
    index: function(req, res, next) {
        var data = configs.defaults(req);

        //TODO: Промисы для монги
        data.contentType = req.route.path === '/account' ? 'user' : data.contentType;
        data.contentType === 'user' && db.getUser(req.user.id, function (err, user) {
            data.user = user;
        });

        res.render('index', data, function(err, html) {
            if (err) {
                res.send(500, err);
            } else {
                res.send(html);
            }
        });
    }
};