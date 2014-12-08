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

function countMostPopularCandidates(candidates) {
    var mostPopular = [];

    var obj = candidates.reduce(function(arr, curr) {
        if (_.isUndefined(arr[curr])) {
            arr[curr] = 1;
        } else {
            arr[curr] += 1;
        }
        return arr;
    }, {});

    for (var candidate in obj) {
        if (!obj.hasOwnProperty(candidate)) continue;
        mostPopular.push({
            name: candidate,
            count: obj[candidate]
        });
    }

    mostPopular.sort(function(a,b) {
        return b.count -a.count;
    });

    return mostPopular.splice(0, 5);
}

Lists.getMostPopularCandidatesByRoleName = function(roleName) {
    var deferred = q.defer();

    collection.find({'roles.roleName': roleName}).toArray(function(error, data) {
        var selectedRoleCandidates = [];

        if (data) {
            data.forEach(function(list) {
                list.roles.some(function(role) {
                    if (role.roleName === roleName) {
                        return selectedRoleCandidates.push(role.ministerName);
                    }
                });
            });

            deferred.resolve(countMostPopularCandidates(selectedRoleCandidates));
        } else {
            deferred.reject(500);
        }
    });

    return deferred.promise;
};

module.exports = Lists;
