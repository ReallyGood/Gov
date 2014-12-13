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
    roles: [Candidate]
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
            candidates.getByListId(id).then(function(roles) {
                var list = _.merge(data, {roles: roles});

                _.each(list.roles, function(role) {
                    delete role._id;
                    delete role.listId;
                });

                deferred.resolve(list);
            });
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
        var listDataOnly = _.omit(list, 'roles');
        var candidateList = list.roles;

        collection.insert(listDataOnly, function(error, data) {
            if (data) {
                var insertedList = data[0];
                candidates.addBulk(insertedList._id.toString(), candidateList).then(function(roles) {
                    if (roles) {
                        var completeList = _.merge(insertedList, {roles: roles});
                        deferred.resolve(completeList);
                    } else {
                        deferred.reject(500);
                    }
                });
            } else {
                deferred.reject(500);
            }
        });
    }

    return deferred.promise;
};

Lists.getTopList = function() {
    var deferred = q.defer();

    var list = {
        roles: []
    };

    candidates.getRoleList().then(function(roleList) {
        var promises = [];

        _.each(roleList, function(roleName) {
            var inlineDeferred = q.defer();

            candidates.getMostPopularCandidatesByRoleName(roleName).then(function(candidates) {
                var topCandidate = candidates[0];
                topCandidate.roleName = roleName;

                list.roles.push(topCandidate);
                inlineDeferred.resolve(topCandidate)
            });

            promises.push(inlineDeferred.promise);
        });

        q.all(promises).then(function() {
            deferred.resolve([list]);
        });
    });

    return deferred.promise;
};

module.exports = Lists;
