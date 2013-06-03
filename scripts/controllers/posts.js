var PostsController = function($scope, $location, fileManager, logger, resources) {
  $scope.postsList = [];
  $scope.confirm = {};
  $scope.loaded = false;
  $scope.postToDelete = {};

  var SORT_DESCENDING = 'descending';
  var SORT_ASCENDING = 'ascending';

  $scope.filters = {};
  $scope.filters.dateSortOrder = SORT_DESCENDING;

  var loadPosts = function() {
    $scope.postsList = [];
    $scope.safeApply();

    fileManager.accessFilesInDirectory(resources.POST_DIRECTORY_PATH, fileManager.directoryAccessActions.READ, function(file) {
      try {
        var post = JSON.parse(file);
        $scope.postsList.push(post);
        $scope.loaded = true;
        $scope.safeApply();

      } catch (error) {
        logger.log("error reading file [" + file + "]: " + error, "PostsController");
        $scope.$emit(resources.events.PROCESSING_FINISHED, {
          message: "loading posts failed",
          success: false
        });
        $scope.$apply();
      }
    }, function(error) {
      logger.log(error, "PostsController");

      $scope.$emit(resources.events.PROCESSING_FINISHED, {
        message: "loading posts failed",
        success: false
      });
    });
  };

  if (!$scope.loaded) {
    loadPosts();
  }

  $scope.$on(resources.events.ALL_POSTS_DELETED, function(event, args) {
    loadPosts();
  });

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

    // delete all related images


    // delete the post itself
    fileManager.removeFile($scope.postToDelete.path, function() {
      var newList = _.reject($scope.postsList, function(post) {
        return (post.id === $scope.postToDelete.id);
      });

      $scope.postsList = newList;

      logger.log("deleted post '" + $scope.postToDelete.title + "'", "PostsController");
      $scope.postToDelete = {};
      $scope.$apply();

    }, function(error) {
      $scope.$emit(resources.events.PROCESSING_FINISHED, {
        message: "failed to remove post '" + $scope.postToDelete.title + "'",
        success: false
      });
    });
  };

  $scope.editPost = function(post) {
    $location.path('posts/' + post.id);
  };
};

PostsController.$inject = ['$scope', '$location', 'fileManager', 'logger', 'resources'];