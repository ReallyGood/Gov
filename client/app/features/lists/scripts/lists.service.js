/**
 * Created by Adir on 06/12/2014.
 */
'use strict';

(function() {
    angular.module('Gov.Lists').service('Lists', Lists);

    function Lists(Restangular) {
        var ListResource = Restangular.service('lists');

        this.getList = function(id) {
            return ListResource.one(id).get();
        }
    }
})();