/**
 * Created by Adir on 16/12/2014.
 */
'use strict';

(function() {
    angular.module('Gov').service('Authentication', Authentication);

    function Authentication(Restangular, Config) {
        var loggedinResource = Restangular.one('loggedin');
        var logoutResource = Restangular.one('logout');

        this.getLoginUrl = function() {
            return Config.rest.serverUrl + 'auth/facebook/login';
        };

        this.getUser = function() {
            return loggedinResource.get();
        };

        this.logout = function() {
            return logoutResource.get();
        };
    }
})();
