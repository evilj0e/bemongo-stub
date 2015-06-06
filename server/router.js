var index    = require('./controllers/index'),
    user  = require('./controllers/user'),

    db       = require('./controllers/db'),
    auth     = require('./controllers/auth'),
    passport = require('./lib/passport');

module.exports = function (app) {
    app.get('/',        index.index);

    // авторизация
    app.get('/login',   auth.login);
    app.get('/logout',  auth.logout);
    app.get('/account', user.index);

    // паспорт
    app.get('/auth',
        passport.authenticate('yandex'),
        auth.passportAuth);
    app.get('/auth/yandex/callback',
        passport.authenticate('yandex', { failureRedirect: '/login' }),
        auth.passportCallback);

    //some mongodb routes
    app.get('/get/',     db.getGoods);
    app.get('/post/',    db.postGood);
    app.get('/user/add', db.addUser);
    app.get('/user/',    db.getUsers);

    app.get('*', function (req, res) {
        res.send(404);
    });
};