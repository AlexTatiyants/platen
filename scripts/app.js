'use strict';

angular.module('platen.directives', []);
angular.module('platen.services', []);
angular.module('platen', ['platen.directives', 'platen.services']);


//TODO: convert to angular service
var fs = null;
var FOLDERNAME = 'platen';

function onError(e) {
  console.log(e);
}

var fs = null;
var FOLDERNAME = 'test';



document.addEventListener('DOMContentLoaded', function(e) {
  window.webkitRequestFileSystem(PERSISTENT, 1024 * 1024, function(localFs) {
    fs = localFs;
  }, 
  onError);
});