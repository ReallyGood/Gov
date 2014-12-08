/**
 * Created by Adir on 06/12/2014.
 */
'use strict';

(function() {
    angular.module('Gov.Lists').controller('ListCtrl', ListCtrl);

    function ListCtrl(List, Lists, Candidates) {
        var self = this;

        function init() {
            self.list = List;

            self.saveList = Lists.saveList;
            self.getCandidates = Candidates.getCandidates;
        }

        init();
    }
})();
