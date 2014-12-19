/**
 * Created by Adir on 06/12/2014.
 */
'use strict';

(function() {
    var Config = {
        rest: {
            serverUrl: 'http://' + window.location.hostname + ':3030/'
        },
        paths: {
            views: '../views/'
        }
    };

    angular.module('Gov').constant('Config', Config);
})();