var ImagesController = function($scope, fileManager, logger, resources) {
  $scope.images = {};
  $scope.confirm = {};
  $scope.loaded = false;
  $scope.imageToDelete = {};

  if (!$scope.loaded) {
    fileManager.accessFilesInDirectory(

    resources.POST_DIRECTORY_PATH,
    fileManager.directoryAccessActions.READ_FILE,

    function(file) {
      // on success
      var image = {};

      image.name = entry.name;
      image.url = entry.toURL();
      image.id = entry.fullPath;
      image.path = entry.fullPath;

      $scope.images[image.id] = image;

      $scope.$apply();
    },

    function(error) {
      // on error
      logger.log(error, "ImagesController");
      $scope.$emit(resources.events.PROCESSING_FINISHED, {
        message: "loading images failed",
        success: false
      });
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
    fileManager.removeFile($scope.imageToDelete.path,

    function() {
      // on success
      delete $scope.images[$scope.imageToDelete.id];
      logger.log("deleted image '" + $scope.imageToDelete.title + "'", "ImagesController");
      $scope.imageToDelete = {};
      $scope.$apply();
    },

    function(error) {
      // on error
      $scope.$emit(resources.events.PROCESSING_FINISHED, {
        message: "failed to deleted image '" + $scope.postToDelete.title + "'",
        success: false
      });
    });
  };
};

ImagesController.$inject = ['$scope', 'fileManager', 'logger', 'resources'];