module.exports = {

    get: function(req, res) {
        res.send(req.query)
    },

    post: function(req, res) {
        res.send(req.query)
    }
};