'use strict';

var EditorController = function($scope, $timeout, $filter) {
  var AUTOSAVE_INTERVAL = 6000;

  $scope.post = {};

  $scope.post.id = new Date().getTime();
  $scope.status = {};
  $scope.post.title='UNTITLED';

  $scope.autoSave = function(){
    writeFile($scope.post);
    t = $timeout($scope.autoSave,AUTOSAVE_INTERVAL);
  }
  var t = $timeout($scope.autoSave,AUTOSAVE_INTERVAL);


	// $scope.update = function () {
	// 	$scope.post.htmlContent = marked($scope.post.rawContent);
	// 	console.log($scope.post);
	// }

  var writeFile = function(post) {
    if (!fs) {
      return;
    }

    fs.root.getDirectory(FOLDERNAME, {create: true}, function(dirEntry) {
      dirEntry.getFile(post.id, {create: true, exclusive: false}, function(fileEntry) {
        
        fileEntry.createWriter(function(fileWriter) {

          var blob = new Blob([post.toString()]);

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