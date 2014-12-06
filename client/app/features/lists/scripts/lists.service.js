/**
 * Created by Adir on 06/12/2014.
 */
'use strict';

(function() {
    angular.module('Gov').service('Lists', Lists);

    function Lists(Config, $resource) {
        var ListResource = $resource(Config.rest.serverUrl + '/lists/:id', {id: '@id'});

        this.getList = function(id) {
            return ListResource.get({id: id});
        }
    }
})();