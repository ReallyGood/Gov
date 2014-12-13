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
                        return Lists.getAll().then(function(lists) {
                            return Lists.getListById(lists[0]._id)
                        });
                    }
                }
            });
    });
