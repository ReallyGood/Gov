/**
 * Created by Adir on 06/12/2014.
 */
'use strict';

(function() {
    var Config = {
        rest: {
            serverUrl: 'http://localhost:3000/'
        }
    };

    angular.module('Gov').constant('Config', Config);
})();