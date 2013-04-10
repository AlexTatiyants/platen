'use strict';

angular.module('platen.directives', []);
angular.module('platen.services', []);

var platen = angular.module('platen', ['platen.directives', 'platen.services']).config(['$routeProvider', function($routeProvider) {

	$routeProvider.when('/posts', {
		templateUrl: 'views/pages/posts.html',
		controller: PostsController
	});

	$routeProvider.when('/posts/:postId', {
		templateUrl: 'views/pages/edit.html',
		controller: EditorController
	});

	$routeProvider.when('/login', {
		templateUrl: 'views/pages/login.html',
		controller: LoginController
	});

	$routeProvider.otherwise({redirectTo: '/login'});
}]);


//TODO: convert to angular service
var fs = null;
var FOLDERNAME = 'platen';

function onError(e) {
	console.log(e);
}

var fs = null;
var FOLDERNAME = 'test';



document.addEventListener('DOMContentLoaded', function(e) {
	window.webkitRequestFileSystem(PERSISTENT, 1024 * 1024, function(localFs) {
		fs = localFs;
	},
	onError);
});