var MongoClient = require('mongodb').MongoClient,
    vow = require('vow'),

    db_goods, db_users, users;

MongoClient.connect('mongodb://localhost:27017/goods-shelf', function(err, db) {
	if (err) {
        console.log("I can't connect to DB. Is it running?");
        throw err;
    }

    console.log("Connected to DB");

    db_users = db.collection('users');
	db_goods = db.collection('goods');
});

module.exports = {
    upsertUser: function(id, profile, clb) {
        db_users.update({ id: id }, { $set: { profile: profile }}, { upsert: true }, clb);
    },

    getUser: function(id, clb) {
        db_users.findOne({ id: id }, clb);
    },

    addUser: function(name)
    {
        db_users.insert({ name: name }, function(err, records) { console.log(records); });
    },

    getUsers: function(clb)
    {
        db_users.find({}, clb);
    }
};
