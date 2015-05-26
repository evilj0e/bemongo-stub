var db       = require('./controllers/db'),
    auth     = require('./controllers/auth'),
    passport = require('./lib/passport');

module.exports = function (app) {
    app.get('/', function(req, res) {
        res.render('index', {
            user: 'Vasya',
            language: 'ru'
        }, function(err, html) {
            if (err) {
                res.status(500);
            } else {
                res.send(html);
            }
        });
    });

    //some mongodb routes
    app.get('/get/',     db.getGoods);
    app.get('/post/',    db.postGood);
    app.get('/user/add', db.addUser);
    app.get('/user/',    db.getUsers);

    // auth routes
    app.get('/auth/', passport.authenticate('yandex'), auth.auth);
    app.get('/auth/yandex/callback', passport.authenticate('yandex', { failureRedirect: '/login' }), auth.callback);
};