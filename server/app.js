var express = require('express'),
    app = express(),
    db = require('./controllers/db'),

    path = require('path'),
    root = path.join(__dirname, '..');

module.exports = function(sock) {
    require('./middleware/express-bemView')(app, {
        templateRoot: path.join(root, 'static'),
        // параметры по умолчанию
        bundleName: 'desktop',
        availableBundles: ['desktop'],
        languageId: 'ru'
    });

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

    app.listen(sock);
    console.log('Start listening socket: ', sock);
};