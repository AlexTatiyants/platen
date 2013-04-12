var EditorController = function($scope, $timeout, $filter, fileManager, resources) {
  var AUTOSAVE_INTERVAL = 6000;

  $scope.post = {};
  $scope.status = {};

  $scope.post.title = 'UNTITLED';

  // $scope.autoSave = function() {
  //   writeFile($scope.post);
  //   t = $timeout($scope.autoSave, AUTOSAVE_INTERVAL);
  // }
  // var t = $timeout($scope.autoSave, AUTOSAVE_INTERVAL);


  // $scope.update = function () {
  // 	$scope.post.htmlContent = marked($scope.post.rawContent);
  // 	console.log($scope.post);
  // }

  $scope.writeFile = function() {
    if (!$scope.post.id) {
      $scope.post.id = new Date().getTime();
      $scope.post.path = "/" + resources.POST_DIRECTORY_PATH + '/' + $scope.post.id;
      $scope.post.createdDate = new Date();
    }

    fileManager.writeFile($scope.post.path, $scope.post.id, JSON.stringify($scope.post), function(fileEntry) {
      $scope.status.autoSaveTime = $filter('date')(new Date(), 'shortTime');
    });
  };

  $('#post-title').focus();
};

EditorController.$inject = ['$scope', '$timeout', '$filter', 'fileManager', 'resources'];