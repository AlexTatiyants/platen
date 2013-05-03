var PostsController = function($scope, $location, fileManager, logger, resources) {
  $scope.posts = {};
  $scope.confirm = {};
  $scope.loaded = false;
  $scope.postToDelete = {};

  if (!$scope.loaded) {
    fileManager.accessFilesInDirectory(

    resources.POST_DIRECTORY_PATH,
    fileManager.directoryAccessActions.READ,

    function(file) {
      // on success
      try {
        var post = JSON.parse(file);
        $scope.posts[post.id] = post;
        $scope.loaded = true;

        $scope.$emit(resources.events.PROCESSING_FINISHED, {
          message: "loaded posts",
          success: true
        });

        $scope.$apply();

      } catch (error) {
        logger.log("error reading file [" + file + "]: " + error, "PostsController");
        $scope.$emit(resources.events.PROCESSING_FINISHED, {
          message: "loading posts failed",
          success: false
        });
        $scope.$apply();
      }
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

  $scope.deleteAll = function() {
    fileManager.accessFilesInDirectory(

    resources.POST_DIRECTORY_PATH,
    fileManager.directoryAccessActions.REMOVE,

    function(file) {
      logger.log("deleted all posts", "PostsController");
      $scope.posts = {};
      $scope.$emit(resources.events.PROCESSING_FINISHED, {
        message: "all posts removed",
        success: true
      });
    },

    function(error) {
      // on error
      logger.log("error removing all posts: " + error, "PostsController");

      $scope.$emit(resources.events.PROCESSING_FINISHED, {
        message: "removing posts failed",
        success: false
      });
    });
  };
};

PostsController.$inject = ['$scope', '$location', 'fileManager', 'logger', 'resources'];