/*! platen 2013-04-13 */
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

var EditorController = function(e, t, i, n, r, o) {
    var l = 12e3;
    e.post = {};
    e.status = {};
    e.post.title = "UNTITLED";
    e.previewOn = false;
    var a = function(e) {
        return "/" + o.POST_DIRECTORY_PATH + "/" + e;
    };
    var c = function() {
        e.post.id = new Date().getTime();
        e.post.path = a(e.post.id);
        e.post.createdDate = new Date();
    };
    var s = function(t) {
        r.readFile(a(t), function(t) {
            e.post = JSON.parse(t);
            e.$apply();
        });
    };
    var u = function() {
        if (t.postId === "0") {
            c();
        } else {
            s(t.postId);
        }
    };
    u();
    e.writeFile = function() {
        var t = JSON.parse(JSON.stringify(e.post));
        t.htmlPreview = "";
        r.writeFile(e.post.path, e.post.id, JSON.stringify(t), function(t) {
            e.status.autoSaveTime = n("date")(new Date(), "shortTime");
        });
    };
    e.togglePreview = function() {
        if (!e.previewOn) {
            e.post.htmlPreview = marked(e.post.content);
        }
        e.previewOn = !e.previewOn;
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

var PostsController = function(e, t, i, n, r) {
    e.posts = [];
    e.loaded = false;
    if (!e.loaded) {
        n.readFilesInDirectory(r.POST_DIRECTORY_PATH, function(t) {
            console.log(this.result);
            var i = JSON.parse(this.result);
            e.posts.push(i);
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
        i.path("posts/" + e.id);
    };
    e.deleteAll = function() {
        n.clearDirectory(r.POST_DIRECTORY_PATH, function() {
            console.log("all files deleted from " + r.POST_DIRECTORY_PATH);
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
        link: function(e, t, i, n) {
            if (!n) return;
            n.$render = function() {
                t.html(n.$viewValue || "");
            };
            t.bind("blur keyup change", function() {
                e.$apply(r);
            });
            var r = function() {
                n.$setViewValue(t.html());
            };
            r();
        }
    };
});

angular.module("platen.services").factory("fileManager", function() {
    var e;
    var t = function(e, t) {
        var i = "";
        switch (e.code) {
          case FileError.QUOTA_EXCEEDED_ERR:
            i = "QUOTA_EXCEEDED_ERR";
            break;

          case FileError.NOT_FOUND_ERR:
            i = "NOT_FOUND_ERR";
            break;

          case FileError.SECURITY_ERR:
            i = "SECURITY_ERR";
            break;

          case FileError.INVALID_MODIFICATION_ERR:
            i = "INVALID_MODIFICATION_ERR";
            break;

          case FileError.INVALID_STATE_ERR:
            i = "INVALID_STATE_ERR";
            break;

          default:
            i = "Unknown Error";
            break;
        }
        console.log("Error: " + i, t);
    };
    var i = function(i, n, r) {
        if (e) {
            e.root.getFile(i, {
                create: n
            }, r, function(e) {
                t(e, "in handleFile(), while getting file path " + i);
            });
        }
    };
    return {
        initialize: function() {
            window.webkitRequestFileSystem(PERSISTENT, 1024 * 1024, function(t) {
                e = t;
            });
        },
        readFilesInDirectory: function(n, r) {
            if (e) {
                e.root.getDirectory(n, {
                    create: true
                }, function(e) {
                    var o = e.createReader();
                    o.readEntries(function(e) {
                        _.each(e, function(e) {
                            if (e.isFile) {
                                i(e.fullPath, false, function(i) {
                                    i.file(function(e) {
                                        var t = new FileReader();
                                        t.onloadend = r;
                                        t.readAsText(e);
                                    }, function(i) {
                                        t(i, "in readFilesInDirectory, while getting file " + e.fullPath);
                                    });
                                });
                            }
                        });
                    }, function(e) {
                        t(e, "in readFilesInDirectory, while reading entries from " + n);
                    });
                }, function(e) {
                    t(e, "in readFilesInDirectory, while getting directory " + n);
                });
            }
        },
        clearDirectory: function(n) {
            if (e) {
                e.root.getDirectory(n, {}, function(e) {
                    var r = e.createReader();
                    r.readEntries(function(e) {
                        _.each(e, function(e) {
                            if (e.isFile) {
                                i(e.fullPath, false, function(i) {
                                    i.remove(function() {
                                        console.log("removed file " + e.fullPath);
                                    }, function(i) {
                                        t(i, "while removing file " + e.fullPath);
                                    });
                                });
                            }
                        });
                    }, function(e) {
                        t(e, "in clearDirectory, while reading entries for " + n);
                    });
                }, function(e) {
                    t(e, "in clearDirectory(), while getting directory " + n);
                });
            }
        },
        writeFile: function(e, n, r, o) {
            i(e, true, function(i) {
                i.createWriter(function(e) {
                    var n = new Blob([ r ], {
                        type: "text/javascript"
                    });
                    e.onerror = t;
                    e.onwriteend = o(i);
                    e.write(n);
                }, function(i) {
                    t(i, "in writeFile(), while creating fileWriter for " + e + "/" + n);
                });
            });
        },
        readFile: function(e, n) {
            i(e, false, function(i) {
                i.file(function(e) {
                    var t = new FileReader();
                    t.onload = function(e) {
                        n(e.target.result);
                    };
                    t.readAsText(e);
                }, function(i) {
                    t(i, "in readingFile(), while reading file " + e);
                });
            });
        },
        removeFile: function(e, n) {
            i(e, false, function(i) {
                i.remove(n, function(i) {
                    t(i, "in removeFile(), while reading file " + e);
                });
            });
        }
    };
});

angular.module("platen.services").value("resources", {
    POST_DIRECTORY_PATH: "posts"
});