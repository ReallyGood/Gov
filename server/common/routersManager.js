/**
 * Created by Adir on 06/12/2014.
 */
var config = require('../config');

function RoutersManager(app) {
    var methods = {};

    methods.registerRouters = function() {
        config.features.forEach(function(feature) {
            app.use('/', require('./../features/' + feature + '/router'));
        });
    };

    return methods;
}

module.exports = RoutersManager;
