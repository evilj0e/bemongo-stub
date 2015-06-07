var ensureAuthanticated = require('../middleware/express-checkAuth'),
    configs = require('../configs/default');

module.exports = {
    index: function(req, res, next) {
        var data = configs.defaults(req);

        data.isAccount = req.route.path === '/account';
        data.isAccount && ensureAuthanticated(req, res, next);

        res.render('index', data, function(err, html) {
            if (err) {
                res.send(500, err);
            } else {
                res.send(html);
            }
        });
    }
};