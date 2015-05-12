var db = require('../lib/db');

module.exports = {

    getGoods: function(req, res) {
        user_id = req.query.user.split('/')[0];

        db.getUser(user_id, function(err, user) {
            page = user.profile.displayName + ' &mdash; ' + user.profile.name.familyName + '&nbsp;' + user.profile.name.givenName;

            db.getUserGoods(user_id, function(err, cursor) {
                cursor.toArray(function(err, arr) {

                    arr.forEach(function(item) {
                        page += '<br>' + item.content;
                    });

                    res.send(page);
                });
            });
        });
    },

    postGood: function(req, res) {
        par = req.query.s;

        res.send('set par=' + par);
    }
};