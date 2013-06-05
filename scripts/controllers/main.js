var MainController = function($rootScope, $scope, $dialog, $timeout, fileManager, logger, resources, settings) {
  var FADE_DURATION = 3000;
  $scope.optionsPanelVisible = false;
  $scope.aboutDialogOpen = false;
  $scope.fonts = [];
  $scope.settings = {};
  $scope.themes = settings.themes;
  $scope.systemFontsAvailable = false;

  $scope.appStatus = {
    isProcessing: false,
    isSuccess: true,
    message: 'everything is cool',
    showMessage: false
  };

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

  fileManager.initialize(function(e) {
    fileManager.createDirectory(resources.POST_DIRECTORY_PATH, function() {
      logger.log("created posts directory", "MainController");
    }, function(error) {
      notify("error creating posts directory", error, false);
    });

    fileManager.createDirectory(resources.IMAGE_DIRECTORY_PATH, function() {
      logger.log("created images directory", "MainController");
    }, function(error) {
      notify("error creating images directory", error, false);
    });
  }, function(error) {
    notify("error initializing file system", error, false);
  });

  _.each(settings.fonts, function(font) {
    $scope.fonts.push(font);
  });

  if (chrome.fontSettings) {
    logger.log("adding system fonts", "MainController");
    $scope.systemFontsAvailable = true;

    chrome.fontSettings.getFontList(function(fonts) {

      // add available system fonts
      var lowerCasedFonts = settings.fonts.map(function(font) {
          return font.toLowerCase();
      });

      _.each(fonts, function(font) {
        if (_.indexOf(lowerCasedFonts, font.fontId.toLowerCase()) === -1) {
          $scope.fonts.push(font.fontId);
        }
      });
    });
  }

  settings.load(function(settings) {
    $scope.settings = settings;
    $scope.switchTheme($scope.settings.theme);
    $scope.$broadcast(resources.events.FONT_CHANGED);
    $scope.safeApply();
  });

  $scope.switchTheme = function(themeName) {
    _.each($('link'), function(link) {
      link.disabled = (link.title !== themeName);
    });

    $scope.settings.theme = themeName;

    settings.save($scope.settings, function() {
      logger.log("set theme to " + $scope.settings.theme, "MainController");
    });
  };

  $scope.resetFonts = function() {
    $scope.settings.postTitleFont = settings.defaults.postTitleFont;
    $scope.settings.postTitleFontSize = settings.defaults.postTitleFontSize;
    $scope.settings.postBodyFont = settings.defaults.postBodyFont;
    $scope.settings.postBodyFontSize = settings.defaults.postBodyFontSize;
    $scope.settings.postBodyLineHeight = settings.defaults.postBodyLineHeight;
    $scope.settings.postHtmlFont = settings.defaults.postHtmlFont;
    $scope.settings.postHtmlFontSize = settings.defaults.postHtmlFontSize;
    $scope.settings.postHtmlH1FontSize = settings.defaults.postHtmlH1FontSize;
    $scope.settings.postHtmlH2FontSize = settings.defaults.postHtmlH2FontSize;
    $scope.settings.postHtmlH3FontSize = settings.defaults.postHtmlH3FontSize;
    $scope.settings.postHtmlH4FontSize = settings.defaults.postHtmlH4FontSize;
    $scope.settings.postHtmlH5FontSize = settings.defaults.postHtmlH5FontSize;
    $scope.settings.postHtmlH6FontSize = settings.defaults.postHtmlH6FontSize;
    $scope.settings.postHtmlLineHeight = settings.defaults.postHtmlLineHeight;

    settings.save($scope.settings, function() {
      logger.log("reset fonts", "MainController");
      $scope.$broadcast(resources.events.FONT_CHANGED);
    });
  };

  $scope.saveFont = function(font, item) {
    settings.save($scope.settings, function() {
      $scope.$broadcast(resources.events.FONT_CHANGED);
    });
  };

  $scope.changeFontSize = function(fontSize, incrementDirection) {
    var increment = (resources.typography.INCREMENT * incrementDirection);
    $scope.settings[fontSize] = parseFloat($scope.settings[fontSize]) + increment;

    if (fontSize === 'postHtmlFontSize') {
      $scope.settings.postHtmlH1FontSize = $scope.settings.postHtmlH1FontSize + increment;
      $scope.settings.postHtmlH2FontSize = $scope.settings.postHtmlH2FontSize + increment;
      $scope.settings.postHtmlH3FontSize = $scope.settings.postHtmlH3FontSize + increment;
      $scope.settings.postHtmlH4FontSize = $scope.settings.postHtmlH4FontSize + increment;
      $scope.settings.postHtmlH5FontSize = $scope.settings.postHtmlH5FontSize + increment;
      $scope.settings.postHtmlH6FontSize = $scope.settings.postHtmlH6FontSize + increment;
    }

    settings.save($scope.settings, function() {
      $scope.$broadcast(resources.events.FONT_CHANGED);
    });
  };

  $scope.changeLineHeight = function(lineHeight, incrementDirection) {
    var increment = (resources.typography.INCREMENT * incrementDirection);
    $scope.settings[lineHeight] = parseFloat($scope.settings[lineHeight]) + increment;

    settings.save($scope.settings, function() {
      $scope.$broadcast(resources.events.FONT_CHANGED);
    });
  };

  $scope.loginCredentials = function() {
    $dialog.dialog({
      controller: 'LoginController',
      templateUrl: 'views/modals/login.html'
    }).open();
  };

  $scope.toggleOptionsPanel = function() {
    $scope.optionsPanelVisible = !$scope.optionsPanelVisible;
  };

  $scope.showMessage = function() {
    $scope.appStatus.showMessage = true;
    $timeout(function(e) {
      $scope.appStatus.showMessage = false;
    }, FADE_DURATION);
  };

  $scope.$on(resources.events.PROCESSING_STARTED, function(event, message) {
    $scope.appStatus.isProcessing = true;
    $scope.appStatus.showMessage = false;
    $scope.appStatus.message = message;
  });

  $scope.$on(resources.events.PROCESSING_FINISHED, function(event, args) {
    $scope.appStatus.isProcessing = false;
    $scope.appStatus.message = args.message;
    $scope.appStatus.isSuccess = args.success;
    $scope.showMessage();

    $scope.safeApply();
  });

  $scope.startProcessing = function() {
    $scope.$emit(resources.events.PROCESSING_STARTED, "starting something");
  };

  $scope.stopProcessingWithFail = function() {
    $scope.$emit(resources.events.PROCESSING_FINISHED, {
      message: "bad things happened",
      success: false
    });
  };

  $scope.stopProcessingwithSuccess = function() {
    $scope.$emit(resources.events.PROCESSING_FINISHED, {
      message: "good things happened",
      success: true
    });
  };

  $scope.dismissMessage = function() {
    $scope.appStatus.showMessage = false;
  };

  $scope.showAboutDialog = function() {
    $scope.aboutDialogOpen = true;
  };

  $scope.closeAboutDialog = function() {
    $scope.aboutDialogOpen = false;
  };

  $scope.deleteAllPosts = function() {
    $scope.deleteAllPostsConfirmOpen = true;
  };

  $scope.cancelAllPostsDelete = function() {
    $scope.deleteAllPostsConfirmOpen = false;
  };

  $scope.proceedWithAllPostsDelete = function() {
    fileManager.accessFilesInDirectory(resources.POST_DIRECTORY_PATH, fileManager.directoryAccessActions.REMOVE, function(file) {
      logger.log("deleted all posts", "MainController");

      $scope.$emit(resources.events.PROCESSING_FINISHED, {
        message: "all posts removed",
        success: true
      });

      $scope.$broadcast(resources.events.ALL_POSTS_DELETED);

    }, function(error) {
      logger.log("error removing all posts: " + error, "MainController");

      $scope.$emit(resources.events.PROCESSING_FINISHED, {
        message: "removing posts failed",
        success: false
      });
    });
    $scope.deleteAllPostsConfirmOpen = false;
  };

  $scope.deleteAllImages = function() {
    $scope.deleteAllImagesConfirmOpen = true;
  };

  $scope.cancelAllImagesDelete = function() {
    $scope.deleteAllImagesConfirmOpen = false;
  };

  $scope.proceedWithAllImagesDelete = function() {
    fileManager.accessFilesInDirectory(resources.IMAGE_DIRECTORY_PATH, fileManager.directoryAccessActions.REMOVE, function(file) {
      logger.log("deleted all images", "ImagesController");

      $scope.$emit(resources.events.PROCESSING_FINISHED, {
        message: "all images removed",
        success: true
      });

      $scope.$broadcast(resources.events.ALL_IMAGES_DELETED);

    }, function(error) {
      logger.log("error removing all images: " + error, "ImagesController");

      $scope.$emit(resources.events.PROCESSING_FINISHED, {
        message: "removing images failed",
        success: false
      });
    });
    $scope.deleteAllImagesConfirmOpen = false;
  };

  $rootScope.safeApply = $scope.safeApply = function(fn) {
    var phase = this.$root.$$phase;
    if (phase == '$apply' || phase == '$digest') {
      if (fn && (typeof(fn) === 'function')) {
        fn();
      }
    } else {
      this.$apply(fn);
    }
  };
};

MainController.$inject = ['$rootScope', '$scope', '$dialog', '$timeout', 'fileManager', 'logger', 'resources', 'settings'];