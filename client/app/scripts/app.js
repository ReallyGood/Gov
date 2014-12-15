'use strict';

angular.module('Gov', [
    // angular modules
    'ngAnimate',

    /// 3rd party
    'restangular',
    'ui.router',
    'ui.bootstrap',

    // features
    'Gov.Home',
    'Gov.Lists'
]).config(function($urlRouterProvider, RestangularProvider, Config) {
    RestangularProvider.setBaseUrl(Config.rest.serverUrl);
    RestangularProvider.setDefaultHttpFields({withCredentials: true});
    RestangularProvider.setRestangularFields({id: '_id'});

    $urlRouterProvider.otherwise('/');
});
