var configs = require('../configs/default'),
    db = require('./db');

module.exports = {
    index: function(req, res, next) {
        var data = configs.defaults(req),
            render = function() {
                return res.render('index', data, function(err, html) {
                    if (err) {
                        res.send(500, err);
                    } else {
                        res.send(html);
                    }
                });
            };

        db.getStats(function(stats) {
            data.main += 'Всего зарегистрировано: ' + stats[0] + '. Всего товаров: ' + stats[1] + '.';

            render();
        });
    }
};