function ensureAuthenticated(req, res) {
    if (req.isAuthenticated()) {
        return;
    }

    res.redirect('/login')
}

module.exports = ensureAuthenticated;