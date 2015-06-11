var index    = require('./controllers/index'),

    db       = require('./controllers/db'),
    auth     = require('./controllers/auth'),
    passport = require('./lib/passport'),

    ensureAuthanticated = require('./middleware/express-checkAuth');

module.exports = function (app) {
    app.get('/',               index.index);
    app.get('/goods',          index.index);
    app.get('/account',        ensureAuthanticated, index.index);
    app.get('/users',          ensureAuthanticated, index.index);

    // авторизация
    app.get('/login',          passport.authenticate('yandex'));
    app.get('/login/callback', passport.authenticate('yandex', { failureRedirect: '/login' }), auth.passportLoginCb);
    app.get('/logout',         auth.passportLogout);


    //some mongodb routes
    //app.get('/get/',     db.getGoods);
    //app.get('/post/',    db.postGood);
    //app.get('/user/add', db.addUser);
    //app.get('/users/',   db.getUsers);

    app.get('*', function (req, res) {
        res.send(404);
    });
};