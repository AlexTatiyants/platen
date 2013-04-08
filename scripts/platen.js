/*! platen 2013-04-08 */
"use strict";

angular.module("platen.directives", []);

angular.module("platen.services", []);

angular.module("platen", [ "platen.directives", "platen.services" ]);

var fs = null;

var FOLDERNAME = "platen";

function onError(e) {
    console.log(e);
}

var fs = null;

var FOLDERNAME = "test";

document.addEventListener("DOMContentLoaded", function(e) {
    window.webkitRequestFileSystem(PERSISTENT, 1024 * 1024, function(e) {
        fs = e;
    }, onError);
});

"use strict";

var EditorController = function(e, t, r) {
    var n = 6e3;
    e.post = {};
    e.status = {};
    e.post.title = "UNTITLED";
    e.autoSave = function() {
        o(e.post);
        i = t(e.autoSave, n);
    };
    var i = t(e.autoSave, n);
    var o = function(t) {
        if (!fs) {
            return;
        }
        fs.root.getDirectory(FOLDERNAME, {
            create: true
        }, function(n) {
            n.getFile(t.title, {
                create: true,
                exclusive: false
            }, function(n) {
                console.log(n);
                n.createWriter(function(n) {
                    var i = new Blob([ t.toString() ]);
                    n.onerror = onError;
                    n.onwriteend = function(t) {
                        e.status.autoSaveTime = r("date")(new Date(), "shortTime");
                    };
                    n.write(i);
                }, onError);
            }, onError);
        }, onError);
    };
    $("#post-title").focus();
};

EditorController.$inject = [ "$scope", "$timeout", "$filter" ];

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

angular.module("platen.directives").directive("statusPanel", function() {
    return {
        restrict: "E",
        templateUrl: "views/status-panel.html"
    };
});