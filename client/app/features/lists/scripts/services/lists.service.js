/**
 * Created by Adir on 06/12/2014.
 */
'use strict';

(function() {
    angular.module('Gov.Lists').service('Lists', Lists);

    function Lists($q, Restangular, Roles) {
        var ListsResource = Restangular.service('lists');

        function sortRoles(a, b) {
            return Roles.indexOf(a.roleName) - Roles.indexOf(b.roleName);
        }

        this.getListById = function(id) {
            return ListsResource.one(id).get();
        };

        this.getTopList = function() {
            return ListsResource.getList({special: 'topList'}).then(function(list) {
                list = list[0];
                list.roles.sort(sortRoles);

                return list;
            });
        };

        this.getNewList = function() {
            var deferred = $q.defer();

            var newList = {
                roles: []
            };

            Roles.forEach(function(role) {
                newList.roles.push({
                    roleName: role,
                    candidateName: ''
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
