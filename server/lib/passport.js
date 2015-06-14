var passport = require('passport'),
    PassportYandex = require('passport-yandex').Strategy,
    db = require('../lib/db');

PassportYandex.prototype.authorizationParams = function() {
    return {
        state: process.env.SUDO_USER
    };
};

passport.use(new PassportYandex({
        clientID: '--- Client ID ---',
        clientSecret: '--- Client secret ---',
        callbackURL: 'http://localhost:3000/login/callback'
    },
    function(accessToken, refreshToken, profile, done) {
        process.nextTick(function () {
            db.upsertUser(profile.id, profile, done);
        });
    }
));

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    db.getUser(id, done);
});

module.exports = passport;