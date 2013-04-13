angular.module('platen.services').factory('fileManager', function() {
  var fs;

  var onError = function(e, step) {
    var msg = '';

    switch (e.code) {
      case FileError.QUOTA_EXCEEDED_ERR:
        msg = 'QUOTA_EXCEEDED_ERR';
        break;
      case FileError.NOT_FOUND_ERR:
        msg = 'NOT_FOUND_ERR';
        break;
      case FileError.SECURITY_ERR:
        msg = 'SECURITY_ERR';
        break;
      case FileError.INVALID_MODIFICATION_ERR:
        msg = 'INVALID_MODIFICATION_ERR';
        break;
      case FileError.INVALID_STATE_ERR:
        msg = 'INVALID_STATE_ERR';
        break;
      default:
        msg = 'Unknown Error';
        break;
    };

    console.log('Error: ' + msg, step);
  };

  var handleFile = function(filePath, shouldCreate, action) {
    if (fs) {
      fs.root.getFile(filePath, {
        create: shouldCreate
      }, action, function(e) {
        onError(e, "in handleFile(), while getting file path " + filePath);
      });
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
        fs.root.getDirectory(directoryPath, {
          create: true
        }, function(dirEntry) {
          var dirReader = dirEntry.createReader();
          dirReader.readEntries(function(entries) {
            _.each(entries, function(entry) {
              if (entry.isFile) {
                handleFile(entry.fullPath, false, function(fileEntry) {
                  fileEntry.file(function(file) {
                    var reader = new FileReader();
                    reader.onloadend = onSuccess;
                    reader.readAsText(file);
                  }, function(e) {
                    onError(e, "in readFilesInDirectory, while getting file " + entry.fullPath);
                  });
                });
              }
            })
          }, function(e) {
            onError(e, "in readFilesInDirectory, while reading entries from " + directoryPath);
          });
        }, function(e) {
          onError(e, "in readFilesInDirectory, while getting directory " + directoryPath);
        });
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
                    console.log("removed file " + entry.fullPath);
                  }, function(e) {
                    onError(e, "while removing file " + entry.fullPath);
                  });
                });
              }
            })
          }, function(e) {
            onError(e, "in clearDirectory, while reading entries for " + directoryPath);
          });
        }, function(e) {
          onError(e, "in clearDirectory(), while getting directory " + directoryPath);
        });
      }
    },

    writeFile: function(filePath, fileName, fileBody, onSuccessCallback) {
      handleFile(filePath, true, function(fileEntry) {
        fileEntry.createWriter(function(fileWriter) {
          var blob = new Blob([fileBody], {
            type: 'text/javascript'
          });
          fileWriter.onerror = onError;
          fileWriter.onwriteend = onSuccessCallback(fileEntry);
          fileWriter.write(blob);
        }, function(e) {
          onError(e, "in writeFile(), while creating fileWriter for " + filePath + "/" + fileName);
        });
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
        }, function(e) {
          onError(e, "in readingFile(), while reading file " + filePath);
        });
      });
    },

    removeFile: function(filePath, onSuccess) {
      handleFile(filePath, false, function(fileEntry) {
        fileEntry.remove(onSuccess, function(e) {
          onError(e, "in removeFile(), while reading file " + filePath);
        });
      });
    }
  };
});