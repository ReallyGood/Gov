/**
 * Created by Adir on 08/12/2014.
 */
'use strict';

(function() {
    angular.module('Gov.Lists').service('Candidates', Candidates);

    function Candidates(Restangular) {
        var CandidatesResource = Restangular.service('candidates');

        this.getCandidates = function(name) {
            return CandidatesResource.getList({name: name});
        };
    }
})();
