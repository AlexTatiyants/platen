'use strict';

angular.module('platen.directives', []);
angular.module('platen.services', []);
angular.module('platen.models', []);
angular.module('platen.filters', []);

var platen = angular.module('platen', ['platen.models', 'platen.directives', 'platen.services', 'platen.filters', 'ui.bootstrap', 'ui'])
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

	$routeProvider.when('/about', {
		templateUrl: 'views/about.html'
	});

	$routeProvider.otherwise({
		redirectTo: '/posts'
	});
}]);