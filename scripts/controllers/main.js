var MainController = function($scope, fileManager, $modal) {
  fileManager.initialize();

  $scope.modal = {
    content: 'Hello Modal',
    saved: false
  };

  $scope.viaService = function() {
    var modal = $modal({
      template: 'views/pages/modal.html',
      show: true,
      backdrop: 'static'
    });
  }
  
  $scope.parentController = function(dismiss) {
    console.warn(arguments);
    // do something
    dismiss();
  }

  $scope.dismiss = function() {
    console.log("dismissing");
    dismiss();
  }
};

MainController.$inject = ['$scope', 'fileManager', '$modal'];