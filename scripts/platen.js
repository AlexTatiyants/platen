/*! platen 2013-04-10 */
"use strict";

angular.module("platen.directives", []);

angular.module("platen.services", []);

var platen = angular.module("platen", [ "platen.directives", "platen.services" ]).config([ "$routeProvider", function(e) {
    e.when("/posts", {
        templateUrl: "views/pages/posts.html",
        controller: PostsController
    });
    e.when("/posts/:postId", {
        templateUrl: "views/pages/edit.html",
        controller: EditorController
    });
    e.when("/login", {
        templateUrl: "views/pages/login.html",
        controller: LoginController
    });
    e.otherwise({
        redirectTo: "/login"
    });
} ]);

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

var EditorController = function(e, t, r) {
    var n = 6e3;
    e.post = {};
    e.post.id = new Date().getTime();
    e.status = {};
    e.post.title = "UNTITLED";
    e.autoSave = function() {
        i(e.post);
        o = t(e.autoSave, n);
    };
    var o = t(e.autoSave, n);
    var i = function(t) {
        if (!fs) {
            return;
        }
        fs.root.getDirectory(FOLDERNAME, {
            create: true
        }, function(n) {
            n.getFile(t.id, {
                create: true,
                exclusive: false
            }, function(n) {
                n.createWriter(function(n) {
                    var o = new Blob([ t.toString() ]);
                    n.onerror = onError;
                    n.onwriteend = function(t) {
                        e.status.autoSaveTime = r("date")(new Date(), "shortTime");
                    };
                    n.write(o);
                }, onError);
            }, onError);
        }, onError);
    };
    $("#post-title").focus();
};

EditorController.$inject = [ "$scope", "$timeout", "$filter" ];

var LoginController = function(e) {
    e.login = {};
};

LoginController.$inject = [ "$scope" ];

var PostsController = function(e) {
    e.posts = {};
};

PostsController.$inject = [ "$scope" ];

"use strict";

angular.module("platen.directives").directive("editPanel", function() {
    return {
        restrict: "E",
        templateUrl: "views/partials/edit-panel.html"
    };
});

angular.module("platen.directives").directive("previewPanel", function() {
    return {
        restrict: "E",
        templateUrl: "views/partials/preview-panel.html"
    };
});

angular.module("platen.directives").directive("configPanel", function() {
    return {
        restrict: "E",
        templateUrl: "views/partials/config-panel.html"
    };
});

angular.module("platen.directives").directive("statusPanel", function() {
    return {
        restrict: "E",
        templateUrl: "views/partials/status-panel.html"
    };
});