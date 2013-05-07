var EditorController = function(Post, $scope, $routeParams, $filter, fileManager, wordpress, logger, resources, settings) {
  var STATUS_DRAFT = 'draft';
  var STATUS_PUBLISH = 'publish';
  var POST_TITLE_ID = 'post-title';
  var POST_CONTENT_ID = 'post-content';
  var POST_EXCERPT = 'post-excerpt';
  var POST_TAGS = 'post-tags';
  var POST_CATEGORIES = 'post-categories';
  var EDITABLE_ELEMENTS = [POST_TITLE_ID, POST_CONTENT_ID, POST_EXCERPT, POST_TAGS, POST_CATEGORIES];
  var INSERTED_IMAGE_PLACEHOLDER = '[[!@#IMAGE_PLACEHOLDER#@!]]';
  var DELETED_IMAGE_PLACEHOLDER = "!! IMAGE DELETED !!";
  var MESSAGE_PREVIEW_HTML = 'Preview as HTML';
  var MESSAGE_PREVIEW_MARKDOWN = 'View Markdown';
  var IMAGE_TYPE = 'image/png';

  var notify = function(message, error, isSuccess) {
    if (error) {
      message += ": " + error;
    }
    logger.log(message, "EditorController");

    $scope.$emit(resources.events.PROCESSING_FINISHED, {
      message: message,
      success: isSuccess
    });
  };

  Post.initialize($routeParams.postId, function(post) {
    $scope.post = post;
    $scope.previewOn = false;
    $scope.showMetadata = false;
    $scope.previewMessage = MESSAGE_PREVIEW_HTML;

    logger.log("loaded post '" + $scope.post.title + "'", "EditorController");
    $('#post-title').focus();

    $scope.safeApply();

  }, function(error) {
    notify("error loading post", error, false);
  });

  var savePost = function() {
    Post.save(function() {
      $scope.$apply();
      logger.log("saved post '" + $scope.post.title + "' on " + $scope.post.state.lastSaveDate, "EditorController");
    },

    function(error) {
      notify("erorr saving post", error, false);
    });
  };

  $scope.$on('elementEdited', function(event, elementId) {
    if (_.contains(EDITABLE_ELEMENTS, elementId)) {
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
      name: imageName,
      fileName: fileName,
      filePath: resources.IMAGE_DIRECTORY_PATH + "/" + fileName
    };

    var contentMarkdownHtml = $scope.post.contentMarkdownHtml;

    fileManager.writeFile(image.filePath, imageBlob, function(fileEntry) {
      image.localUrl = fileEntry.toURL();
      image.markdownUrl = '![' + image.name + '](' + image.localUrl + ')';

      $scope.post.contentMarkdownHtml = contentMarkdownHtml.replace(INSERTED_IMAGE_PLACEHOLDER, image.markdownUrl);
      $scope.post.images[image.id] = image;

      savePost();
      image = {};
      notify("image saved", null, true);
    },

    function(error) {
      notify("error saving image", error, false);
    });
  };

  $scope.$on('imageInserted', function(event, blob) {
    $scope.imageToInsert = {};
    $scope.imageToInsert.blob = blob;

    // need to insert a temporary token into the body of the post
    // which will be replaced (or removed) once the user enters file name
    document.execCommand('insertHtml', false, INSERTED_IMAGE_PLACEHOLDER);
    $scope.insertImageDialogOpen = true;
  });

  $scope.proceedWithImageInsert = function() {
    $scope.insertImageDialogOpen = false;
    addImage($scope.imageToInsert.fileName, $scope.imageToInsert.blob, function() {
      savePost();
    }, function(error) {
      notify("erorr updating post '" + $scope.post.title, error, false);
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
    notify("starting WordPress upload", null, true);

    Post.sync(function() {
      notify("finished upload to WordPress", null, false);
    }, function(error) {
      notify("error uploading post '" + $scope.post.title, error, false);
    });
  };

  $scope.getTags = function() {
    wordpress.getTags(function(result) {
      $scope.tags = result;
    }, function(error) {
      notify("error loading tags from WordPress", error, false);
    });
  };

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
    wordpress.getCategories(function(result) {
      $scope.categories = result;
    }, function(error) {
      notify("error loading categories from WordPress", error, false);
    });
  };

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

  $scope.initiateImageDelete = function(image) {
    $scope.imageToDelete = image;
    $scope.deleteImageConfirmOpen = true;
  };

  $scope.cancelImageDelete = function() {
    $scope.deleteImageConfirmOpen = false;
    $scope.imageToDelete = {};
  };

  $scope.proceedWithImageDelete = function() {
    $scope.deleteImageConfirmOpen = false;

    var imageToDelete = $scope.imageToDelete;

    fileManager.removeFile($scope.imageToDelete.filePath, function() {
      $scope.post.contentMarkdownHtml = $scope.post.contentMarkdownHtml.replace(imageToDelete.localUrl, DELETED_IMAGE_PLACEHOLDER);
      delete $scope.post.images[imageToDelete.id];
      savePost();
      logger.log("deleted image '" + imageToDelete.fileName + "'", "EditorController");
      $scope.imageToDelete = {};
    },

    function(error) {
      notify("error deleting image", error, false);
    });
  };

  $scope.addImageToPost = function(image) {};

  $scope.togglePublishStatus = function() {
    if ($scope.post.status === STATUS_DRAFT) {
      $scope.post.status = STATUS_PUBLISH;
      $scope.post.state.toBePublished = true;
    } else {
      $scope.post.status = STATUS_DRAFT;
      $scope.post.state.toBePublished = false;
    }
    savePost();
  }
};

EditorController.$inject = ['Post', '$scope', '$routeParams', '$filter', 'fileManager', 'wordpress', 'logger', 'resources', 'settings'];