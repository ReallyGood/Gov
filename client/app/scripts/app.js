'use strict';

angular.module('Gov', [
    // angular modules
    'ngAnimate',

    /// 3rd party
    'restangular',
    'ui.router',

    // features
    'Gov.Lists'
]).config(function($urlRouterProvider, $stateProvider, RestangularProvider, Config) {
    RestangularProvider.setBaseUrl(Config.rest.serverUrl);
    RestangularProvider.setRestangularFields({id: '_id'});

    $stateProvider
        .state('home', {
            url: '/',
            templateUrl: 'views/home.html'
        });

    $urlRouterProvider.otherwise('/');
});
