var express = require('express'),
    app = express(),
    db = require('./controllers/db');

module.exports = function(sock) {

    //logger
    app.use(function(req, res, next) {
        console.log(req.method, req.url);
        next();
    });

    app.get('/', function(req, res, next) {
        res.send('Sup, man!');
    });

    app.get('/get/', db.get);
    app.get('/post/', db.post);

    app.listen(sock);
    console.log('Start listening socket: ', sock);
};