'use strict';

var fs = null;
var FOLDERNAME = 'platen';

function onError(e) {
  console.log(e);
}

var fs = null;
var FOLDERNAME = 'test';

function writeFile(post) {
  if (!fs) {
    return;
  }

  fs.root.getDirectory(FOLDERNAME, {create: true}, function(dirEntry) {
    dirEntry.getFile(post.title, {create: true, exclusive: false}, function(fileEntry) {
      // Create a FileWriter object for our FileEntry, and write out blob.

      fileEntry.createWriter(function(fileWriter) {
        var blob = new Blob([post.toString()]);

        fileWriter.onerror = onError;
        fileWriter.onwriteend = function(e) {
          console.log('Write completed.');
        };
        fileWriter.write(blob);
      }, onError);
    }, onError);
  }, onError);
}

var EditorController = function($scope, $timeout) {
    var AUTOSAVE_INTERVAL = 3000;

    $scope.post = {};

    $scope.post.title='UNTITLED';

    $scope.autoSave = function(){
        console.log("autosaving");
        writeFile($scope.post);
        t = $timeout($scope.autoSave,AUTOSAVE_INTERVAL);
    }
    var t = $timeout($scope.autoSave,AUTOSAVE_INTERVAL);


	// $scope.update = function () {
	// 	$scope.post.htmlContent = marked($scope.post.rawContent);
	// 	console.log($scope.post);
	// }

	$('#post-title').focus();
};

EditorController.$inject = ['$scope', '$timeout'];


document.addEventListener('DOMContentLoaded', function(e) {
  window.webkitRequestFileSystem(TEMPORARY, 1024 * 1024, function(localFs) {
    fs = localFs;
  }, onError);
});