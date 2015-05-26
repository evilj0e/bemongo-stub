var express = require('express'),
    app = express(),
    path = require('path'),
    root = path.join(__dirname, '..'),

    db = require('./controllers/db'),

    auth = require('./controllers/auth'),
    passport = require('./lib/passport');

module.exports = function(sock) {
    require('./middleware/express-bemView')(app, {
        templateRoot: path.join(root, 'static'),
        bundleName: 'desktop',
        availableBundles: ['desktop'],
        languageId: 'ru'
    });
    app.use(passport.initialize());
    app.use(passport.session());

    //logger
    app.use(function(req, res, next) {
        console.log(req.method, req.url);
        next();
    });

    app.get('/', function(req, res, next) {
        res.render('index', {
            user: 'Vasya',
            language: 'ru'
        }, function(err, html) {
            if (err) {
                res.send(500, err);
            } else {
                res.send(html);
            }
        });
    });

    //some mongodb routes
    app.get('/get/', db.getGoods);
    app.get('/post/', db.postGood);
    app.get('/user/add', db.addUser);
    app.get('/user/', db.getUsers);
    // auth routes
    app.get('/auth/', passport.authenticate('yandex'), auth.auth);
    app.get('/auth/yandex/callback', passport.authenticate('yandex', { failureRedirect: '/login' }), auth.callback);

    app.listen(sock);
    console.log('Start listening socket: ', sock);
};