/**
 * Created by Adir on 06/12/2014.
 */
var config = require('../config');

function RoutersManager(app) {
    var methods = {};

    methods.registerRouters = function() {
        config.features.forEach(function(feature) {
            var router = require('../features/' + feature + '/' + feature + '.router');
            app.use('/', router);
        });
    };

    return methods;
}

module.exports = RoutersManager;
