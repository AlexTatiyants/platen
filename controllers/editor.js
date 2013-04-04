var EditorController = function($scope) {

	$scope.post = {};

	$scope.update = function () {
		$scope.post.htmlContent = marked($scope.post.rawContent);
		console.log($scope.post);
	}

	$('#post-title').focus();
};