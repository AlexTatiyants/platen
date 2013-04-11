var PostsController = function($scope, $q, fileManager) {
  $scope.posts = [];

  $scope.loaded = false;

  if (!$scope.loaded) {
    console.log("loading posts");
    fileManager.readFiles(function(e) {
      var post = JSON.parse(this.result);
      $scope.posts.push(post);
      $scope.loaded = true;
      $scope.$apply();
    });
  };
};

PostsController.$inject = ['$scope', '$q', 'fileManager'];