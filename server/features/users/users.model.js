/**
 * Created by Dean on 08/12/2014.
 */
var q = require('q');

var db = require('../../common/databaseManager').getConnection();
var collection = db.collection('users');

/*
 User:
 {
    _id: String (email),
    firstName: String,
    lastName: String,
    picture: String
 }
 */

var Users = {};

Users.findByEmail = function(email) {
    var deferred = q.defer();

    collection.findById(email, function(error, data) {
        if (data) {
            deferred.resolve(data);
        } else {
           deferred.resolve(false);
        }
    });

    return deferred.promise;
};

Users.addNewUser = function(user) {
    var deferred = q.defer();

    collection.insert(user, function(error, data) {
        if (data) {
            deferred.resolve(data);
        } else {
            deferred.reject(500);
        }
    });

    return deferred.promise;
};

module.exports = Users;
