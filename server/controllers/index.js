var configs = require('../configs/default');

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

        render();
    }
};