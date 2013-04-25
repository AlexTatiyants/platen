var MainController = function($scope, $dialog, fileManager) {
  fileManager.initialize();
  var d;

  $scope.loginCredentials = function() {
      d = $dialog.dialog({
        backdrop: true,
        keyboard: true,
        backdropClick: true,
        controller: 'LoginController',
        templateUrl: 'views/login.html'
      });

      d.open();
  };

};

MainController.$inject = ['$scope', '$dialog', 'fileManager'];