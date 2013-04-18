var LoginController = function($scope, dialog, wordpress) {
  $scope.login = wordpress.login;

  $scope.submit = function() {
    dialog.close('ok');
  };
};

LoginController.$inject = ['$scope', 'dialog', 'wordpress'];