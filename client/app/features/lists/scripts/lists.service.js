/**
 * Created by Adir on 06/12/2014.
 */
'use strict';

(function() {
    angular.module('Gov.Lists').service('Lists', Lists);

    function Lists($q, Restangular, Roles) {
        var ListsResource = Restangular.service('lists');

        this.getListById = function(id) {
            return ListsResource.one(id).get();
        };

        this.getNewList = function() {
            var deferred = $q.defer();

            var newList = {
                roles: []
            };

            Roles.forEach(function(role) {
                newList.roles.push({
                    roleName: role,
                    ministerName: ''
                });
            });

            deferred.resolve(newList);

            return deferred.promise;
        };

        this.saveList = function(list) {
          return ListsResource.post(list);
        };
    }
})();