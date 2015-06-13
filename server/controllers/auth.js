var passport = require('../lib/passport');

module.exports = {
    passportLoginCb: [
        passport.authenticate('yandex', { failureRedirect: '/login' }),
        function(req, res) {
            res.redirect('/');
        }
    ],

    passportLogout: function(req, res) {
        req.logout();
        res.redirect('/');
    },

    passportLogin: [
        passport.authenticate('yandex')
    ]
};
