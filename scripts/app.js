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

	$routeProvider.otherwise({redirectTo: '/posts'});
}]);


//TODO: convert to angular service
var fs = null;
var POSTS_FOLDER_PATH = 'posts';


function onError(e) {
	console.log(e);
}

document.addEventListener('DOMContentLoaded', function(e) {
	window.webkitRequestFileSystem(PERSISTENT, 1024 * 1024, function(localFs) {
		fs = localFs;
	},
	onError);
});