var MainController = function($scope, fileManager) {
  fileManager.initialize();
};

MainController.$inject = ['$scope', 'fileManager'];