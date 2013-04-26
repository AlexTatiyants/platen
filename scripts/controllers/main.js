var MainController = function($scope, $dialog, fileManager, resources, logger) {

  fileManager.initialize();

  fileManager.createDirectory(resources.POST_DIRECTORY_PATH, function() {
    logger.log("created directory for " + resources.POST_DIRECTORY_PATH, "MainController");
  });

  fileManager.createDirectory(resources.IMAGE_DIRECTORY_PATH, function() {
    logger.log("created directory for " + resources.IMAGE_DIRECTORY_PATH, "MainController");
  });

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

MainController.$inject = ['$scope', '$dialog', 'fileManager', 'resources', 'logger'];