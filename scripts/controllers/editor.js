var EditorController = function($scope, $routeParams, $timeout, $filter, fileManager, logger, wordpress, resources) {
  var AUTOSAVE_INTERVAL = 12000;
  var STATUS_DRAFT = 'draft';
  var STATUS_PUBLISH = 'publish';
  var POST_TITLE_ID = 'post-title';
  var POST_CONTENT_ID = 'post-content';

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
    $scope.post.status = STATUS_DRAFT;
    $scope.post.title = '';

    // there are 4 representations of the post:

    // contentMarkdown - raw text written using markdown formatting (innerText property of the editor window)
    // contentMarkdownHTML - markdown text, HTMLified by the browswer (innerHTML property of the editor window)
    // contentHTMLPreview - markdown text converted to HTML (innerHTML content of the preview window)
    // content - markdown text converted to HTML and encoded (i.e. content of the post for Wordpress)

    $scope.post.content = '';
    $scope.post.contentMarkdown = ''; // set by markdown service
    $scope.post.contentMarkdownHtml = '';
    $scope.post.contentHtmlPreview = '';

    $scope.post.excerpt = '';
    $scope.post.createdDate = new Date();
    $scope.post.lastUpdatedDate = '';
    $scope.post.tags = '';
    $scope.post.categories = '';
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

    // since there are 4 different representations of the same content, we only need to save one of them
    postToSave.content = '';
    postToSave.contentHtmlPreview = '';
    postToSave.lastUpdatedDate = new Date();


    fileManager.writeFile($scope.post.path, $scope.post.id, JSON.stringify(postToSave), function(fileEntry) {
      $scope.status.autoSaveTime = $filter('date')(new Date(), 'shortTime');
      logger.log("saved post '" + $scope.post.title + "' on " + $scope.status.autoSaveTime, "EditorController");
    });
  };

  $scope.togglePreview = function() {
    if (!$scope.previewOn) {
      $scope.post.contentHtmlPreview = marked($scope.post.contentMarkdown);
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

  $scope.read = function() {
    loadPost($scope.post.id);
  };

  $scope.sync = function() {
    $scope.post.content = marked($scope.post.contentMarkdown).replace(/</g, '&lt;').replace(/>/g, '&gt;');

    wordpress.savePost($scope.post, function(result) {
      $scope.post.wordPressId = result;
      savePost();
    }, function(errorMessage) {
      alert("OOPS" + errorMessage);
    });
  };

  $scope.$on('elementEdited', function(event, elementId) {
    if (elementId === POST_TITLE_ID || elementId === POST_CONTENT_ID) {
      savePost();
    }
  });

};

EditorController.$inject = ['$scope', '$routeParams', '$timeout', '$filter', 'fileManager', 'logger', 'wordpress', 'resources'];