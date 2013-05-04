var LoginController = function($scope, dialog, wordpress) {

  $scope.login = {
    url: wordpress.login.url,
    username: wordpress.login.username,
    password: wordpress.login.password,
    rememberCredentials: wordpress.login.rememberCredentials
  };

  $scope.submit = function() {
    wordpress.saveCredentials($scope.login);
    dialog.close();
  };

  $scope.resetCredentials = function() {
    $scope.login.url = '';
    $scope.login.username = '';
    $scope.login.password = '';

    wordpress.saveCredentials($scope.login);
    dialog.close();
  };

  $scope.cancel = function() {
    dialog.close();
  }
};

LoginController.$inject = ['$scope', 'dialog', 'wordpress'];