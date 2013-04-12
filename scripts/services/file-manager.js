var fileManagerFactory = function($q) {
  var POSTS_FOLDER_PATH = 'posts';
  var fs = null;

  var createConfig = {create: true};
  var noCreateConfig = {create: false};

  var onError = function(e) {
    console.log(e);
  };

  var obtainFs = function() {
    var deferred = $q.defer();

    window.webkitRequestFileSystem(PERSISTENT, 1024 * 1024, function(localFs) {
      fs = localFs;
      deferred.resolve();
    });

    return deferred.promise;
  };

  var loadFiles = function(directoryPath, onSuccess) {
    fs.root.getDirectory(directoryPath, {}, function(dirEntry) {

      var dirReader = dirEntry.createReader();

      dirReader.readEntries(function(entries) {
        for (var i = 0; i < entries.length; i++) {
          var entry = entries[i];
          if (entry.isFile) {
            fs.root.getFile(entry.fullPath, {}, function(fileEntry) {
              fileEntry.file(function(file) {
                var reader = new FileReader();
                reader.onloadend = onSuccess;
                reader.readAsText(file);
              }, onError);
            }, onError);
          }
        }
      }, onError);
    }, onError)
  };

  return {
    initialize: function() {
      obtainFs();
    },

    readFiles: function(directoryPath, onSuccess) {
      if (!fs) {
        var promise = obtainFs();
        promise.then(loadFiles(directoryPath, onSuccess));
      } else {
        loadFiles(directoryPath, onSuccess);
      };
    },

    writeFile: function(filePath, fileName, fileBody, onSuccess) {
      if (!fs) {
        return;
      };

      fs.root.getDirectory(filePath, createConfig, function(dirEntry) {
        dirEntry.getFile(fileName, createConfig, function(fileEntry) {

          fileEntry.createWriter(function(fileWriter) {
            var blob = new Blob([fileBody], {
              type: 'text/javascript'
            });
            fileWriter.onerror = onError;
            fileWriter.onwriteend = onSuccess(fileEntry);
            fileWriter.write(blob);
          }, onError);
        }, onError);
      }, onError);
    },

    removeFile: function(filePath, onSuccess) {
      fs.root.getFile(filePath, noCreateConfig, function(fileEntry) {
        fileEntry.remove(onSuccess, onError);
      }, onError);
    }
  };
};

fileManagerFactory.$inject = ['$q'];

angular.module('platen.services').factory('fileManager', fileManagerFactory);