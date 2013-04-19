var LoginController = function($scope, dialog, wordpress) {
  $scope.login = wordpress.login;

  console.log($scope.login);
  $scope.submit = function() {
    dialog.close('ok');
  };
};

LoginController.$inject = ['$scope', 'dialog', 'wordpress'];