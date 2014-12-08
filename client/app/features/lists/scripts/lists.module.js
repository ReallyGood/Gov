/**
 * Created by Adir on 06/12/2014.
 */
'use strict';

angular.module('Gov.Lists', [])
    .config(function($stateProvider) {
        $stateProvider
            .state('list', {
                url: '/lists/:id',
                controller: 'ListCtrl as ListCtrl',
                templateUrl: function($stateParams) {
                    return $stateParams.id ? 'features/lists/views/list.html' : 'features/lists/views/new-list.html';
                },
                resolve: {
                    List: function($stateParams, Lists) {
                        return $stateParams.id ? Lists.getListById($stateParams.id) : Lists.getNewList();
                    }
                }
            });
    });
