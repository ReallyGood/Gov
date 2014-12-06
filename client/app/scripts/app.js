'use strict';

angular
    .module('Gov', [
        // angular modules
        'ngAnimate',
        'ngCookies',
        'ngSanitize',
        'ngTouch',

        /// 3rd party
        'restangular',
        'ui.router',

        // features
        'Gov.Lists'
    ]).config(function(RestangularProvider, Config) {
        RestangularProvider.setBaseUrl(Config.rest.serverUrl);
    });
