angular.module('platen.services').factory('imageManager', ['$window', 'fileManager', 'logger', 'resources',

function($window, fileManager, logger, resources) {

  $window.addEventListener('paste', function(event) {
    var item = event.clipboardData.items[0];

    if (item.type !== 'image/png') return;

    var fileName = new Date().getTime() + ".png"
    var filePath = resources.IMAGE_DIRECTORY_PATH + "/" + fileName;

    fileManager.writeFile(filePath, item.getAsFile(), function(fileEntry) {
      logger.log("saved image " + fileName, "imageManager service");
      document.execCommand('insertHtml', false, '![Alt text](' + fileEntry.toURL() + ')');
    });
  });
}]);