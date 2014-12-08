'use strict';

angular.module('Gov', [
    // angular modules
    'ngAnimate',

    /// 3rd party
    'restangular',
    'ui.router',
    'ui.bootstrap',

    // features
    'Gov.Lists'
]).config(function(RestangularProvider, Config) {
    RestangularProvider.setBaseUrl(Config.rest.serverUrl);
    RestangularProvider.setRestangularFields({id: '_id'});
});
