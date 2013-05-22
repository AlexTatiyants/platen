var EditorController = function(Post, $scope, $routeParams, $filter, fileManager, wordpress, logger, resources, settings) {
  var STATUS_DRAFT = 'draft';
  var STATUS_PUBLISH = 'publish';

  var POST_TITLE_ID = 'post-title';
  var POST_BODY_ID = 'post-content';
  var POST_HTML_ID = 'post-content-preview';
  var POST_EXCERPT_ID = 'post-excerpt';
  var POST_TAGS_ID = 'post-tags';
  var POST_CATEGORIES_ID = 'post-categories';

  var EDITABLE_ELEMENTS = [POST_TITLE_ID, POST_BODY_ID, POST_EXCERPT_ID, POST_TAGS_ID, POST_CATEGORIES_ID];
  var INSERTED_IMAGE_PLACEHOLDER = '[[!@#IMAGE_PLACEHOLDER#@!]]';
  var DELETED_IMAGE_PLACEHOLDER = "!! IMAGE DELETED !!";
  var MESSAGE_PREVIEW_HTML = 'Preview as HTML';
  var MESSAGE_PREVIEW_MARKDOWN = 'View Markdown';
  var IMAGE_TYPE = 'image/png';

  $scope.insertImageDialogOpen = false;
  $scope.configureImageDialogOpen = false;
  $scope.deleteImageConfirmOpen = false;

  var notifyOnCompletion = function(message, error, isSuccess) {
    if (error) {
      message += ": " + error;
    }
    logger.log(message, "EditorController");

    $scope.$emit(resources.events.PROCESSING_FINISHED, {
      message: message,
      success: isSuccess
    });
  };

  var setFonts = function() {
    $('#' + POST_TITLE_ID).css('font-family', settings.getSetting(settings.keys.postTitleFont));
    $('#' + POST_TITLE_ID).css('font-size', settings.getSetting(settings.keys.postTitleFontSize) + resources.typography.UNIT_OF_MEASURE);

    $('#' + POST_BODY_ID).css('font-family', settings.getSetting(settings.keys.postBodyFont));
    $('#' + POST_BODY_ID).css('font-size', settings.getSetting(settings.keys.postBodyFontSize) + resources.typography.UNIT_OF_MEASURE);
    $('#' + POST_BODY_ID).css('line-height', settings.getSetting(settings.keys.postBodyLineHeight) + resources.typography.UNIT_OF_MEASURE);

    $('#' + POST_HTML_ID).css('font-family', settings.getSetting(settings.keys.postHtmlFont));
    $('#' + POST_HTML_ID).css('font-size', settings.getSetting(settings.keys.postHtmlFontSize) + resources.typography.UNIT_OF_MEASURE);
    $('#' + POST_HTML_ID + ' h1').css('font-size', settings.getSetting(settings.keys.postHtmlH1FontSize) + resources.typography.UNIT_OF_MEASURE);
    $('#' + POST_HTML_ID + ' h2').css('font-size', settings.getSetting(settings.keys.postHtmlH2FontSize) + resources.typography.UNIT_OF_MEASURE);
    $('#' + POST_HTML_ID + ' h3').css('font-size', settings.getSetting(settings.keys.postHtmlH3FontSize) + resources.typography.UNIT_OF_MEASURE);
    $('#' + POST_HTML_ID + ' h4').css('font-size', settings.getSetting(settings.keys.postHtmlH4FontSize) + resources.typography.UNIT_OF_MEASURE);
    $('#' + POST_HTML_ID + ' h5').css('font-size', settings.getSetting(settings.keys.postHtmlH5FontSize) + resources.typography.UNIT_OF_MEASURE);
    $('#' + POST_HTML_ID + ' h6').css('font-size', settings.getSetting(settings.keys.postHtmlH6FontSize) + resources.typography.UNIT_OF_MEASURE);
    $('#' + POST_HTML_ID).css('line-height', settings.getSetting(settings.keys.postHtmlLineHeight) + resources.typography.UNIT_OF_MEASURE);
  };

  Post.initialize($routeParams.postId, function(post) {
    $scope.post = post;
    $scope.previewOn = false;
    $scope.showMetadata = false;
    $scope.previewMessage = MESSAGE_PREVIEW_HTML;

    logger.log("loaded post '" + $scope.post.title + "'", "EditorController");


    $scope.safeApply();
    $('#' + POST_TITLE_ID).focus();
    setFonts();

  }, function(error) {
    notifyOnCompletion("error loading post", error, false);
  });

  var savePost = function() {
    Post.save(function() {
      $scope.$apply();
      logger.log("saved post '" + $scope.post.title + "' on " + $scope.post.state.lastSaveDate, "EditorController");
    },

    function(error) {
      notifyOnCompletion("erorr saving post", error, false);
    });
  };

  $scope.$on(resources.events.ELEMENT_EDITED, function(event, elementId) {
    if (_.contains(EDITABLE_ELEMENTS, elementId)) {
      savePost();
    }
  });

  $scope.$on(resources.events.FONT_CHANGED, function(event) {
    setFonts();
  });

  var addImage = function(imageName, imageBlob, onSuccessCallback, onErrorCallback) {
    var fileName = imageName.replace(/[^a-z0-9]/gi, '_').toLowerCase();
    if (fileName.indexOf('.png') === -1) {
      fileName += '.png';
    }

    fileName += "." + new Date().getTime();

    var image = {
      id: new Date().getTime(),
      type: IMAGE_TYPE,
      name: imageName,
      fileName: fileName,
      filePath: resources.IMAGE_DIRECTORY_PATH + "/" + fileName,
      alignment: settings.getSetting(settings.keys.imageAlignment)
    };

    var contentMarkdownHtml = $scope.post.contentMarkdownHtml;

    fileManager.writeFile(image.filePath, imageBlob, function(fileEntry) {
      image.localUrl = fileEntry.toURL();

      var finishImageAdd = function() {
        image.markdownUrl = '![' + image.name + '](' + image.localUrl + ')';

        $scope.post.contentMarkdownHtml = contentMarkdownHtml.replace(INSERTED_IMAGE_PLACEHOLDER, image.markdownUrl);
        $scope.post.images[image.id] = image;

        savePost();
        image = {};
        notifyOnCompletion("image saved", null, true);
      };

      // code below is required to get the image width
      var img = new Image();

      img.onload = function() {
        image.width = img.width;
        finishImageAdd()
      }

      image.onerror = function() {
        finishImageAdd();
      };

      img.src = image.localUrl;

    },

    function(error) {
      notifyOnCompletion("error saving image", error, false);
    });
  };

  $scope.$on(resources.events.IMAGE_INSERTED, function(event, blob) {
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
      notifyOnCompletion("erorr updating post '" + $scope.post.title, error, false);
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
      setFonts();
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
    $scope.$emit(resources.events.PROCESSING_STARTED, {
      message: "starting upload to WordPress"
    });

    Post.sync(function() {
      notifyOnCompletion("finished upload to WordPress", null, true);
    }, function(error) {
      notifyOnCompletion("error uploading post '" + $scope.post.title + "'", error, false);
    });
  };

  $scope.getTags = function() {
    wordpress.getTags(function(result) {
      $scope.tags = result;
    }, function(error) {
      notifyOnCompletion("error loading tags from WordPress", error, false);
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
      notifyOnCompletion("error loading categories from WordPress", error, false);
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

  $scope.copyToClipboard = function(image) {
    var imageSnippet = document.createElement('span');
    imageSnippet.contentEditable = true;

    document.body.appendChild(imageSnippet);
    imageSnippet.innerText = image.markdownUrl;
    imageSnippet.focus();

    document.execCommand('SelectAll');
    document.execCommand("Copy", false, null);
    document.body.removeChild(imageSnippet);

    notifyOnCompletion("copied image to clipboard, use Shift+Ctrl+V to paste", null, true);
  };

  $scope.configureImage = function(image) {
    $scope.imageToConfigure = image;
    $scope.configureImageDialogOpen = true;
  };

  $scope.closeConfigureImage = function() {
    $scope.imageToConfigure = {};
    $scope.configureImageDialogOpen = false;
    savePost();
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
    }, function(error) {
      notifyOnCompletion("error deleting image", error, false);
    });
  };

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