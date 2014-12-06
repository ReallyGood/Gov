/**
 * Created by Adir on 06/12/2014.
 */
'use strict';

(function() {
    angular.module('Gov').controller('ListCtrl', ListCtrl);

    function ListCtrl(Lists) {

        Lists.getList()
    }
})();