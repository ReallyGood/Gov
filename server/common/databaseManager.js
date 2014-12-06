/**
 * Created by Adir on 06/12/2014.
 */
var mongoskin = require('mongoskin');

function DatabaseManager() {
	var methods = {};

	var connection = mongoskin.db('mongodb://localhost:27017/gov');

	methods.getConnection = function() {
		return connection;
	};

	return methods;
}

module.exports = DatabaseManager();
