var ImagesController = function($scope, fileManager, logger, resources) {
  $scope.images = {};
  $scope.confirm = {};
  $scope.loaded = false;
  $scope.imageToDelete = {};

  var loadImages = function() {
    $scope.images = {};
    $scope.safeApply();

    fileManager.accessFilesInDirectory(resources.IMAGE_DIRECTORY_PATH, fileManager.directoryAccessActions.LIST, function(file) {
      var image = {};

      image.name = file.name;
      image.url = file.toURL();
      image.id = file.fullPath;
      image.path = file.fullPath;

      $scope.images[image.id] = image;

      $scope.$apply();
    }, function(error) {
      logger.log(error, "ImagesController");
      $scope.$emit(resources.events.PROCESSING_FINISHED, {
        message: "loading images failed",
        success: false
      });
    });

  };

  if (!$scope.loaded) {
    loadImages();
  }

  $scope.$on(resources.events.ALL_IMAGES_DELETED, function(event, args) {
    loadImages();
  });

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
      logger.log("deleted image '" + $scope.imageToDelete.title + "'", "ImagesController");
      $scope.imageToDelete = {};
      $scope.$apply();
    }, function(error) {
      $scope.$emit(resources.events.PROCESSING_FINISHED, {
        message: "failed to deleted image '" + $scope.postToDelete.title + "'",
        success: false
      });
    });
  };

};

ImagesController.$inject = ['$scope', 'fileManager', 'logger', 'resources'];