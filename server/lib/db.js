var promise = require('bluebird'),
    mongo = require('mongobird'),
    connection = mongo.connect('mongodb://localhost:27017').getDb('goods-shelf'),

    db_users = connection.getCollection('users'),
    db_goods = connection.getCollection('goods');

    module.exports = {
        upsertUser: function(id, profile, cb) {
            db_users.update({ id: id }, { $set: { profile: profile }}, { upsert: true })
                .then(function() {
                    cb(null, profile);
                })
                .catch(function() {
                    console.log(':(');
                });
        },

        getUser: function(id, cb) {
            db_users.findOne({ id: id })
                .then(function(data) {
                    cb(null, data.profile);
                })
                .catch(function() {
                    console.log(':(');
                });
        },

        addUser: function(name) {
            db_users.insert({ name: name })
                .then(function(records) {
                    console.log(records);
                })
                .catch(function(err) {
                    throw(err);
                });
        },

        getUsers: function(cb) {
            db_users.find({})
                .then(cb)
                .catch(function(err) {
                throw(err);
            });
        },

        getUserGoods: function(id, cb) {
            var params = id !== undefined ? { 'uid': id } : {};

            db_goods.find(params)
                .then(cb)
                .catch(function(err) {
                    throw(err);
                });
        },

        getStats: function(cb) {
            promise.all([
                db_users.count(),
                db_goods.count()
            ])
                .then(function(data) { cb(data); })
                .catch(function(err) { throw(err); });
        }

        //data.forEach(function(item) {
        //    if(item.isFulfilled()){
        //        item.value().toArray(function(err, arr) {
        //            console.log(arr);
        //        });
        //    } else {
        //        console.log(item.reason());
        //    }
        //});
        //
        //console.log(result);
    };
