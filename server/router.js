var index    = require('./controllers/index'),
    user     = require('./controllers/user'),
    good     = require('./controllers/good'),

    db       = require('./controllers/db'),
    auth     = require('./controllers/auth'),

    ensureAuthanticated = require('./middleware/express-checkAuth');

module.exports = function (app) {
    app.get('/',               index.index);
    app.get('/goods',          good.index);
    app.get('/account',        ensureAuthanticated, user.index);
    app.get('/users',          ensureAuthanticated, user.users);

    // авторизация
    app.get('/login',          auth.passportLogin);
    app.get('/login/callback', auth.passportLoginCb);
    app.get('/logout',         auth.passportLogout);

    app.get('*', function (req, res) {
        res.sendStatus(404);
    });
};