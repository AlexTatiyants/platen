/*! platen 2013-04-08 */
"use strict";

angular.module("platen.directives", []);

angular.module("platen.services", []);

angular.module("platen", [ "platen.directives", "platen.services" ]).config([ "$routeProvider", function(t) {
    t.when("bad");
    t.when("/posts", {
        templateUrl: "views/pages/posts.html",
        controller: PostsController
    });
    t.when("/posts/:postId", {
        templateUrl: "views/pages/edit.html",
        controller: EditorController
    });
    t.otherwise({
        redirectTo: "/posts"
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

"use strict";

var EditorController = function(t, e, r) {
    var n = 6e3;
    t.post = {};
    t.post.id = new Date().getTime();
    t.status = {};
    t.post.title = "UNTITLED";
    t.autoSave = function() {
        i(t.post);
        o = e(t.autoSave, n);
    };
    var o = e(t.autoSave, n);
    var i = function(e) {
        if (!fs) {
            return;
        }
        fs.root.getDirectory(FOLDERNAME, {
            create: true
        }, function(n) {
            n.getFile(e.id, {
                create: true,
                exclusive: false
            }, function(n) {
                n.createWriter(function(n) {
                    var o = new Blob([ e.toString() ]);
                    n.onerror = onError;
                    n.onwriteend = function(e) {
                        t.status.autoSaveTime = r("date")(new Date(), "shortTime");
                    };
                    n.write(o);
                }, onError);
            }, onError);
        }, onError);
    };
    $("#post-title").focus();
};

EditorController.$inject = [ "$scope", "$timeout", "$filter" ];

"use strict";

var MainController = function(t, e) {
    t.getPosts = function() {
        console.log("in posts");
        e.path("posts/");
    };
    t.getPost = function(t) {
        console.log("in post " + t);
        e.path("posts/" + t);
    };
};

MainController.$inject = [ "$scope", "$location" ];

"use strict";

var PostsController = function(t) {
    t.posts = {};
    t.posts.count = 10;
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

"use strict";

var PostsController = function(t) {
    t.posts = {};
    t.posts.count = 14;
};