angular.module('platen.services').factory('imageManager', ['$window', 'fileManager', 'logger', 'resources',

function($window, fileManager, logger, resources) {

  $window.addEventListener('paste', function(event) {
    var item = event.clipboardData.items[0];

    if (item.type !== 'image/png') return;

    var fileName = new Date().getTime() + ".png";

    fileManager.writeBlob(resources.IMAGE_DIRECTORY_PATH, fileName, item.getAsFile(), function() {
      console.log("saved image " + fileName);
      document.execCommand('insertHtml', false, '![Alt text](/images/' + fileName + ')');
    });
  });

}]);

// user inserts image - save it locally and insert it as <img> reference as well as add new entry in images:
/*
  images {
    image {
      localUrl: 'images/123231.png',
      blogUrl: 'uploads...'
    }
  }

  when syncing to WP, check if blog url is empty. If so, upload image and update file reference in HTML before inserting

*/