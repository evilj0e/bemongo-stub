var path = require('path'),

    fs = require('fs'),
    app = require('./app');

var sock = path.join(__dirname, 'run', 'index.sock');
if (fs.existsSync(sock)) {
    console.log('unlink socket :(');
    fs.unlinkSync(sock);
}

app(sock);