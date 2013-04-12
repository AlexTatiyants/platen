var PostsController = function($scope, $q, fileManager, resources) {
  $scope.posts = [];
  $scope.loaded = false;

  if (!$scope.loaded) {
    fileManager.readFiles(resources.POST_DIRECTORY_PATH, function(e) {
      var post = JSON.parse(this.result);
      $scope.posts.push(post);
      $scope.loaded = true;
      $scope.$apply();
    });
  };

  $scope.deletePost = function(post) {
    fileManager.removeFile(post.path, function() {
      $scope.posts.splice(post);
    });
  }
};

PostsController.$inject = ['$scope', '$q', 'fileManager', 'resources'];