/**
 * Created by Adir on 06/12/2014.
 */
var config 			= require('../config');
var passport 		= require('passport');
var passportManager = require('./passportManager');

function RoutersManager(app) {
    var methods = {};

    methods.initializePassport = function(){
	    app.use(passport.initialize());
		app.use(passport.session());
		passportManager(passport);
    }

    methods.registerRouters = function() {
        config.features.forEach(function(feature) {
            var router = require('../features/' + feature + '/' + feature + '.router');
            app.use('/', router);
        });
    };

    return methods;
}

module.exports = RoutersManager;
