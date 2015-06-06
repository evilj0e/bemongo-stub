var express  = require('express'),
    app      = express(),
    config   = require('./configs/default'),
    path     = require('path'),
    root     = path.join(__dirname, '..'),
    session  = require('express-session'),
    MongoStore = require('connect-mongo')(session),

    db       = require('./controllers/db'),
    auth     = require('./controllers/auth'),
    passport = require('./lib/passport');

module.exports = function(sock) {
    app.use(function(req, res, next) {
        console.log(req.method, req.url);
        next();
    });

    app.use(session({
        secret: 'goods',
        resave: true,
        saveUninitialized: true,
        proxy: true,
        store: new MongoStore({
            db: 'goods',
            url: 'mongodb://localhost:27017/goods/sessions'
        })
    }));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(express.static(path.join(root, 'static')));

    require('./middleware/express-bemView')(app, config.view);
    require('./router')(app);

    app.listen(sock);
    console.log('Start listening socket: ', sock);
};