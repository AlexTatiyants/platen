var MainController = function($scope, $dialog, $timeout, fileManager, resources, settings) {
  var FADE_DURATION = 3000;
  $scope.optionsPanelVisible = false;

  $scope.appStatus = {
    isProcessing: false,
    isSuccess: true,
    message: '',
    showMessage: false
  };

  fileManager.initialize();

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
      if (link.title !== themeName) {
        link.disabled = true;
      } else {
        link.disabled = false;
      }
    });

    settings.setSetting(settings.THEME, themeName);
    $scope.currentTheme = settings.getSetting(settings.THEME);
  };

  // initialize theme
  $scope.currentTheme = settings.getSetting(settings.THEME);
  $scope.autoSaveInterval = settings.getSetting(settings.AUTOSAVE_INTERVAL);
  $scope.switchTheme($scope.currentTheme);

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