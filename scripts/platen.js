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

var EditorController = function(e, t, r, i, n, o, l) {
    var a = 12e3;
    e.post = {};
    e.status = {};
    e.post.title = "UNTITLED";
    var c = function(e) {
        return "/" + l.POST_DIRECTORY_PATH + "/" + e;
    };
    var s = function() {
        e.post.id = new Date().getTime();
        e.post.path = c(e.post.id);
        e.post.createdDate = new Date();
    };
    var u = function(t) {
        n.readFile(c(t), function(t) {
            e.post = JSON.parse(t);
            console.log("pre", e.post.content);
            e.post.content = o.HTMLizeText(e.post.content);
            console.log("post", e.post.content);
            e.$apply();
        });
    };
    var f = function() {
        if (t.postId === "0") {
            s();
        } else {
            u(t.postId);
        }
    };
    f();
    e.writeFile = function() {
        var t = JSON.parse(JSON.stringify(e.post));
        t.content = o.deHTMLizeText(t.content);
        n.writeFile(e.post.path, e.post.id, JSON.stringify(t), function(t) {
            e.status.autoSaveTime = i("date")(new Date(), "shortTime");
        });
    };
    $("#post-title").focus();
};

EditorController.$inject = [ "$scope", "$routeParams", "$timeout", "$filter", "fileManager", "htmlizer", "resources" ];

var LoginController = function(e) {
    e.login = {};
};

LoginController.$inject = [ "$scope" ];

var MainController = function(e, t) {
    t.initialize();
};

MainController.$inject = [ "$scope", "fileManager" ];

var PostsController = function(e, t, r, i, n) {
    e.posts = [];
    e.loaded = false;
    if (!e.loaded) {
        i.readFilesInDirectory(n.POST_DIRECTORY_PATH, function(t) {
            var r = JSON.parse(this.result);
            e.posts.push(r);
            e.loaded = true;
            e.$apply();
        });
    }
    e.deletePost = function(t) {
        i.removeFile(t.path, function() {
            e.posts.splice(t);
            e.$apply();
        });
    };
    e.editPost = function(e) {
        r.path("posts/" + e.id);
    };
    e.deleteAll = function() {
        i.clearDirectory(n.POST_DIRECTORY_PATH, function() {
            console.log("all files deleted from " + n.POST_DIRECTORY_PATH);
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
        link: function(e, t, r, i) {
            if (!i) return;
            i.$render = function() {
                t.html(i.$viewValue || "");
            };
            t.bind("blur keyup change", function() {
                e.$apply(n);
            });
            var n = function() {
                i.$setViewValue(t.html());
            };
            n();
        }
    };
});

angular.module("platen.services").factory("fileManager", function() {
    var e;
    var t = function(e, t) {
        var r = "";
        switch (e.code) {
          case FileError.QUOTA_EXCEEDED_ERR:
            r = "QUOTA_EXCEEDED_ERR";
            break;

          case FileError.NOT_FOUND_ERR:
            r = "NOT_FOUND_ERR";
            break;

          case FileError.SECURITY_ERR:
            r = "SECURITY_ERR";
            break;

          case FileError.INVALID_MODIFICATION_ERR:
            r = "INVALID_MODIFICATION_ERR";
            break;

          case FileError.INVALID_STATE_ERR:
            r = "INVALID_STATE_ERR";
            break;

          default:
            r = "Unknown Error";
            break;
        }
        console.log("Error: " + r, t);
    };
    var r = function(r, i, n) {
        if (e) {
            e.root.getFile(r, {
                create: i
            }, n, function(e) {
                t(e, "in handleFile(), while getting file path " + r);
            });
        }
    };
    return {
        initialize: function() {
            window.webkitRequestFileSystem(PERSISTENT, 1024 * 1024, function(t) {
                e = t;
            });
        },
        readFilesInDirectory: function(i, n) {
            if (e) {
                e.root.getDirectory(i, {
                    create: true
                }, function(e) {
                    var o = e.createReader();
                    o.readEntries(function(e) {
                        _.each(e, function(e) {
                            if (e.isFile) {
                                r(e.fullPath, false, function(r) {
                                    r.file(function(e) {
                                        var t = new FileReader();
                                        t.onloadend = n;
                                        t.readAsText(e);
                                    }, function(r) {
                                        t(r, "in readFilesInDirectory, while getting file " + e.fullPath);
                                    });
                                });
                            }
                        });
                    }, function(e) {
                        t(e, "in readFilesInDirectory, while reading entries from " + i);
                    });
                }, function(e) {
                    t(e, "in readFilesInDirectory, while getting directory " + i);
                });
            }
        },
        clearDirectory: function(i) {
            if (e) {
                e.root.getDirectory(i, {}, function(e) {
                    var n = e.createReader();
                    n.readEntries(function(e) {
                        _.each(e, function(e) {
                            if (e.isFile) {
                                r(e.fullPath, false, function(r) {
                                    r.remove(function() {
                                        console.log("removed file " + e.fullPath);
                                    }, function(r) {
                                        t(r, "while removing file " + e.fullPath);
                                    });
                                });
                            }
                        });
                    }, function(e) {
                        t(e, "in clearDirectory, while reading entries for " + i);
                    });
                }, function(e) {
                    t(e, "in clearDirectory(), while getting directory " + i);
                });
            }
        },
        writeFile: function(e, i, n, o) {
            r(e, true, function(r) {
                r.createWriter(function(e) {
                    var i = new Blob([ n ], {
                        type: "text/javascript"
                    });
                    e.onerror = t;
                    e.onwriteend = o(r);
                    e.write(i);
                }, function(r) {
                    t(r, "in writeFile(), while creating fileWriter for " + e + "/" + i);
                });
            });
        },
        readFile: function(e, i) {
            r(e, false, function(r) {
                r.file(function(e) {
                    var t = new FileReader();
                    t.onload = function(e) {
                        i(e.target.result);
                    };
                    t.readAsText(e);
                }, function(r) {
                    t(r, "in readingFile(), while reading file " + e);
                });
            });
        },
        removeFile: function(e, i) {
            r(e, false, function(r) {
                r.remove(i, function(r) {
                    t(r, "in removeFile(), while reading file " + e);
                });
            });
        }
    };
});

angular.module("platen.services").factory("htmlizer", function() {
    return {
        deHTMLizeText: function(e) {
            return e.replace(/<div><br><\/div>/gi, "\n").replace(/<div>/gi, "\n").replace(/<\/div>/gi, "").replace(/&lt;/gi, "<").replace(/&gt;/gi, ">");
        },
        HTMLizeText: function(e) {
            return e.replace(/\n/gi, "<br>");
        }
    };
});

angular.module("platen.services").value("resources", {
    POST_DIRECTORY_PATH: "posts"
});