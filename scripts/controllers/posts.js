var PostsController = function($scope, $q, $location, fileManager, logger, resources) {
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

  $scope.readImages = function() {
    fileManager.readFile("images", function(e) {
        console.log("read image", e);
    });
  }



  $scope.cancelDelete = function() {
    $scope.shouldBeOpen = false;
    $scope.postToDelete = {};
  };

  $scope.proceedWithDelete = function() {
    debugger;
    $scope.shouldBeOpen = false;
    fileManager.removeFile($scope.postToDelete.path, function() {
      delete $scope.posts[$scope.postToDelete.id];
      logger.log("deleted post '" + $scope.postToDelete.title + "'", "PostsController");
      $scope.postToDelete = {};
      $scope.$apply();
    });
  }

  $scope.deletePost = function(post) {
    $scope.postToDelete = post;
    $scope.shouldBeOpen = true;
  };

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

PostsController.$inject = ['$scope', '$q', '$location', 'fileManager', 'logger', 'resources'];