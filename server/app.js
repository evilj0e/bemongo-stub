var express  = require('express'),
    app      = express(),
    config   = require('./configs/default'),
    path     = require('path'),
    root     = path.join(__dirname, '..'),

    db       = require('./controllers/db'),
    auth     = require('./controllers/auth'),
    passport = require('./lib/passport');

module.exports = function(sock) {
    app.use(function(req, res, next) {
        console.log(req.method, req.url);
        next();
    });
    app.use(express.static(path.join(root, 'static')));

    app.use(passport.initialize());
    app.use(passport.session());

    require('./middleware/express-bemView')(app, config.view);
    require('./router')(app);

    app.listen(sock);
    console.log('Start listening socket: ', sock);
};