angular.module('platen.services').factory('fileManager', function() {
  var fs;
  var SIZE = 10 * 1024 * 1024; // 10 megabytes

  var doCreate = {
    create: true
  };

  var dontCreate = {
    create: false
  };

  var DEFAULT_FILE_TYPE = {
    type: 'text/plain'
  };

  var onError = function(e, step) {
    console.log('Error ' + e.code + ': ' + e.name, step);
  };

  // add "name" property to FileError prototype for easier error reporting
  FileError.prototype.__defineGetter__('name', function() {
    var keys = Object.keys(FileError);
    for (var i = 0, key; key = keys[i]; ++i) {
      if (FileError[key] == this.code) {
        return key;
      }
    }
    return 'Unknown Error';
  });

  var getFileEntryAndDoAction = function(filePath, createParam, action) {
    if (fs) {
      fs.root.getFile(filePath, createParam, action, function(e) {
        onError(e, "in getFileEntryAndDoAction(), while getting file entry for " + filePath);
      });
    }
  };

  return {
    initialize: function() {
      window.webkitRequestFileSystem(PERSISTENT, SIZE, function(fileSystem) {
        fs = fileSystem;
      }, onError);
    },

    listFilesinDirectory: function(directoryPath, onSuccessCallback) {
      if (fs) {
        fs.root.getDirectory(directoryPath, doCreate, function(dirEntry) {
          var dirReader = dirEntry.createReader();
          dirReader.readEntries(function(entries) {
            _.each(entries, function(entry) {
              if (entry.isFile) {
                onSuccessCallback(entry);
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

    readFilesInDirectory: function(directoryPath, onSuccessCallback) {
      if (fs) {
        fs.root.getDirectory(directoryPath, doCreate, function(dirEntry) {

          var dirReader = dirEntry.createReader();

          dirReader.readEntries(function(entries) {

            _.each(entries, function(entry) {
              if (entry.isFile) {
                getFileEntryAndDoAction(entry.fullPath, dontCreate, function(fileEntry) {
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

    readRootDirectory: function() {
      var dirReader = fs.root.createReader();

      dirReader.readEntries(function(entries) {
        var imgReader = entries[2].createReader();

        imgReader.readEntries(function(images) {
          console.log(images);
          _.each(images, function(image) {
            console.log(image.toURL());
          })
        })
      });

    },

    clearDirectory: function(directoryPath) {
      if (fs) {
        fs.root.getDirectory(directoryPath, {}, function(dirEntry) {
          var dirReader = dirEntry.createReader();
          dirReader.readEntries(function(entries) {
            _.each(entries, function(entry) {
              if (entry.isFile) {
                getFileEntryAndDoAction(entry.fullPath, false, function(fileEntry) {
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

    writeFile: function(filePath, fileBody, onSuccessCallback) {
      var blob;

      if (fileBody instanceof Blob) {
        blob = fileBody;
      } else {
        blob = new Blob([fileBody], DEFAULT_FILE_TYPE);
      }

      getFileEntryAndDoAction(filePath, doCreate, function(fileEntry) {
        fileEntry.createWriter(function(fileWriter) {
          fileWriter.onerror = onError;
          fileWriter.onwriteend = function() {
            fileWriter.onwriteend = null;
            fileWriter.write(blob);
            onSuccessCallback(fileEntry);
          }

          // a call to truncate() is apparently required if a file is being overriden
          // without this call, there may be extra bits in the newly written file
          fileWriter.truncate(blob.size);

        }, function(e) {
          onError(e, "in writeFile(), while creating fileWriter for " + filePath + "/" + fileName);
        });
      });
    },

    readFile: function(filePath, asText, getResultCallback) {
      getFileEntryAndDoAction(filePath, dontCreate, function(fileEntry) {
        fileEntry.file(function(file) {
          var reader = new FileReader();
          reader.onload = function(e) {
            getResultCallback(e.target.result);
          };
          if (asText) {
            reader.readAsText(file);
          } else {
            reader.readAsBinaryString(file);
          }
        }, function(e) {
          onError(e, "in readingFile(), while reading file " + filePath);
        });
      });
    },

    removeFile: function(filePath, onSuccess) {
      getFileEntryAndDoAction(filePath, dontCreate, function(fileEntry) {
        fileEntry.remove(onSuccess, function(e) {
          onError(e, "in removeFile(), while reading file " + filePath);
        });
      });
    }
  };
});