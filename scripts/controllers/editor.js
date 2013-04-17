var EditorController = function($scope, $routeParams, $timeout, $filter, fileManager, logger, resources) {
  var AUTOSAVE_INTERVAL = 12000;

  $scope.status = {};
  $scope.previewOn = false;
  $scope.status.autoSaveTime = "unsaved";
  $scope.showMetadata = false;

  $scope.post = {};

  var getFilePath = function(postId) {
    return "/" + resources.POST_DIRECTORY_PATH + '/' + postId;
  };

  var createPost = function() {
    $scope.post.id = new Date().getTime();
    $scope.post.path = getFilePath($scope.post.id);
    $scope.post.createdDate = new Date();
    $scope.post.lastUpdatedDate = '';
    $scope.post.title = '';
    $scope.post.contentMarkdown = '';
    $scope.post.contentHtml = '';
    $scope.post.excerpt = '';
    $scope.post.tags = '';
    $scope.post.categories = '';
    $scope.post.status = '';
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

  $('#post-title').focus();

  var savePost = function() {
    if ($scope.post.title.trim() === '' && $scope.post.contentMarkdown.trim() === '') return;
    var postToSave = JSON.parse(JSON.stringify($scope.post));
    postToSave.contentHtml = "";
    postToSave.lastUpdatedDate = new Date();

    fileManager.writeFile($scope.post.path, $scope.post.id, JSON.stringify(postToSave), function(fileEntry) {
      $scope.status.autoSaveTime = $filter('date')(new Date(), 'shortTime');
      logger.log("saved post '" + $scope.post.title + "' on " + $scope.status.autoSaveTime, "EditorController");
    });
  };

  $scope.togglePreview = function() {
    if (!$scope.previewOn) {
      $scope.post.contentHtml = marked($scope.post.contentMarkdown);
    };
    $scope.previewOn = !$scope.previewOn;
  };

  $scope.toggleMetadataPanel = function() {
    $scope.showMetadata = !$scope.showMetadata;

    if ($scope.showMetadata && $scope.post.excerpt === '') {
      $scope.updateExcerpt();
    }
  };

  $scope.updateExcerpt = function() {
    console.log($scope.post);
  };

  $scope.$on('postContentChanged', function(event, args) {
    savePost();
  });

};

EditorController.$inject = ['$scope', '$routeParams', '$timeout', '$filter', 'fileManager', 'logger', 'resources'];