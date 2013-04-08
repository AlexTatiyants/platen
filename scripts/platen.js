/*! platen 2013-04-07 */
"use strict";

angular.module("platen.directives", []);

angular.module("platen.services", []);

angular.module("platen", [ "platen.directives", "platen.services" ]);

"use strict";

var fs = null;

var FOLDERNAME = "platen";

function onError(e) {
    console.log(e);
}

var fs = null;

var FOLDERNAME = "test";

function writeFile(e) {
    if (!fs) {
        return;
    }
    fs.root.getDirectory(FOLDERNAME, {
        create: true
    }, function(t) {
        t.getFile(e.title, {
            create: true,
            exclusive: false
        }, function(t) {
            t.createWriter(function(t) {
                var r = new Blob([ e.toString() ]);
                t.onerror = onError;
                t.onwriteend = function(e) {
                    console.log("Write completed.");
                };
                t.write(r);
            }, onError);
        }, onError);
    }, onError);
}

var EditorController = function(e, t) {
    var r = 3e3;
    e.post = {};
    e.post.title = "UNTITLED";
    e.autoSave = function() {
        console.log("autosaving");
        writeFile(e.post);
        n = t(e.autoSave, r);
    };
    var n = t(e.autoSave, r);
    $("#post-title").focus();
};

EditorController.$inject = [ "$scope", "$timeout" ];

document.addEventListener("DOMContentLoaded", function(e) {
    window.webkitRequestFileSystem(TEMPORARY, 1024 * 1024, function(e) {
        fs = e;
    }, onError);
});

"use strict";

angular.module("platen.directives").directive("editPanel", function() {
    return {
        restrict: "E",
        templateUrl: "views/edit-panel.html"
    };
});

angular.module("platen.directives").directive("previewPanel", function() {
    return {
        restrict: "E",
        templateUrl: "views/preview-panel.html"
    };
});

angular.module("platen.directives").directive("configPanel", function() {
    return {
        restrict: "E",
        templateUrl: "views/config-panel.html"
    };
});