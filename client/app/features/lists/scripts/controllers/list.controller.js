/**
 * Created by Adir on 06/12/2014.
 */
'use strict';

(function() {
    angular.module('Gov.Lists').controller('ListCtrl', ListCtrl);

    function ListCtrl($state, List, Lists, Candidates) {
        var self = this;

        function init() {
            self.list = List;

            self.getCandidates = Candidates.getCandidates;
        }

        self.saveList = function(list) {
            return Lists.saveList(list).then(function(result) {
                $state.go('list', {id: result._id});
                return result;
            });
        };

        init();
    }
})();
