'use strict';

angular.module('platen.directives', []);
angular.module('platen.services', []);

var platen = angular.module('platen', ['platen.directives', 'platen.services', '$strap.directives']).config(['$routeProvider', function($routeProvider) {

	$routeProvider.when('/posts', {
		templateUrl: 'views/pages/posts.html'
	});

	$routeProvider.when('/posts/:postId', {
		templateUrl: 'views/pages/edit.html'
	});

	$routeProvider.when('/logs', {
		templateUrl: 'views/pages/logs.html'
	});

	$routeProvider.otherwise({
		redirectTo: '/posts'
	});
}]);