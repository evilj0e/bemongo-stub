var configs = require('../configs/default');

module.exports = {
    index: function(req, res, next) {
        var data = configs.defaults(req);

        data.isAccount = req.route.path === '/account';

        res.render('index', data, function(err, html) {
            if (err) {
                res.send(500, err);
            } else {
                res.send(html);
            }
        });
    }
};