var EditorController = function($scope, $routeParams, $timeout, $filter, fileManager, htmlizer,resources) {
  var AUTOSAVE_INTERVAL = 12000;

  $scope.post = {};
  $scope.status = {};
  $scope.post.title = 'UNTITLED';
  $scope.previewOn = false;

  var getFilePath = function(postId) {
    return "/" + resources.POST_DIRECTORY_PATH + '/' + postId;
  };

  var createPost = function() {
    $scope.post.id = new Date().getTime();
    $scope.post.path = getFilePath($scope.post.id);
    $scope.post.createdDate = new Date();
  };

  var loadPost = function(postId) {
    fileManager.readFile(getFilePath(postId), function(postJson) {
      $scope.post = JSON.parse(postJson);
      $scope.post.content = htmlizer.HTMLizeText($scope.post.content);
      $scope.$apply();
    });
  };

  var initializePost = function() {
    if ($routeParams.postId === "0") {
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

  $scope.writeFile = function() {
    var postToSave = JSON.parse(JSON.stringify($scope.post));
    postToSave.content = htmlizer.deHTMLizeText(postToSave.content);
    fileManager.writeFile($scope.post.path, $scope.post.id, JSON.stringify(postToSave), function(fileEntry) {
      $scope.status.autoSaveTime = $filter('date')(new Date(), 'shortTime');
    });
  };

  $scope.togglePreview = function() {
    if (!$scope.previewOn) {
      $scope.post.htmlPreview = marked(htmlizer.deHTMLizeText($scope.post.content));
    };
    $scope.previewOn = !$scope.previewOn;
  }

  $('#post-title').focus();
};

EditorController.$inject = ['$scope', '$routeParams', '$timeout', '$filter', 'fileManager', 'htmlizer', 'resources'];