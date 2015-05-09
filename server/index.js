var express = require('express'),
    path = require('path'),
    fs = require('fs'),
    app = express();

app.get('/', function(req, res, next) {
   res.send('Sup, man!');
});

var sock = path.join(__dirname, 'run', 'index.sock');
fs.unlinkSync(sock);
console.log(sock);
app.listen(sock);