/**
 * Created by Adir on 06/12/2014.
 */
var q = require('q');
var _ = require('lodash');

var db = require('../../common/databaseManager').getConnection();
var collection = db.collection('lists');

var candidates = require('../candidates/candidates.model');

/*
 List:
 {
    roles: [Role]
 }

 Role:
 {
    roleName: String
    ministerName: String
 }
 */

var Lists = {};

Lists.getAll = function() {
    var deferred = q.defer();

    collection.find().toArray(function(error, data) {
        if (data) {
            deferred.resolve(data);
        } else {
            deferred.reject(500);
        }
    });

    return deferred.promise;
};

Lists.getById = function(id) {
    var deferred = q.defer();

    collection.findById(id, function(error, data) {
        if (data) {
            deferred.resolve(data);
        } else {
            deferred.reject(500);
        }
    });

    return deferred.promise;
};

Lists.add = function(list) {
    var deferred = q.defer();

    if (!list || typeof list !== 'object') {
        deferred.reject(400);
    } else {
        collection.insert(list, function(error, data) {
            if (data) {
                // add new candidates
                var candidateList = _.pluck(list.roles, 'ministerName');
                candidates.bulkAddNew(candidateList);

                deferred.resolve(data);
            } else {
                deferred.reject(500);
            }
        });
    }

    return deferred.promise;
};

// TODO: doesn't works yet!
Lists.getMostPopularCandidatesByRoleName = function(roleName) {
    var deferred = q.defer();

    var searchQuery = [
        {
            $match: {
                'roles.roleName': {$eq: roleName}
            }
        },
        {
            $group: {
                _id: '$roles.ministerName',
                total: {$sum: 1}
            }
        },
        {
            $sort: {total: -1}
        }
    ];

    collection.aggregate(searchQuery, function(error, data) {
        if (data) {
            deferred.resolve(data);
        } else {
            deferred.reject(500);

        }
    });

    return deferred.promise;
};

module.exports = Lists;
