/**
 * Created by Adir on 06/12/2014.
 */
function RoutersManager(app) {
	var methods = {};
	var routers = ['lists'];

	methods.registerRouters = function() {
		routers.forEach(function(router) {
			app.use('/', require('./' + router));
		});
	};

	return methods;
}

module.exports = RoutersManager;
