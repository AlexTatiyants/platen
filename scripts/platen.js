/*! platen 2013-04-11 */
"use strict";

angular.module("platen.directives", []);

angular.module("platen.services", []);

var platen = angular.module("platen", [ "platen.directives", "platen.services" ]).config([ "$routeProvider", function(e) {
    e.when("/posts", {
        templateUrl: "views/pages/posts.html"
    });
    e.when("/posts/:postId", {
        templateUrl: "views/pages/edit.html"
    });
    e.otherwise({
        redirectTo: "/posts"
    });
} ]);

var EditorController = function(e, t, r, i, n) {
    var o = 6e3;
    e.post = {};
    e.status = {};
    e.post.title = "UNTITLED";
    e.writeFile = function() {
        if (!e.post.id) {
            e.post.id = new Date().getTime();
            e.post.path = "/" + n.POST_DIRECTORY_PATH + "/" + e.post.id;
            e.post.createdDate = new Date();
        }
        i.writeFile(n.POST_DIRECTORY_PATH, e.post.id, JSON.stringify(e.post), function(t) {
            e.status.autoSaveTime = r("date")(new Date(), "shortTime");
        });
    };
    $("#post-title").focus();
};

EditorController.$inject = [ "$scope", "$timeout", "$filter", "fileManager", "resources" ];

var LoginController = function(e) {
    e.login = {};
};

LoginController.$inject = [ "$scope" ];

var MainController = function(e, t) {
    t.initialize();
};

MainController.$inject = [ "$scope", "fileManager" ];

var PostsController = function(e, t, r, i) {
    e.posts = [];
    e.loaded = false;
    if (!e.loaded) {
        r.readFiles(i.POST_DIRECTORY_PATH, function(t) {
            var r = JSON.parse(this.result);
            e.posts.push(r);
            e.loaded = true;
            e.$apply();
        });
    }
    e.deletePost = function(t) {
        r.removeFile(t.path, function() {
            e.posts.splice(t);
        });
    };
};

PostsController.$inject = [ "$scope", "$q", "fileManager", "resources" ];

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

angular.module("platen.directives").directive("contenteditable", function() {
    return {
        restrict: "A",
        require: "?ngModel",
        link: function(e, t, r, i) {
            if (!i) return;
            i.$render = function() {
                t.html(i.$viewValue || "");
            };
            t.bind("blur keyup change", function() {
                e.$apply(n);
            });
            n();
            function n() {
                i.$setViewValue(t.html());
            }
        }
    };
});

var fileManagerFactory = function(e) {
    var t = "posts";
    var r = null;
    var i = {
        create: true
    };
    var n = {
        create: false
    };
    var o = function(e) {
        console.log(e);
    };
    var l = function() {
        var t = e.defer();
        window.webkitRequestFileSystem(PERSISTENT, 1024 * 1024, function(e) {
            r = e;
            t.resolve();
        });
        return t.promise;
    };
    var a = function(e, t) {
        r.root.getDirectory(e, {}, function(e) {
            var i = e.createReader();
            i.readEntries(function(e) {
                for (var i = 0; i < e.length; i++) {
                    var n = e[i];
                    if (n.isFile) {
                        r.root.getFile(n.fullPath, {}, function(e) {
                            e.file(function(e) {
                                var r = new FileReader();
                                r.onloadend = t;
                                r.readAsText(e);
                            }, o);
                        }, o);
                    }
                }
            }, o);
        }, o);
    };
    return {
        initialize: function() {
            l();
        },
        readFiles: function(e, t) {
            if (!r) {
                var i = l();
                i.then(a(e, t));
            } else {
                a(e, t);
            }
        },
        writeFile: function(e, t, n, l) {
            if (!r) {
                return;
            }
            r.root.getDirectory(e, i, function(e) {
                e.getFile(t, i, function(e) {
                    e.createWriter(function(t) {
                        var r = new Blob([ n ], {
                            type: "text/javascript"
                        });
                        t.onerror = o;
                        t.onwriteend = l(e);
                        t.write(r);
                    }, o);
                }, o);
            }, o);
        },
        removeFile: function(e, t) {
            r.root.getFile(e, n, function(e) {
                e.remove(t, o);
            }, o);
        }
    };
};

fileManagerFactory.$inject = [ "$q" ];

angular.module("platen.services").factory("fileManager", fileManagerFactory);

angular.module("platen.services").value("resources", {
    POST_DIRECTORY_PATH: "posts"
});