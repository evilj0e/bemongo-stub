var ensureAuthanticated = require('../middleware/express-checkAuth');

module.exports = {
    index: function(req, res) {
        ensureAuthanticated();

        var data = {
            user: req.user,
            language: 'ru'
        };

        res.render('index', data, function(err, html) {
            if (err) {
                res.send(500, err);
            } else {
                res.send(html);
            }
        });
    }
};