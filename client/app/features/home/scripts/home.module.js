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
                        // TODO: implement top list
                        return Lists.getListById('548604c180d8de3e3145d414');
                    }
                }
            });
    });
