var EditorController = function($scope) {

	$scope.post = {};

// new
	$scope.update = function () {
		$scope.post.htmlContent = marked($scope.post.rawContent);
		console.log($scope.post);
	}

	$('#post-title').focus();
};