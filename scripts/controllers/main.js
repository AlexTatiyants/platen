'use strict';

var MainController = function($scope, $location) {

	$scope.getPosts = function() {
		$location.path('posts/');
		console.log($location);
	};

	$scope.getPost = function(id) {
		$location.path('posts/' + id);
		console.log($location);
	};

};

MainController.$inject = ['$scope', '$location'];