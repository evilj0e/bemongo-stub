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

    //some mongodb routes
    app.get('/get/', db.getGoods);
    app.get('/post/', db.postGood);
    app.get('/user/add', db.addUser);
    app.get('/user/', db.getUsers);

    app.listen(sock);
    console.log('Start listening socket: ', sock);
};