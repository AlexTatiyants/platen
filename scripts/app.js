'use strict';

angular.module('platen.directives', []);
angular.module('platen.services', []);

var platen = angular.module('platen', ['platen.directives', 'platen.services']).config(['$routeProvider', function($routeProvider) {

	$routeProvider.when('/posts', {
		templateUrl: 'views/pages/posts.html'
	});

	$routeProvider.when('/posts/:postId', {
		templateUrl: 'views/pages/edit.html'
	});

	// $routeProvider.when('/login', {
	// 	templateUrl: 'views/pages/login.html',
	// 	controller: LoginController
	// });

	$routeProvider.otherwise({
		redirectTo: '/'
	});
}]);