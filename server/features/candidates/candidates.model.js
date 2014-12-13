/**
 * Created by Adir on 06/12/2014.
 */
var q = require('q');
var _ = require('lodash');

var db = require('../../common/databaseManager').getConnection();
var collection = db.collection('candidates');

/*
 Candidate:
 {
    roleName: String
    candidateName: String
    listId: String
 }
 */

var Candidates = {};

Candidates.getByListId = function(listId) {
    var deferred = q.defer();

    collection.find({listId: listId}).toArray(function(error, data) {
        if (data) {
            deferred.resolve(data);
        } else {
            deferred.reject(500);
        }
    });

    return deferred.promise;
};

Candidates.getByCandidateName = function(name) {
    var deferred = q.defer();

    collection.find({candidateName: new RegExp(name)}).toArray(function(error, data) {
        if (data) {
            deferred.resolve(data);
        } else {
            deferred.reject(500);
        }
    });

    return deferred.promise;
};

Candidates.addBulk = function(listId, candidateList) {
    var deferred = q.defer();

    if (!listId || typeof listId !== 'string') {
        deferred.reject(400);
    } else if (!candidateList || !Array.isArray(candidateList)) {
        deferred.reject(400);
    } else {
        var candidateListWithListIds = _.each(candidateList, function(candidate) {
            candidate.listId = listId;
        });

        collection.insert(candidateListWithListIds, function(error, data) {
            if (data) {
                deferred.resolve(data);
            } else {
                deferred.reject(500);
            }
        });
    }

    return deferred.promise;
};

module.exports = Candidates;
