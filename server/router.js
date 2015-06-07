var index    = require('./controllers/index'),

    db       = require('./controllers/db'),
    auth     = require('./controllers/auth'),
    passport = require('./lib/passport');

module.exports = function (app) {
    app.get('/',        index.index);
    app.get('/account', index.index);
    app.get('/goods',   index.index);
    app.get('/users',   index.index);

    // авторизация
    app.get('/login',   function(req, res) { res.redirect('/auth') });
    app.get('/auth',
        passport.authenticate('yandex'),
        auth.passportAuth);
    app.get('/auth/yandex/callback',
        passport.authenticate('yandex', { failureRedirect: '/auth' }),
        auth.passportCallback);

    //some mongodb routes
    //app.get('/get/',     db.getGoods);
    //app.get('/post/',    db.postGood);
    //app.get('/user/add', db.addUser);
    //app.get('/users/',   db.getUsers);

    app.get('*', function (req, res) {
        res.send(404);
    });
};