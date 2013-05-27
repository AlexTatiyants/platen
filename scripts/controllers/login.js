var LoginController = function($scope, dialog, wordpress) {

  console.log("opening login dialog");

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
    wordpress.resetCredentials();
    dialog.close();
  };

  $scope.cancel = function() {
    dialog.close();
  };
};

LoginController.$inject = ['$scope', 'dialog', 'wordpress'];