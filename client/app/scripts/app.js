'use strict';

angular
    .module('Gov', [
        // angular modules
        'ngAnimate',
        //'ngCookies',
        //'ngSanitize',
        //'ngTouch',
        //'ngRoute',

        /// 3rd party
        'restangular',
        'ui.router',
        //'ui.bootstrap',

        // features
        'Gov.Lists'
    ]).config(function(RestangularProvider, Config) {
        RestangularProvider.setBaseUrl(Config.rest.serverUrl);
    }).config(['$stateProvider', '$urlRouterProvider',
        function($stateProvider, $urlRouterProvider) {
            $urlRouterProvider.otherwise("/main");
            $stateProvider
            .state('main', {
                url: "/main",
                templateUrl: "views/main.html"
            });
        }]);
