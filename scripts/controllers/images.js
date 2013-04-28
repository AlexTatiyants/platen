var ImagesController = function($scope, fileManager, logger, resources) {
  $scope.images = {};
  $scope.confirm = {};
  $scope.loaded = false;
  $scope.imageToDelete = {};

  if (!$scope.loaded) {
    fileManager.listFilesinDirectory(resources.IMAGE_DIRECTORY_PATH, function(entry) {
      var image = {};

      image.name = entry.name;
      image.url = entry.toURL();
      image.id = entry.fullPath;
      image.path = entry.fullPath;

      $scope.images[image.id] = image;

      $scope.$apply();
    });
  };

  $scope.deleteImage = function(image) {
    $scope.imageToDelete = image;
    $scope.deleteImageConfirmOpen = true;
  };

  $scope.cancelDelete = function() {
    $scope.deleteImageConfirmOpen = false;
    $scope.imageToDelete = {};
  };

  $scope.proceedWithDelete = function() {
    $scope.deleteImageConfirmOpen = false;
    fileManager.removeFile($scope.imageToDelete.path, function() {
      delete $scope.images[$scope.imageToDelete.id];
      logger.log("deleted image  '" + $scope.imageToDelete.title + "'", "ImagesController");
      $scope.imageToDelete = {};
      $scope.$apply();
    });
  };

  $scope.deleteAll = function() {
    fileManager.clearDirectory(resources.IMAGE_DIRECTORY_PATH, function() {
      logger.log("deleted all images", "ImagesController");
      $scope.images = {};
    });
  };
};

ImagesController.$inject = ['$scope', 'fileManager', 'logger', 'resources'];