/**
 * Created by Adir on 12/12/2014.
 */
'use strict';

(function() {
    angular.module('Gov').controller('MainCtrl', MainController);

    function MainController(Authentication, $state) {
        var self = this;

        function init() {
            self.loginUrl = Authentication.getLoginUrl();
            self.getUser();
        }

        self.getUser = function() {
            Authentication.getUser().then(function(user) {
                self.user = user;
            });
        };

        self.logout = function() {
            Authentication.logout().then(function() {
                self.user = null;
                $state.go('home');
            });
        };

        init();
    }
})();
