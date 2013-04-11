var EditorController = function($scope, $timeout, $filter) {
  var AUTOSAVE_INTERVAL = 6000;

  $scope.post = {};
  $scope.status = {};

  $scope.post.id = new Date().getTime();
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

    if (!fs) {
      return;
    }

    fs.root.getDirectory(POSTS_FOLDER_PATH, {
      create: true
    }, function(dirEntry) {
      dirEntry.getFile($scope.post.id, { create: true, exclusive: false }, function(fileEntry) {

        fileEntry.createWriter(function(fileWriter) {

          $scope.post.savedAt = new Date();
          var contents = JSON.stringify($scope.post);
          var blob = new Blob([contents], {type:'text/javascript'});

          fileWriter.onerror = onError;
          fileWriter.onwriteend = function(e) {
            $scope.status.autoSaveTime = $filter('date')(new Date(), 'shortTime');
          };
          fileWriter.write(blob);
        }, onError);
      }, onError);
    }, onError);
  };

  $('#post-title').focus();
};

EditorController.$inject = ['$scope', '$timeout', '$filter'];