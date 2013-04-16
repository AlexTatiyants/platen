var EditorController = function($scope, $routeParams, $timeout, $filter, fileManager, logger, resources) {
  var AUTOSAVE_INTERVAL = 12000;

  $scope.post = {};
  $scope.status = {};
  $scope.post.title = '';
  $scope.post.content = '';
    
  $scope.previewOn = false;
  $scope.status.autoSaveTime = "unsaved";
  $scope.showMetadata = false;

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
      $scope.$apply();
      logger.log("loaded post '" + $scope.post.title + "'", "EditorController");
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

  var savePost = function() {
    if ($scope.post.title.trim() === '' && $scope.post.content.trim() === '') return;

    var postToSave = JSON.parse(JSON.stringify($scope.post));
    postToSave.htmlPreview = "";

    fileManager.writeFile($scope.post.path, $scope.post.id, JSON.stringify(postToSave), function(fileEntry) {
      $scope.status.autoSaveTime = $filter('date')(new Date(), 'shortTime');
      logger.log("saved post '" + $scope.post.title + "' on " + $scope.status.autoSaveTime, "EditorController");
    });
  };

  $scope.togglePreview = function() {
    if (!$scope.previewOn) {
      $scope.post.htmlPreview = marked($scope.post.content);
    };
    $scope.previewOn = !$scope.previewOn;
  };

  $scope.toggleMetadataPanel = function() {
    $scope.showMetadata = !$scope.showMetadata;
  };

  $scope.$on('postContentChanged', function(event, args) {
    savePost();
  });

  $('#post-title').focus();
};

EditorController.$inject = ['$scope', '$routeParams', '$timeout', '$filter', 'fileManager', 'logger', 'resources'];