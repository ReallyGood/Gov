/**
 * Created by Adir on 12/12/2014.
 */
'use strict';

(function() {
    angular.module('Gov').controller('HomeCtrl', HomeController);

    function HomeController(List) {
        var self = this;

        function init() {
            self.list = List;
        }

        init();
    }
})();
