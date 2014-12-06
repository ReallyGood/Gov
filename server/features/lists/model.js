/**
 * Created by Adir on 06/12/2014.
 */
var q = require('q');

var db = require('../../common/databaseManager').getConnection();
var collection = db.collection('lists');

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

	console.log(list);

	if (!list || typeof list !== 'object') {
		deferred.reject(400);
	} else {
		collection.insert(list, function(error, data) {
			if (data) {
				deferred.resolve(data);
			} else {
				deferred.reject(500);
			}
		});
	}

	return deferred.promise;
};

module.exports = Lists;
