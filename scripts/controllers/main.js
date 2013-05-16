var MainController = function($scope, $dialog, $timeout, fileManager, logger, resources, settings) {
  var FADE_DURATION = 3000;
  $scope.optionsPanelVisible = false;
  $scope.aboutDialogOpen = false;
  $scope.fonts = [];
  $scope.settings = {};

  $scope.themes = settings.themes;

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


  /* initialize font list */

  // add local fonts installed by the app
  $scope.fonts.push('economica');
  $scope.fonts.push('inconsolata');
  $scope.fonts.push('goudy');
  $scope.fonts.push('merriweather');

  chrome.fontSettings.getFontList(function(fonts) {
    // add available system fonts
    _.each(fonts, function(font) {
      $scope.fonts.push(font.fontId);
    });
  });

  $scope.settingsKeys = settings.keys;

  $scope.settings.postTitleFont = settings.getSetting(settings.keys.postTitleFont);
  $scope.settings.postTitleFontSize = settings.getSetting(settings.keys.postTitleFontSize);
  $scope.settings.postBodyFont = settings.getSetting(settings.keys.postBodyFont);
  $scope.settings.postBodyFontSize = settings.getSetting(settings.keys.postTitleFontSize);
  $scope.settings.postHtmlFont = settings.getSetting(settings.keys.postHtmlFont);
  $scope.settings.postHtmlFontSize = settings.getSetting(settings.keys.postHtmlFontSize);


  $scope.loginCredentials = function() {
    $dialog.dialog({
      backdrop: true,
      keyboard: true,
      backdropClick: true,
      controller: 'LoginController',
      templateUrl: 'views/modals/login.html'
    }).open();
  };

  $scope.switchTheme = function(themeName) {
    _.each($('link'), function(link) {
      link.disabled = (link.title !== themeName);
    });

    settings.setSetting(settings.THEME, themeName);
    $scope.settings.currentTheme = settings.getSetting(settings.THEME);
  };

  $scope.saveFont = function(font, item) {
    settings.setSetting(item, font);
    $scope.$broadcast(resources.events.FONT_CHANGED);
  };

  $scope.increaseFontSize = function(fontSize) {
    var currentSize = parseFloat(settings.getSetting(fontSize));
    settings.setSetting(fontSize, currentSize + 1);
    $scope.$broadcast(resources.events.FONT_CHANGED);
  };

  $scope.decreaseFontSize = function(fontSize) {
    var currentSize = parseFloat(settings.getSetting(fontSize));
    settings.setSetting(fontSize, currentSize - 1);
    $scope.$broadcast(resources.events.FONT_CHANGED);
  };

  $scope.increaseLineHeight = function(lineHeight) {
    var currentHeight = parseFloat(settings.getSetting(lineHeight));
    settings.setSetting(lineHeight, currentHeight + 1);
    $scope.$broadcast(resources.events.FONT_CHANGED);
  };

  $scope.decreaseLineHeight = function(lineHeight) {
    var currentHeight = parseFloat(settings.getSetting(lineHeight));
    settings.setSetting(lineHeight, currentHeight - 1);
    $scope.$broadcast(resources.events.FONT_CHANGED);
  };


  // initialize theme
  $scope.settings.currentTheme = settings.getSetting(settings.THEME);
  $scope.autoSaveInterval = settings.getSetting(settings.AUTOSAVE_INTERVAL);
  $scope.switchTheme($scope.settings.currentTheme);

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
    fileManager.accessFilesInDirectory(resources.POST_DIRECTORY_PATH, fileManager.directoryAccessActions.REMOVE, function(file) {
      logger.log("deleted all posts", "MainController");

      $scope.postsList = [];
      $scope.$emit(resources.events.PROCESSING_FINISHED, {
        message: "all posts removed",
        success: true
      });

    }, function(error) {
      logger.log("error removing all posts: " + error, "MainController");

      $scope.$emit(resources.events.PROCESSING_FINISHED, {
        message: "removing posts failed",
        success: false
      });
    });
  };

  $scope.deleteAllIMages = function() {
    fileManager.accessFilesInDirectory(resources.IMAGE_DIRECTORY_PATH, fileManager.directoryAccessActions.REMOVE, function(file) {
      logger.log("deleted all images", "ImagesController");
      $scope.images = {};
      $scope.$emit(resources.events.PROCESSING_FINISHED, {
        message: "all images removed",
        success: true
      });
    }, function(error) {
      logger.log("error removing all images: " + error, "ImagesController");

      $scope.$emit(resources.events.PROCESSING_FINISHED, {
        message: "removing images failed",
        success: false
      });
    });
  };



  $scope.safeApply = function(fn) {
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

MainController.$inject = ['$scope', '$dialog', '$timeout', 'fileManager', 'logger', 'resources', 'settings'];