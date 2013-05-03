var EditorController = function(Post, $scope, $routeParams, $filter, fileManager, logger, resources) {
  var AUTOSAVE_INTERVAL = 12000;
  var STATUS_DRAFT = 'draft';
  var STATUS_PUBLISH = 'publish';
  var POST_TITLE_ID = 'post-title';
  var POST_CONTENT_ID = 'post-content';
  var POST_EXCERPT = 'post-excerpt';
  var POST_TAGS = 'post-tags';
  var POST_CATEGORIES = 'post-categories';

  var INSERTED_IMAGE_PLACEHOLDER = '[[!@#IMAGE_PLACEHOLDER#@!]]';
  var MESSAGE_PREVIEW_HTML = 'Preview as HTML';
  var MESSAGE_PREVIEW_MARKDOWN = 'View Markdown';

  var savePost = function() {
    Post.save(

    function() {
      // on success 
      $scope.status.autoSaveTime = $filter('date')(new Date(), 'shortTime');
      $scope.$apply();
      logger.log("saved post '" + $scope.post.title + "' on " + $scope.status.autoSaveTime, "EditorController");
    },

    function(e) {
      // on error
      logger.log("erorr saving post '" + $scope.post.title + ": " + e, "EditorController");
      $scope.$emit(resources.events.PROCESSING_FINISHED, "error saving post", false);
    });
  };

  Post.initialize($routeParams.postId,

  function(post) {
    // on success
    $scope.post = post;

    $scope.status = {};
    $scope.previewOn = false;
    $scope.status.autoSaveTime = "unsaved";
    $scope.showMetadata = false;
    $scope.previewMessage = MESSAGE_PREVIEW_HTML;

    logger.log("loaded post '" + $scope.post.title + "'", "EditorController");
    $('#post-title').focus();
    $scope.$apply();
  },

  function(e) {
    // on error
    logger.log("error loading post: " + e, "EditorController");
    $scope.$emit(resources.events.PROCESSING_FINISHED, "error loading post", false);
  });

  $scope.$on('elementEdited', function(event, elementId) {
    if (elementId === POST_TITLE_ID || elementId === POST_CONTENT_ID || elementId === POST_EXCERPT || elementId === POST_TAGS || elementId || POST_CATEGORIES) {

      savePost();
    }
  });

  var addImage = function(imageName, imageBlob, onSuccessCallback, onErrorCallback) {

    // TODO: handle images pasted as text/html

    var fileName = imageName.replace(/[^a-z0-9]/gi, '_').toLowerCase();
    if (fileName.indexOf('.png') === -1) {
      fileName += '.png';
    }

    var image = {
      id: new Date().getTime(),
      type: IMAGE_TYPE,
      fileName: fileName,
      filePath: resources.IMAGE_DIRECTORY_PATH + "/" + fileName
    };

    var contentMarkdownHtml = data.contentMarkdownHtml;

    fileManager.writeFile(image.filePath, imageBlob,

    function(fileEntry) {
      // on success
      logger.log("saved image " + image.fileName, "EditorController");

      image.localUrl = fileEntry.toURL();
      image.markdownUrl = '![' + image.fileName + '](' + image.localUrl + ')';

      data.contentMarkdownHtml = contentMarkdownHtml.replace(INSERTED_IMAGE_PLACEHOLDER, image.markdownUrl);
      data.images[image.id] = image;

      savePost(onSuccessCallback, onErrorCallback);
      image = {};
    },

    function(e) {
      // on error
      logger.log("could not save image " + image.fileName + ": e", "EditorController");
      $scope.$emit(resources.events.PROCESSING_FINISHED, {
        message: "could not save image",
        success: false
      });

    });
  };


  var insertImage = function(blob) {
    $scope.imageToInsert = {};
    $scope.imageToInsert.blob = blob;

    // need to insert a temporary token into the body of the post
    // which will be replaced (or removed) once the user enters file name
    document.execCommand('insertHtml', false, INSERTED_IMAGE_PLACEHOLDER);

    $scope.insertImageDialogOpen = true;
  };

  $scope.proceedWithImageInsert = function() {
    $scope.insertImageDialogOpen = false;

    Post.addImage($scope.imageToInsert.fileName, $scope.imageToInsert.blob,

    function() {
      // on success
      $scope.status.autoSaveTime = $filter('date')(new Date(), 'shortTime');
      $scope.$apply();
      logger.log("updated post '" + $scope.post.title + "' on " + $scope.status.autoSaveTime, "EditorController");
    },

    function(e) {
      // on error
      logger.log("erorr updating post '" + $scope.post.title + ": " + e, "EditorController");
      $scope.$emit(resources.events.PROCESSING_FINISHED, "error saving post", false);
    });
  };

  $scope.cancelImageInsert = function() {
    $scope.imageToInsert = {};
    $scope.post.contentMarkdownHtml = $scope.post.contentMarkdownHtml.replace(INSERTED_IMAGE_PLACEHOLDER, '');
    $('#post-content').focus();
    $scope.insertImageDialogOpen = false;
  };


  $scope.togglePreview = function() {
    if (!$scope.previewOn) {
      $scope.post.contentHtmlPreview = marked($scope.post.contentMarkdown);
    };
    $scope.previewOn = !$scope.previewOn;
    $scope.previewMessage = $scope.previewOn ? MESSAGE_PREVIEW_MARKDOWN : MESSAGE_PREVIEW_HTML;
  };

  $scope.toggleMetadataPanel = function() {
    $scope.showMetadata = !$scope.showMetadata;

    if ($scope.showMetadata && $scope.post.excerpt === '') {
      $scope.updateExcerpt();
    }
    if ($scope.showMetadata) {
      $('#post-excerpt').focus();
    }
  };

  $scope.updateExcerpt = function() {
    $scope.post.excerpt = $scope.post.contentMarkdown.match(/^(.*)$/m)[0];
    savePost();
  };

  $scope.sync = function() {
    $scope.$emit(resources.events.PROCESSING_STARTED, "uploading post to WordPress");

    Post.sync(

    function() {
      // on success
      $scope.$emit(resources.events.PROCESSING_FINISHED, {
        message: "upload to WordPress complete",
        success: true
      });
    },

    function(e) {
      // on error
      $scope.$emit(resources.events.PROCESSING_FINISHED, {
        message: "upload to WordPress failed",
        success: false
      });
    });
  };

  $scope.getTags = function() {
    wordpress.getTags(

    function(result) {
      // on success
      $scope.tags = result;
    },

    function(errorMessage) {
      // on error
      $scope.$emit(resources.events.PROCESSING_FINISHED, {
        message: "could not load WordPress tags",
        success: false
      });
    });
  }

  $scope.addTag = function(tag) {
    if ($scope.post.tags.indexOf(tag.name) === -1) {
      if ($scope.post.tags.trim() === '') {
        $scope.post.tags += tag.name;
      } else {
        $scope.post.tags += ', ' + tag.name;
      }
    }
  };

  $scope.getCategories = function() {
    wordpress.getCategories(

    function(result) {
      // on success
      $scope.categories = result;

    },

    function(errorMessage) {
      // on error
      $scope.$emit(resources.events.PROCESSING_FINISHED, {
        message: "could not load WordPress categories",
        success: false
      });
    });
  }

  $scope.addCategory = function(category) {
    if ($scope.post.categories.indexOf(category.name) === -1) {
      if ($scope.post.categories.trim() === '') {
        $scope.post.categories += category.name;
      } else {
        $scope.post.categories += ', ' + category.name;
      }
    }
  };

  $scope.imagesAvailable = function() {
    return !($.isEmptyObject($scope.post.images));
  };

  $scope.deleteImage = function(image) {
    $scope.imageToDelete = image;
    $scope.deleteImageConfirmOpen = true;
  };

  $scope.cancelImageDelete = function() {
    $scope.deleteImageConfirmOpen = false;
    $scope.imageToDelete = {};
  };

  $scope.proceedWithImageDelete = function() {
    $scope.deleteImageConfirmOpen = false;

    fileManager.removeFile($scope.imageToDelete.filePath,

    function() {
      // on success
      delete $scope.post.images[$scope.imageToDelete.id];
      savePost();
      logger.log("deleted image '" + $scope.imageToDelete.fileName + "'", "EditorController");
      $scope.imageToDelete = {};
    },

    function() {
      // on error
      $scope.$emit(resources.events.PROCESSING_FINISHED, {
        message: "could not delete image",
        success: false
      });
    });
  };

  $scope.$on('imageInserted', function(event, blob) {
    insertImage(blob);
  });
};

EditorController.$inject = ['Post', '$scope', '$routeParams', '$filter', 'fileManager', 'logger', 'resources'];