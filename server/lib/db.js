var Promise = require("bluebird"),
    MongoClient = Promise.promisifyAll(require('mongodb').MongoClient),

    db_users, db_goods;

MongoClient.connectAsync('mongodb://localhost:27017/goods-shelf')
    .then(function(db) {
        console.log("Connected to DB");

        db_users = db.collection('users');
        db_goods = db.collection('goods');
    })
    .catch(function(err) {
        console.log("I can't connect to DB. Is it running?");
        throw err;
    });

module.exports = {
    upsertUser: function(id, profile, cb) {
        db_users.update({ id: id }, { $set: { profile: profile }}, { upsert: true }, cb);
    },

    getUser: function(id, cb) {
        db_users.findOne({ id: id }, cb);
    },

    addUser: function(name) {
        db_users.insert({ name: name }, function(err, records) { console.log(records); });
    },

    getUsers: function(cb) {
        db_users.find({}, cb);
    },

    getUserGoods: function(id, cb) {
        var params = id !== undefined ? { "uid": id } : {};

        db_goods.find(params, cb);
    }
};
