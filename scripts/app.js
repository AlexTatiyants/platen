'use strict';

angular.module('platen.directives', []);
angular.module('platen.services', []);

var platen = angular.module('platen', ['platen.directives', 'platen.services', 'ui.bootstrap'])
	.config(['$routeProvider', function($routeProvider) {

	$routeProvider.when('/posts', {
		templateUrl: 'views/posts.html'
	});

	$routeProvider.when('/posts/:postId', {
		templateUrl: 'views/edit.html'
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