angular.module('platen.services').factory('fileManager', function() {
  var fs;
  var SIZE = 10 * 1024 * 1024; // 10 megabytes
  var LIST_FILE = 1;
  var READ_FILE = 2;
  var REMOVE_FILE = 3;

  var doCreate = {
    create: true
  };

  var dontCreate = {
    create: false
  };

  var DEFAULT_FILE_TYPE = {
    type: 'text/plain'
  };

  var getError = function(e, step) {
    return 'Error ' + e.code + ': ' + e.name + ' ' + step;
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

  var getFileEntryAndDoAction = function(filePath, createParam, actionCallback, onErrorCallback) {
    if (fs) {
      fs.root.getFile(filePath, createParam, actionCallback, onErrorCallback);
    }
  };

  return {
    directoryAccessActions: function() {
      return {
        LIST: LIST_FILE,
        READ: READ_FILE,
        REMOVE: REMOVE_FILE
      };
    },

    initialize: function(onErrorCallback) {
      window.webkitRequestFileSystem(PERSISTENT, SIZE,

      function(fileSystem) {
        fs = fileSystem;
      },

      function(e) {
        onErrorCallback(getError(e, "while initializing file system"));
      });
    },

    accessFilesInDirectory: function(directoryPath, accessAction, onSuccessCallback, onErrorCallback) {
      if (fs) {
        fs.root.getDirectory(directoryPath, doCreate,

        function(dirEntry) {
          var dirReader = dirEntry.createReader();
          dirReader.readEntries(function(entries) {
            _.each(entries, function(entry) {
              if (entry.isFile) {

                switch (accessAction) {
                  case LIST_FILE:
                    onSuccessCallback(entry);
                    break;

                  case READ_FILE:
                    // getFileEntryAndDoAction(entry.fullPath, dontCreate,

                    // function(fileEntry) {
                    //   fileEntry.file(function(file) {
                    //     var reader = new FileReader();
                    //     reader.onloadend = onSuccessCallback;
                    //     reader.readAsText(file);
                    //   },

                    //   function(e) {
                    //     onErrorCallback(getError(e, "while getting file " + entry.fullPath));
                    //   });
                    // });
                    break;

                  case REMOVE_FILE:
                    // getFileEntryAndDoAction(entry.fullPath, dontCreate,

                    // function(fileEntry) {
                    //   fileEntry.remove(function() {
                    //     onSuccessCallback();
                    //   },

                    //   function(e) {
                    //     onErrorCallback(getError(e, "while removing file " + entry.fullPath));
                    //   });
                    //   );
                    // });
                    break;

                  default:
                    onSuccessCallback(entry);
                    break;
                }
              }
            })
          },

          function(e) {
            onErrorCallback(getError(e, "while reading entries in " + directoryPath));
          });
        },

        function(e) {
          onErrorCallback(getError(e, "while reading getting directory " + directoryPath));
        });
      }
    },

    writeFile: function(filePath, fileBody, onSuccessCallback, onErrorCallback) {
      var blob;

      if (fileBody instanceof Blob) {
        blob = fileBody;
      } else {
        blob = new Blob([fileBody], DEFAULT_FILE_TYPE);
      }

      // getFileEntryAndDoAction(filePath, doCreate,

      // function(fileEntry) {
      //   fileEntry.createWriter(function(fileWriter) {
      //     fileWriter.onerror = onError;
      //     fileWriter.onwriteend = function() {
      //       fileWriter.onwriteend = null;
      //       fileWriter.write(blob);
      //       onSuccessCallback(fileEntry);
      //     }

      //     // a call to truncate() is apparently required if a file is being overriden
      //     // without this call, there may be extra bits in the newly written file
      //     fileWriter.truncate(blob.size);

      //   }, function(e) {
      //     onErrorCallback(getError(e, " while creating fileWriter for " + filePath));
      //   });
      // },
    },

    readFile: function(filePath, asText, onSuccessCallback, onErrorCallback) {
      getFileEntryAndDoAction(filePath, dontCreate,

      function(fileEntry) {
        fileEntry.file(function(file) {
          var reader = new FileReader();
          reader.onload = function(e) {
            onSuccessCallback(e.target.result);
          };
          if (asText) {
            reader.readAsText(file);
          } else {
            reader.readAsBinaryString(file);
          }
        }, function(e) {
          onErrorCallback(getError(e, " while reading file " + filePath));
        });
      });
    },

    removeFile: function(filePath, onSuccessCallback, onErrorCallback) {
      getFileEntryAndDoAction(filePath, dontCreate,

      function(fileEntry) {
        fileEntry.remove(onSuccessCallback, function(e) {
          onErrorCallback(getError(e, " while removing file " + filePath));
        });
      });
    }
  };
});