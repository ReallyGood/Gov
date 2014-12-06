/**
 * Created by Adir on 06/12/2014.
 */
'use strict';

angular.module('Gov.Lists',[])
    .config(function($stateProvider) {
        $stateProvider
            .state('list', {
                url: '/lists/:id',
                controller: 'ListCtrl as ListCtrl',
                templateUrl: 'features/lists/views/list.html',
                resolve: {
                    List: function($stateParams, Lists) {
                        return Lists.getList($stateParams.id);
                    }
                }
            });
    });