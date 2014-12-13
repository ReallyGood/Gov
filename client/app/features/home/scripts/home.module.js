/**
 * Created by Adir on 12/12/2014.
 */
'use strict';

angular.module('Gov.Home', [])
    .config(function($stateProvider) {
        $stateProvider
            .state('home', {
                url: '/',
                controller: 'HomeCtrl as HomeCtrl',
                templateUrl: 'features/home/views/home.html',
                resolve: {
                    List: function(Lists) {
                        return Lists.getTopList().then(function(list) {
                            return list && list.roles.length ? list : Lists.getNewList();
                        });
                    }
                }
            });
    });
