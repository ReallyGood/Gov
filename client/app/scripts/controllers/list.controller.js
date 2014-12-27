/**
 * Created by Adir on 06/12/2014.
 */
'use strict';

(function() {
    angular.module('Gov').controller('ListCtrl', ListCtrl);

    function ListCtrl($state, $window, List, Lists, Candidates, Authentication) {
        var self = this;

        function init() {
            self.list = List;
            self.getCandidates = Candidates.getCandidates;
        }

        self.buildAList = function(user) {
            if (!user) {
                $window.location.href = Authentication.getLoginUrl();
            } else {
                $state.go('list');
            }
        };

        self.saveList = function(list) {
            if (Lists.isEmpty(list)) return $window.alert('לא ניתן לשמור רשימה ריקה');

            Lists.saveList(list).then(function(result) {
                $state.go('list', {id: result._id});
            });
        };

        self.getMostPopularCandidates = function(role) {
            if (!role || !role.roleName) return;
            if (role.mostPopularCandidates && role.mostPopularCandidates.length) return;

            return Candidates.getMostPopularCandidates(role.roleName).then(function(mostPopularCandidates) {
                role.mostPopularCandidates = mostPopularCandidates;
                return mostPopularCandidates;
            });
        };

        self.shareList = function(list) {
            return Lists.shareList(list);
        };

        init();
    }
})();
