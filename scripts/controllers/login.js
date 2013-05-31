var LoginController = function($scope, dialog, wordpress) {

  console.log("opening login dialog");

  wordpress.loadCredentials(function(login) {
    $scope.login = {
      url: login.url,
      username: login.username,
      password: login.password,
      rememberPassword: login.rememberPassword
    };
    $scope.$apply();
  });

  $scope.submit = function() {
    wordpress.saveCredentials($scope.login);
    console.log("closing login dialog");
    dialog.close();
  };

  $scope.resetCredentials = function() {
    wordpress.resetCredentials();
    console.log("closing login dialog");
    dialog.close();
  };

  $scope.cancel = function() {
    dialog.close();
  };
};

LoginController.$inject = ['$scope', 'dialog', 'wordpress'];