/**
 * Created by Adir on 06/12/2014.
 */
'use strict';

(function() {
    angular.module('Gov').service('Lists', Lists);

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

        this.isEmpty = function(list) {
            return list.roles.every(function(role) {
                return role.candidateName === ''
            });
        };


        this.saveList = function(list) {
            return ListsResource.post(list);
        };

        this.shareList = function(list) {
            var deferred = $q.defer();

            if (!list || !list.roles || !list.roles.length) {
                deferred.reject();
            } else {
                var name = '';
                name += 'אני בחרתי ב';
                name += list.roles[0].candidateName;
                name += ' להיות ';
                name += list.roles[0].roleName;

                FB.ui({
                    link: window.location.protocol + '//' + window.location.host + '/#/lists/' + list._id,
                    name: name,
                    caption: 'בוא תבחר את הממשלה האולטימטיבית שלך',
                    method: 'feed',
                    app_id: 1382830152012842
                }, deferred.resolve);
            }

            return deferred.promise;
        };
    }
})();
