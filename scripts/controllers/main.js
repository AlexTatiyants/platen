var MainController = function($scope, $dialog, fileManager, resources) {
  $scope.appStatus = {
    isProcessing: false,
    isSuccess: true,
    message: ''
  }

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
    $scope.appStatus.message = message;
  })

  $scope.$on(resources.events.PROCESSING_FINISHED, function(event, args) {
    $scope.appStatus.isProcessing = false;
    $scope.appStatus.message = args.message;
    $scope.appStatus.isSuccess = args.success;
    // if (!isSucess) {
    //   alert("OOPS:  " + message);
    // }
  });

  $scope.startProcessing = function() {
    $scope.$emit(resources.events.PROCESSING_STARTED, "starting something");
  }

  $scope.stopProcessing = function() {
    $scope.$emit(resources.events.PROCESSING_FINISHED, {message: "bad things happened", success: false});
  }
};

MainController.$inject = ['$scope', '$dialog', 'fileManager', 'resources'];