var MainController = function($scope, $dialog, $timeout, fileManager, resources) {

  var FADE_DURATION = 3000;
  $scope.appStatus = {
    isProcessing: false,
    isSuccess: true,
    message: '',
    showMessage: false
  };

  fileManager.initialize();

  var d;

  $scope.loginCredentials = function() {
    d = $dialog.dialog({
      backdrop: true,
      keyboard: true,
      backdropClick: true,
      controller: 'LoginController',
      templateUrl: 'views/modals/login.html'
    });

    d.open();
  };

  $scope.$on(resources.events.PROCESSING_STARTED, function(event, message) {
    $scope.appStatus.isProcessing = true;
    $scope.appStatus.isSuccess = true;
    $scope.appStatus.message = message;
  });

  $scope.$on(resources.events.PROCESSING_FINISHED, function(event, args) {
    $scope.appStatus.isProcessing = false;
    $scope.appStatus.message = args.message;
    $scope.appStatus.isSuccess = args.success;
    $scope.appStatus.showMessage = true;
    $scope.safeApply();

    $timeout(function(e) {
      $scope.appStatus.showMessage = false;
    }, FADE_DURATION);
  });

  $scope.startProcessing = function() {
    $scope.$emit(resources.events.PROCESSING_STARTED, "starting something");
  };

  $scope.stopProcessing = function() {
    $scope.$emit(resources.events.PROCESSING_FINISHED, {
      message: "bad things happened",
      success: false
    });
  };

  $scope.resetError = function() {
    $scope.appStatus.message = '';
    $scope.appStatus.isProcessing = false;
    $scope.appStatus.isSuccess = true;
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

MainController.$inject = ['$scope', '$dialog', '$timeout', 'fileManager', 'resources'];