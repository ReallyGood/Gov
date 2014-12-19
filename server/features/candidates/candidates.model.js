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
            var promises = [];

            data.forEach(function(candidate) {
                var inlineDeferred = q.defer();

                Candidates.countCandidateVotesForRoleName(candidate.candidateName, candidate.roleName).then(function(result) {
                    candidate.totalVotes = result.totalVotes;
                    inlineDeferred.resolve(candidate);
                });

                promises.push(inlineDeferred.promise);
            });

            q.all(promises).then(function() {
                deferred.resolve(data);
            });
        } else {
            deferred.reject(500);
        }
    });

    return deferred.promise;
};

Candidates.getByCandidateName = function(name) {
    var deferred = q.defer();

    var searchQuery = [
        {
            $match: {
                candidateName: new RegExp('^' + name)
            }
        },
        {
            $group: {
                _id: '$candidateName',
                totalVotes: {$sum: 1}
            }
        },
        {
            $sort: {
                totalVotes: -1,
                _id: 1
            }
        },
        {
            $limit: 5
        }
    ];

    collection.aggregate(searchQuery, function(error, data) {
        if (data) {
            var dataArray = _.map(data, function(item) {
                return item._id;
            });
            deferred.resolve(dataArray);
        } else {
            deferred.reject(500);
        }
    });

    return deferred.promise;
};

Candidates.getMostPopularCandidatesByRoleName = function(roleName) {
    var deferred = q.defer();

    var searchQuery = [
        {
            $match: {
                roleName: roleName
            }
        },
        {
            $group: {
                _id: '$candidateName',
                totalVotes: {$sum: 1}
            }
        },
        {
            $sort: {
                totalVotes: -1,
                _id: 1
            }
        },
        {
            $limit: 3
        }
    ];

    collection.aggregate(searchQuery, function(error, data) {
        if (data) {
            var mostPopularCandidates = _.each(data, function(candidate) {
                candidate.candidateName = candidate._id;
                delete candidate._id;
            });

            deferred.resolve(mostPopularCandidates);
        } else {
            deferred.reject(500);
        }
    });

    return deferred.promise;
};

Candidates.getRoleList = function() {
    var deferred = q.defer();

    var searchQuery = [
        {
            $group: {
                _id: '$roleName'
            }
        }
    ];

    collection.aggregate(searchQuery, function(error, data) {
        if (data) {
            var roleList = [];

            _.each(data, function(role) {
                roleList.push(role._id);
            });

            deferred.resolve(roleList);
        } else {
            deferred.reject(500);
        }
    });

    return deferred.promise;
};

Candidates.countCandidateVotesForRoleName = function(candidateName, roleName) {
    var deferred = q.defer();

    collection.find({candidateName: candidateName, roleName: roleName}).toArray(function(error, data) {
        if (data) {
            deferred.resolve({totalVotes: data.length});
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
        var candidateListWithoutEmptyCandidateNames = _.filter(candidateList, function(candidate) {
            return candidate.candidateName !== '';
        });
        var candidateListWithListIds = _.each(candidateListWithoutEmptyCandidateNames, function(candidate) {
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
