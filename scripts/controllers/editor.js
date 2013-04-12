var EditorController = function($scope, $routeParams, $timeout, $filter, fileManager, resources) {
  var AUTOSAVE_INTERVAL = 12000;

  $scope.post = {};
  $scope.status = {};
  $scope.post.title = 'UNTITLED';

  var getFilePath = function(postId) {
    return "/" + resources.POST_DIRECTORY_PATH + '/' + postId;
  };

  var createPost = function() {
    $scope.post.id = new Date().getTime();
    $scope.post.path = getFilePath($scope.post);
    $scope.post.createdDate = new Date();
  };

  var loadPost = function(postId) {
    var postJson = fileManager.readFile(getFilePath(postId), function(postJson) {
      $scope.post = JSON.parse(postJson);
      $scope.$apply();
    });
  };

  var initializePost = function() {
    if ($routeParams.postId === 0) {
      createPost();
    } else {
      loadPost($routeParams.postId);
    }
  };

  initializePost();

  // $scope.autoSave = function() {
  //   $scope.writeFile($scope.post);
  //   t = $timeout($scope.autoSave, AUTOSAVE_INTERVAL);
  // }
  // var t = $timeout($scope.autoSave, AUTOSAVE_INTERVAL);


  // $scope.update = function () {
  // 	$scope.post.htmlContent = marked($scope.post.rawContent);
  // 	console.log($scope.post);
  // }


  $scope.writeFile = function() {
    console.log("saving ", $scope.post);
    fileManager.writeFile($scope.post.path, $scope.post.id, JSON.stringify($scope.post), function(fileEntry) {
      $scope.status.autoSaveTime = $filter('date')(new Date(), 'shortTime');
    });
  };

  $('#post-title').focus();
};

EditorController.$inject = ['$scope', '$routeParams', '$timeout', '$filter', 'fileManager', 'resources'];