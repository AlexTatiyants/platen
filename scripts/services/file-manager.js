var fileManagerFactory = function($q) {
  var POSTS_FOLDER_PATH = 'posts';
  var fs = null;

  var onError = function(e) {
    console.log(e);
  };

  var obtainFs = function() {
    var deferred = $q.defer();

    console.log("deferred before resolve", deferred);

    window.webkitRequestFileSystem(PERSISTENT, 1024 * 1024, function(localFs) {
      fs = localFs;
      console.log("got fs, resolving deferred", deferred);
      deferred.resolve();
    });

    return deferred.promise;
  };

  var foo = function(onSuccess) {
    console.log("in foo with fs ", fs);
    fs.root.getDirectory(POSTS_FOLDER_PATH, {}, function(dirEntry) {

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

              // fileEntry.remove(function() {
              //   console.log('File removed.');
              // }, onError);

            }, onError);
          }
        }
      }, onError);
    }, onError)
  };


  return {
    initialize: function() {
      console.log("init fileManager");
      obtainFs();
    },

    readFiles: function(onSuccess) {
      if (!fs) {
        var promise = obtainFs();
        promise.then(foo(onSuccess));
      } else {
        foo(onSuccess);
      };
    },

    writeFile: function(fileName, fileBody, onSuccess) {
      if (!fs) {
        return;
      };

      fs.root.getDirectory(POSTS_FOLDER_PATH, {
        create: true
      }, function(dirEntry) {
        dirEntry.getFile(fileName, {
          create: true,
          exclusive: false
        }, function(fileEntry) {

          fileEntry.createWriter(function(fileWriter) {
            var blob = new Blob([fileBody], {
              type: 'text/javascript'
            });

            fileWriter.onerror = onError;
            fileWriter.onwriteend = onSuccess;
            fileWriter.write(blob);
          }, onError);
        }, onError);
      }, onError);
    }
  };
};

fileManagerFactory.$inject = ['$q'];

angular.module('platen.services').factory('fileManager', fileManagerFactory);