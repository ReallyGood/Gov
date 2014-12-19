/**
 * Created by Adir on 12/12/2014.
 */
'use strict';

(function() {
    angular.module('Gov').controller('HomeCtrl', HomeController);

    function HomeController(List, Candidates) {
        var self = this;

        function init() {
            self.list = List;
        }

        self.getMostPopularCandidates = function(role) {
            if (!role || !role.roleName) return;
            if (role.mostPopularCandidates && role.mostPopularCandidates.length) return;

            Candidates.getMostPopularCandidates(role.roleName).then(function(mostPopularCandidates) {
                role.mostPopularCandidates = mostPopularCandidates;
            });
        };

        init();
    }
})();
