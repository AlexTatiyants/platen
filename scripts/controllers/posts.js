var PostsController = function($scope, $location, fileManager, logger, resources) {
  $scope.posts = {};
  $scope.confirm = {};
  $scope.loaded = false;
  $scope.postToDelete = {};

  if (!$scope.loaded) {
    fileManager.accessFilesInDirectory(

    resources.POST_DIRECTORY_PATH,
    fileManager.directoryAccessActions.READ_FILE,

    function(file) {
      // on success
      var post = JSON.parse(this.result);
      $scope.posts[post.id] = post;
      $scope.loaded = true;
      $scope.$apply();
    },

    function(error) {
      // on error
      logger.log(error, "PostsController");

      $scope.$emit(resources.events.PROCESSING_FINISHED, {
        message: "loading posts failed",
        success: false
      });
    });
  }

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
    fileManager.removeFile($scope.postToDelete.path,

    function() {
      // on success
      delete $scope.posts[$scope.postToDelete.id];
      logger.log("deleted post '" + $scope.postToDelete.title + "'", "PostsController");
      $scope.postToDelete = {};
      $scope.$apply();
    },

    function(error) {
      // on error
      $scope.$emit(resources.events.PROCESSING_FINISHED, {
        message: "failed to remove post '" + $scope.postToDelete.title + "'",
        success: false
      });
    });
  }

  $scope.editPost = function(post) {
    $location.path('posts/' + post.id);
  };
};

PostsController.$inject = ['$scope', '$location', 'fileManager', 'logger', 'resources'];