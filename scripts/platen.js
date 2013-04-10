/*! platen 2013-04-10 */
"use strict";

angular.module("platen.directives", []);

angular.module("platen.services", []);

var platen = angular.module("platen", [ "platen.directives", "platen.services" ]).config([ "$routeProvider", function(t) {
    t.when("/posts", {
        templateUrl: "views/pages/posts.html",
        controller: PostsController
    });
    t.when("/posts/:postId", {
        templateUrl: "views/pages/edit.html",
        controller: EditorController
    });
    t.when("/login", {
        templateUrl: "views/pages/login.html",
        controller: LoginController
    });
    t.otherwise({
        redirectTo: "/login"
    });
} ]);

var fs = null;

var FOLDERNAME = "platen";

function onError(t) {
    console.log(t);
}

var fs = null;

var FOLDERNAME = "test";

document.addEventListener("DOMContentLoaded", function(t) {
    window.webkitRequestFileSystem(PERSISTENT, 1024 * 1024, function(t) {
        fs = t;
    }, onError);
});

var EditorController = function(t, e, r) {
    var o = 6e3;
    t.post = {};
    t.post.id = new Date().getTime();
    t.status = {};
    t.post.title = "UNTITLED";
    t.autoSave = function() {
        i(t.post);
        n = e(t.autoSave, o);
    };
    var n = e(t.autoSave, o);
    var i = function(e) {
        if (!fs) {
            return;
        }
        fs.root.getDirectory(FOLDERNAME, {
            create: true
        }, function(o) {
            o.getFile(e.id, {
                create: true,
                exclusive: false
            }, function(o) {
                o.createWriter(function(o) {
                    var n = new Blob([ e.toString() ]);
                    o.onerror = onError;
                    o.onwriteend = function(e) {
                        t.status.autoSaveTime = r("date")(new Date(), "shortTime");
                    };
                    o.write(n);
                }, onError);
            }, onError);
        }, onError);
    };
    $("#post-title").focus();
};

EditorController.$inject = [ "$scope", "$timeout", "$filter" ];

var LoginController = function(t) {
    t.login = {};
};

LoginController.$inject = [ "$scope" ];

var PostsController = function(t) {
    t.posts = {};
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