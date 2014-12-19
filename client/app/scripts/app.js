'use strict';

angular.module('Gov', [
    'ngAnimate',
    'restangular',
    'ui.router',
    'ui.bootstrap'
]).config(function($urlRouterProvider, $stateProvider, RestangularProvider, Config) {
    RestangularProvider.setBaseUrl(Config.rest.serverUrl);
    RestangularProvider.setDefaultHttpFields({withCredentials: true});
    RestangularProvider.setRestangularFields({id: '_id'});

    $stateProvider
        .state('home', {
            url: '/',
            controller: 'ListCtrl as ListCtrl',
            templateUrl: Config.paths.views + 'home.html',
            resolve: {
                List: function(Lists) {
                    return Lists.getTopList().then(function(list) {
                        return list && list.roles.length ? list : Lists.getNewList();
                    });
                }
            }
        })
        .state('list', {
            url: '/lists/:id',
            controller: 'ListCtrl as ListCtrl',
            templateUrl: function($stateParams) {
                return  Config.paths.views + ($stateParams.id ? 'list.html' : 'new-list.html');
            },
            resolve: {
                List: function($stateParams, Lists) {
                    return $stateParams.id ? Lists.getListById($stateParams.id) : Lists.getNewList();
                }
            }
        });

    $urlRouterProvider.otherwise('/');
});
