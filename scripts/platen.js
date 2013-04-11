/*! platen 2013-04-11 */
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
        redirectTo: "/posts"
    });
} ]);

var fs = null;

var POSTS_FOLDER_PATH = "posts";

function onError(e) {
    console.log(e);
}

document.addEventListener("DOMContentLoaded", function(e) {
    window.webkitRequestFileSystem(PERSISTENT, 1024 * 1024, function(e) {
        fs = e;
    }, onError);
});

var EditorController = function(e, t, r) {
    var o = 6e3;
    e.post = {};
    e.status = {};
    e.post.id = new Date().getTime();
    e.post.title = "UNTITLED";
    e.writeFile = function() {
        if (!fs) {
            return;
        }
        fs.root.getDirectory(POSTS_FOLDER_PATH, {
            create: true
        }, function(t) {
            t.getFile(e.post.id, {
                create: true,
                exclusive: false
            }, function(t) {
                t.createWriter(function(t) {
                    e.post.savedAt = new Date();
                    var o = JSON.stringify(e.post);
                    var n = new Blob([ o ], {
                        type: "text/javascript"
                    });
                    t.onerror = onError;
                    t.onwriteend = function(t) {
                        e.status.autoSaveTime = r("date")(new Date(), "shortTime");
                    };
                    t.write(n);
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
    e.posts = [];
    e.removePost = function(e) {};
    e.loadPosts = function() {
        fs.root.getDirectory(POSTS_FOLDER_PATH, {}, function(t) {
            var r = t.createReader();
            r.readEntries(function(t) {
                for (var r = 0; r < t.length; r++) {
                    var o = t[r];
                    if (o.isFile) {
                        console.log("File", o);
                        fs.root.getFile(o.fullPath, {}, function(t) {
                            t.file(function(t) {
                                var r = new FileReader();
                                r.onloadend = function(t) {
                                    var r = JSON.parse(this.result);
                                    e.posts.push(r);
                                    console.log(r);
                                };
                                r.readAsText(t);
                            }, onError);
                        }, onError);
                    }
                }
            }, onError);
        }, onError);
    };
};

PostsController.$inject = [ "$scope" ];

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