var LoginController = function($scope, dialog, wordpress) {
  $scope.login = wordpress.login;
  console.log("in login controller");

  $scope.submit = function() {
    dialog.close('ok');
  };

  $scope.resetCredentials = function() {
    wordpress.resetCredentials();
    dialog.close();
  };

  $scope.cancel = function() {
    dialog.close();
  }
};

LoginController.$inject = ['$scope', 'dialog', 'wordpress'];