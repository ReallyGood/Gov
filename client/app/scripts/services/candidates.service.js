/**
 * Created by Adir on 08/12/2014.
 */
'use strict';

(function() {
    angular.module('Gov').service('Candidates', Candidates);

    function Candidates(Restangular) {
        var CandidatesResource = Restangular.service('candidates');

        this.getCandidates = function(name) {
            return CandidatesResource.getList({candidateName: name});
        };

        this.getMostPopularCandidates = function(roleName) {
            return CandidatesResource.getList({roleName: roleName});
        };
    }
})();
