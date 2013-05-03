'use strict';

angular.module('platen.directives', []);
angular.module('platen.services', []);
angular.module('platen.models', []);

var platen = angular.module('platen', ['platen.models', 'platen.directives', 'platen.services', 'ui.bootstrap', 'ui'])
	.config(['$routeProvider', function($routeProvider) {

	$routeProvider.when('/posts', {
		templateUrl: 'views/posts.html'
	});

	$routeProvider.when('/posts/:postId', {
		templateUrl: 'views/edit.html'
	});

	$routeProvider.when('/images', {
		templateUrl: 'views/images.html'
	});

	$routeProvider.when('/logs', {
		templateUrl: 'views/logs.html'
	});

	$routeProvider.when('/login', {
		templateUrl: 'views/login.html'
	});

	$routeProvider.otherwise({
		redirectTo: '/posts'
	});
}]);