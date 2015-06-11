module.exports = {
    passportLoginCb: function(req, res) {
        res.redirect('/account');
    },

    passportLogout: function(req, res) {
        req.logout();
        res.redirect('/');
    }
};
