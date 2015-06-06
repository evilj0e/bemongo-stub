module.exports = {
    passportAuth: function(req, res) {

    },

    passportCallback: function(req, res) {
        res.redirect('/');
    },

    login: function(req, res) {
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
    },

    logout: function(req, res) {
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
