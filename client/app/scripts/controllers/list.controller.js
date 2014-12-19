/**
 * Created by Adir on 06/12/2014.
 */
'use strict';

(function() {
    angular.module('Gov').controller('ListCtrl', ListCtrl);

    function ListCtrl($state, $window, List, Lists, Candidates) {
        var self = this;

        function init() {
            self.list = List;
            self.getCandidates = Candidates.getCandidates;
        }

        self.saveList = function(list) {
            if ($window.confirm('האם ברצונך לשמור את הרשימה?')) {
                Lists.saveList(list).then(function(result) {
                    $state.go('list', {id: result._id});
                });
            }
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
