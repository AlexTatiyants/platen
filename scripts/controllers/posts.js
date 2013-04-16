var PostsController = function($scope, $q, $location, fileManager, logger, resources) {
  $scope.posts = [];
  $scope.loaded = false;

  if (!$scope.loaded) {
    fileManager.readFilesInDirectory(resources.POST_DIRECTORY_PATH, function(e) {
      var post = JSON.parse(this.result);
      $scope.posts.push(post);
      $scope.loaded = true;
      $scope.$apply();
      logger.log("read post '" + post.title + "'", "PostsController");
    });
  };

  $scope.deletePost = function(post) {
    fileManager.removeFile(post.path, function() {
      $scope.posts.splice(post);
      $scope.$apply();
      logger.log("deleted post '" + post.title + "'", "PostsController");
    });
  };

  $scope.editPost = function(post) {
    $location.path('posts/' + post.id);
  };

  $scope.deleteAll = function() {
    fileManager.clearDirectory(resources.POST_DIRECTORY_PATH, function() {
      logger.log("deleted all posts", "PostsController");
      $scope.posts = [];
    });
  };

};

PostsController.$inject = ['$scope', '$q', '$location', 'fileManager', 'logger', 'resources'];