/**
 * Created by Adir on 12/12/2014.
 */
'use strict';

(function() {
    angular.module('Gov').controller('MainCtrl', MainController);

    function MainController($http, $state, $rootScope) {
        var self = this;

        function init() {
			$http.get('/loggedin').then(function(user){
				$rootScope.user=user.data;
			});
        }

		self.logout = function(){
			$http.get('/logout').then(function(){
				$rootScope.user=null;
				$state.go('home');
			});
		};

        init();
    }
})();
