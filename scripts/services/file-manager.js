angular.module('platen.services').factory('fileManager', function() {
  var fs;

  var onError = function(e, step) {
    var msg = '';

    switch (e.code) {
      case FileError.QUOTA_EXCEEDED_ERR:
        msg = 'Quota Exceeded';
        break;
      case FileError.NOT_FOUND_ERR:
        msg = 'Not Found';
        break;
      case FileError.SECURITY_ERR:
        msg = 'Security';
        break;
      case FileError.INVALID_MODIFICATION_ERR:
        msg = 'Invalid Modification';
        break;
      case FileError.INVALID_STATE_ERR:
        msg = 'Invalid State';
        break;
      case FileError.TYPE_MISMATCH_ERR:
        msg = 'Type Mismatch';
        break;
      default:
        msg = 'Unknown Error';
        break;
    };
    console.log('Error ' + e.code + ': ' + msg, step);
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

  var writeFile = function(filePath, fileName, blob, onSuccessCallback) {
    handleFile(filePath, true, function(fileEntry) {
      fileEntry.createWriter(function(fileWriter) {
        fileWriter.onerror = onError;
        fileWriter.onwriteend = function() {
          fileWriter.onwriteend = null;
          fileWriter.write(blob);
          onSuccessCallback(fileEntry);
        }
        // a call to truncate() is apparently required if the same file is being overriden with
        // different contents
        fileWriter.truncate(blob.size);

      }, function(e) {
        onError(e, "in writeFile(), while creating fileWriter for " + filePath + "/" + fileName);
      });
    });
  };

  return {
    initialize: function() {
      window.webkitRequestFileSystem(PERSISTENT, 1024 * 1024, function(localFs) {
        fs = localFs;
      });
    },

    createDirectory: function(directoryPath, onSuccessCallback) {
      if (fs) {
        fs.root.getDirectory(directoryPath, {
          create: true
        }, function(e) {
          onSuccessCallback();
        },
        onError(e, "in createDirectory, while creating directory " + directoryPath));
      }
    },

    readFilesInDirectory: function(directoryPath, onSuccessCallback) {
      if (fs) {
        fs.root.getDirectory(directoryPath, {
          create: true
        }, function(dirEntry) {
          var dirReader = dirEntry.createReader();
          dirReader.readEntries(function(entries) {
            _.each(entries, function(entry) {
              if (entry.isFile) {
                console.log(entry);
                handleFile(entry.fullPath, false, function(fileEntry) {
                  fileEntry.file(function(file) {
                    var reader = new FileReader();
                    reader.onloadend = onSuccessCallback;
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

    readDirectoryContents: function(directoryPath, onSuccessCallback) {
      if (fs) {
        fs.root.getDirectory(directoryPath, {
          create: true
        }, function(dirEntry) {
          var dirReader = dirEntry.createReader();
          dirReader.readEntries(function(entries) {
            _.each(entries, function(entry) {
              console.log(entry);
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

    writeTextFile: function(filePath, fileName, fileBody, onSuccessCallback) {
      var blob = new Blob([fileBody], {
        type: 'text/plain'
      });
      writeFile(filePath, fileName, blob, onSuccessCallback);
    },

    writeBlob: function(filePath, fileName, blob, onSuccessCallback) {
      writeFile(filePath, fileName, blob, onSuccessCallback);
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