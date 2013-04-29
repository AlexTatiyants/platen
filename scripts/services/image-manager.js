angular.module('platen.services').factory('imageManager', ['$rootScope', '$window', 'fileManager', 'logger', 'resources',

function($scope, $window, fileManager, logger, resources) {
  var image = {};

  $window.addEventListener('paste', function(event) {
    var item = event.clipboardData.items[0];

    if (item.type !== 'image/png') return;

    // TODO: handle images pasted as text/html

    var blob = item.getAsFile();
    var fileName = $window.prompt("Enter image name", "");
    fileName = fileName.replace(/[^a-z0-9]/gi, '_').toLowerCase();

    if (fileName.indexOf('.png') === -1) {
      image.fileName = fileName + '.png';
    } else {
      image.fileName = fileName;
    }

    image.id = new Date().getTime();
    image.type = 'image/png';
    image.filePath = resources.IMAGE_DIRECTORY_PATH + "/" + image.fileName;

    fileManager.writeFile(image.filePath, blob, function(fileEntry) {
      image.localUrl = fileEntry.toURL();
      logger.log("saved image " + image.fileName, "imageManager service");
      document.execCommand('insertHtml', false, '![' + image.fileName + '](' + image.localUrl + ')');
      $scope.$emit('imageInserted', image);
      image = {};
    });

  });

  return {
    image: image
  }

}]);