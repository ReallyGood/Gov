/**
 * Created by Adir on 06/12/2014.
 */
'use strict';

(function() {
    angular.module('Gov.Lists').controller('ListCtrl', ListCtrl);

    function ListCtrl(List) {
        var self = this;

        function init() {
            self.list = List;
        }

        init();
    }
})();