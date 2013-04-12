/*! platen 2013-04-12 */
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

var EditorController = function(e, t, r, n, i, o) {
    var l = 12e3;
    e.post = {};
    e.status = {};
    e.post.title = "UNTITLED";
    var a = function(e) {
        return "/" + o.POST_DIRECTORY_PATH + "/" + e;
    };
    var s = function() {
        e.post.id = new Date().getTime();
        e.post.path = a(e.post.id);
        e.post.createdDate = new Date();
    };
    var c = function(t) {
        var r = i.readFile(a(t), function(t) {
            e.post = JSON.parse(t);
            e.$apply();
        });
    };
    var u = function() {
        if (t.postId === "0") {
            s();
        } else {
            c(t.postId);
        }
    };
    u();
    e.writeFile = function() {
        console.log("saving ", e.post);
        i.writeFile(e.post.path, e.post.id, JSON.stringify(e.post), function(t) {
            e.status.autoSaveTime = n("date")(new Date(), "shortTime");
        });
    };
    $("#post-title").focus();
};

EditorController.$inject = [ "$scope", "$routeParams", "$timeout", "$filter", "fileManager", "resources" ];

var LoginController = function(e) {
    e.login = {};
};

LoginController.$inject = [ "$scope" ];

var MainController = function(e, t) {
    t.initialize();
};

MainController.$inject = [ "$scope", "fileManager" ];

var PostsController = function(e, t, r, n, i) {
    e.posts = [];
    e.loaded = false;
    if (!e.loaded) {
        n.readFilesInDirectory(i.POST_DIRECTORY_PATH, function(t) {
            var r = JSON.parse(this.result);
            e.posts.push(r);
            e.loaded = true;
            e.$apply();
        });
    }
    e.deletePost = function(t) {
        n.removeFile(t.path, function() {
            e.posts.splice(t);
            e.$apply();
        });
    };
    e.editPost = function(e) {
        r.path("posts/" + e.id);
    };
    e.deleteAll = function() {
        n.clearDirectory(i.POST_DIRECTORY_PATH, function() {
            console.log("all files deleted from " + i.POST_DIRECTORY_PATH);
        });
        e.posts = [];
    };
};

PostsController.$inject = [ "$scope", "$q", "$location", "fileManager", "resources" ];

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
        link: function(e, t, r, n) {
            if (!n) return;
            n.$render = function() {
                t.html(n.$viewValue || "");
            };
            t.bind("blur keyup change", function() {
                e.$apply(i);
            });
            i();
            function i() {
                var e = t.html().replace(/<br>/gi, "\n").replace(/<(?:.|\n)*?>/gm, "").replace(/&lt;/gi, "<").replace(/&gt;/gi, ">");
                n.$setViewValue(e);
            }
        }
    };
});

angular.module("platen.services").factory("fileManager", function() {
    var e;
    var t = function(e) {
        console.log(e);
    };
    var r = function(r, n, i) {
        if (e) {
            e.root.getFile(r, {
                create: n
            }, i, t);
        }
    };
    return {
        initialize: function() {
            window.webkitRequestFileSystem(PERSISTENT, 1024 * 1024, function(t) {
                e = t;
            });
        },
        readFilesInDirectory: function(n, i) {
            if (e) {
                e.root.getDirectory(n, {}, function(e) {
                    var n = e.createReader();
                    n.readEntries(function(e) {
                        _.each(e, function(e) {
                            if (e.isFile) {
                                r(e.fullPath, false, function(e) {
                                    e.file(function(e) {
                                        var t = new FileReader();
                                        t.onloadend = i;
                                        t.readAsText(e);
                                    }, t);
                                });
                            }
                        });
                    }, t);
                }, t);
            }
        },
        clearDirectory: function(n) {
            if (e) {
                e.root.getDirectory(n, {}, function(e) {
                    var n = e.createReader();
                    n.readEntries(function(e) {
                        _.each(e, function(e) {
                            if (e.isFile) {
                                r(e.fullPath, false, function(r) {
                                    r.remove(function() {
                                        console.log("removed " + e.fullPath);
                                    }, t);
                                });
                            }
                        });
                    }, t);
                }, t);
            }
        },
        writeFile: function(e, n, i, o) {
            r(e, true, function(e) {
                e.createWriter(function(r) {
                    var n = new Blob([ i ], {
                        type: "text/javascript"
                    });
                    r.onerror = t;
                    r.onwriteend = o(e);
                    r.write(n);
                }, t);
            });
        },
        readFile: function(e, n) {
            r(e, false, function(e) {
                e.file(function(e) {
                    var t = new FileReader();
                    t.onload = function(e) {
                        n(e.target.result);
                    };
                    t.readAsText(e);
                }, t);
            });
        },
        removeFile: function(e, n) {
            r(e, false, function(e) {
                e.remove(n, t);
            });
        }
    };
});

angular.module("platen.services").value("resources", {
    POST_DIRECTORY_PATH: "posts"
});