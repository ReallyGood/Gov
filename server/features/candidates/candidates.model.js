/**
 * Created by Adir on 06/12/2014.
 */
var q = require('q');

var db = require('../../common/databaseManager').getConnection();
var collection = db.collection('candidates');

/*
 Candidate:
 {
    name: String
 }
 */

var Candidates = {};

Candidates.getByName = function(name) {
    var deferred = q.defer();

    collection.find({name: new RegExp(name)}).toArray(function(error, data) {
        if (data) {
            deferred.resolve(data);
        } else {
            deferred.reject(500);
        }
    });

    return deferred.promise;
};

Candidates.add = function(name) {
    var deferred = q.defer();

    if (!name || typeof name !== 'string') {
        deferred.reject(400);
    } else {
        collection.insert({name: name}, function(error, data) {
            if (data) {
                deferred.resolve(data);
            } else {
                deferred.reject(500);
            }
        });
    }

    return deferred.promise;
};

Candidates.bulkAddNew = function(names) {
    if (!names || !Array.isArray(names)) return false;

    names.forEach(function(name) {
        collection.find({name: name}).toArray(function(error, data) {
            if (data && data.length === 0) {
                Candidates.add(name);
            }
        });
    });

    return true;
};

module.exports = Candidates;
