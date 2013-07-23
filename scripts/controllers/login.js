var LoginController = function($scope, dialog, wordpress) {
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
    // Ensure that the url starts with a http, if it isn't already specified
    if(!/^https?:\/\//i.test($scope.login.url)) {
      $scope.login.url = 'http://' + $scope.login.url;
    }
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