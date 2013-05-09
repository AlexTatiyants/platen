var MainController = function($scope, $dialog, $timeout, fileManager, resources, settings) {
  var FADE_DURATION = 3000;
  $scope.optionsPanelVisible = false;
  $scope.fonts = [];
  $scope.settings = {};

  $scope.appStatus = {
    isProcessing: false,
    isSuccess: true,
    message: '',
    showMessage: false
  };

  fileManager.initialize();

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

MainController.$inject = ['$scope', '$dialog', '$timeout', 'fileManager', 'resources', 'settings'];