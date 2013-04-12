var PostsController = function($scope, $q, $location, fileManager, resources) {
  $scope.posts = [];
  $scope.loaded = false;

  if (!$scope.loaded) {
    fileManager.readFilesInDirectory(resources.POST_DIRECTORY_PATH, function(e) {
      var post = JSON.parse(this.result);
      $scope.posts.push(post);
      $scope.loaded = true;
      $scope.$apply();
    });
  };

  $scope.deletePost = function(post) {
    fileManager.removeFile(post.path, function() {
      $scope.posts.splice(post);
      $scope.$apply();
    });
  };

  $scope.editPost = function(post) {
    $location.path('posts/' + post.id);
  };

  $scope.deleteAll = function() {
    fileManager.clearDirectory(resources.POST_DIRECTORY_PATH, function() {
      console.log("all files deleted from " + resources.POST_DIRECTORY_PATH);
    });
  };
};

PostsController.$inject = ['$scope', '$q', '$location', 'fileManager', 'resources'];