var PostsController = function($scope, $location, fileManager, logger, resources) {
  $scope.posts = {};
  $scope.confirm = {};
  $scope.loaded = false;
  $scope.postToDelete = {};

  if (!$scope.loaded) {
    fileManager.readFilesInDirectory(resources.POST_DIRECTORY_PATH, function(e) {
      var post = JSON.parse(this.result);
      $scope.posts[post.id] = post;
      $scope.loaded = true;
      $scope.$apply();
      logger.log("read post '" + post.title + "'", "PostsController");
    });
  };

  $scope.deletePost = function(post) {
    $scope.postToDelete = post;
    $scope.deletePostConfirmOpen = true;
  };

  $scope.cancelDelete = function() {
    $scope.deletePostConfirmOpen = false;
    $scope.postToDelete = {};
  };

  $scope.proceedWithDelete = function() {
    $scope.deletePostConfirmOpen = false;
    fileManager.removeFile($scope.postToDelete.path, function() {
      delete $scope.posts[$scope.postToDelete.id];
      logger.log("deleted post '" + $scope.postToDelete.title + "'", "PostsController");
      $scope.postToDelete = {};
      $scope.$apply();
    });
  }

  $scope.editPost = function(post) {
    $location.path('posts/' + post.id);
  };

  $scope.deleteAll = function() {
    fileManager.clearDirectory(resources.POST_DIRECTORY_PATH, function() {
      logger.log("deleted all posts", "PostsController");
      $scope.posts = {};
    });
  };
};

PostsController.$inject = ['$scope', '$location', 'fileManager', 'logger', 'resources'];