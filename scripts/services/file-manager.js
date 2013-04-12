angular.module('platen.services').factory('fileManager', function() {
  var fs;

  var onError = function(e) {
    console.log(e);
  };

  var handleFile = function(filePath, shouldCreate, action) {
    if (fs) {
      fs.root.getFile(filePath, {
        create: shouldCreate
      }, action, onError);
    }
  };

  return {
    initialize: function() {
      window.webkitRequestFileSystem(PERSISTENT, 1024 * 1024, function(localFs) {
        fs = localFs;
      });
    },

    readFilesInDirectory: function(directoryPath, onSuccess) {
      if (fs) {
        fs.root.getDirectory(directoryPath, {}, function(dirEntry) {
          var dirReader = dirEntry.createReader();
          dirReader.readEntries(function(entries) {
            _.each(entries, function(entry) {
              if (entry.isFile) {
                handleFile(entry.fullPath, false, function(fileEntry) {
                  fileEntry.file(function(file) {
                    var reader = new FileReader();
                    reader.onloadend = onSuccess;
                    reader.readAsText(file);
                  }, onError);
                });
              }
            })
          }, onError);
        }, onError);
      }
    },

    clearDirectory: function(directoryPath) {
      if (fs) {
        fs.root.getDirectory(directoryPath, {}, function(dirEntry) {
          var dirReader = dirEntry.createReader();
          dirReader.readEntries(function(entries) {
            _.each(entries, function(entry) {
              if (entry.isFile) {
                handleFile(entry.fullPath, false, function(fileEntry) {
                  fileEntry.remove(function() {
                    console.log("removed " + entry.fullPath);
                  }, onError);
                });
              }
            })
          }, onError);
        }, onError);
      }
    },

    writeFile: function(filePath, fileName, fileBody, onSuccessCallback) {
      handleFile(filePath, true, function(fileEntry) {
        fileEntry.createWriter(function(fileWriter) {
          var blob = new Blob([fileBody], {type: 'text/javascript'});
          fileWriter.onerror = onError;
          fileWriter.onwriteend = onSuccessCallback(fileEntry);
          fileWriter.write(blob);
        }, onError);
      });
    },

    readFile: function(filePath, getResultCallback) {
      handleFile(filePath, false, function(fileEntry) {
        fileEntry.file(function(file) {
          var reader = new FileReader();

          reader.onload = function(e) {
            getResultCallback(e.target.result);
          };

          reader.readAsText(file);
        }, onError);
      });
    },

    removeFile: function(filePath, onSuccess) {
      handleFile(filePath, false, function(fileEntry) {
        fileEntry.remove(onSuccess, onError);
      });
    }
  };
});