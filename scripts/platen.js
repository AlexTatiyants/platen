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

var EditorController = function(e, t, i, r, n, o, l) {
    var a = 12e3;
    e.post = {};
    e.status = {};
    e.post.title = "UNTITLED";
    e.previewOn = false;
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
            e.post.content = o.HTMLizeText(e.post.content);
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
            e.status.autoSaveTime = r("date")(new Date(), "shortTime");
        });
    };
    e.togglePreview = function() {
        if (!e.previewOn) {
            e.post.htmlPreview = marked(o.deHTMLizeText(e.post.content));
        }
        e.previewOn = !e.previewOn;
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

var PostsController = function(e, t, i, r, n) {
    e.posts = [];
    e.loaded = false;
    if (!e.loaded) {
        r.readFilesInDirectory(n.POST_DIRECTORY_PATH, function(t) {
            var i = JSON.parse(this.result);
            e.posts.push(i);
            e.loaded = true;
            e.$apply();
        });
    }
    e.deletePost = function(t) {
        r.removeFile(t.path, function() {
            e.posts.splice(t);
            e.$apply();
        });
    };
    e.editPost = function(e) {
        i.path("posts/" + e.id);
    };
    e.deleteAll = function() {
        r.clearDirectory(n.POST_DIRECTORY_PATH, function() {
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
        link: function(e, t, i, r) {
            if (!r) return;
            r.$render = function() {
                t.html(r.$viewValue || "");
            };
            t.bind("blur keyup change", function() {
                e.$apply(n);
            });
            var n = function() {
                r.$setViewValue(t.html());
            };
            n();
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
    var i = function(i, r, n) {
        if (e) {
            e.root.getFile(i, {
                create: r
            }, n, function(e) {
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
        readFilesInDirectory: function(r, n) {
            if (e) {
                e.root.getDirectory(r, {
                    create: true
                }, function(e) {
                    var o = e.createReader();
                    o.readEntries(function(e) {
                        _.each(e, function(e) {
                            if (e.isFile) {
                                i(e.fullPath, false, function(i) {
                                    i.file(function(e) {
                                        var t = new FileReader();
                                        t.onloadend = n;
                                        t.readAsText(e);
                                    }, function(i) {
                                        t(i, "in readFilesInDirectory, while getting file " + e.fullPath);
                                    });
                                });
                            }
                        });
                    }, function(e) {
                        t(e, "in readFilesInDirectory, while reading entries from " + r);
                    });
                }, function(e) {
                    t(e, "in readFilesInDirectory, while getting directory " + r);
                });
            }
        },
        clearDirectory: function(r) {
            if (e) {
                e.root.getDirectory(r, {}, function(e) {
                    var n = e.createReader();
                    n.readEntries(function(e) {
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
                        t(e, "in clearDirectory, while reading entries for " + r);
                    });
                }, function(e) {
                    t(e, "in clearDirectory(), while getting directory " + r);
                });
            }
        },
        writeFile: function(e, r, n, o) {
            i(e, true, function(i) {
                i.createWriter(function(e) {
                    var r = new Blob([ n ], {
                        type: "text/javascript"
                    });
                    e.onerror = t;
                    e.onwriteend = o(i);
                    e.write(r);
                }, function(i) {
                    t(i, "in writeFile(), while creating fileWriter for " + e + "/" + r);
                });
            });
        },
        readFile: function(e, r) {
            i(e, false, function(i) {
                i.file(function(e) {
                    var t = new FileReader();
                    t.onload = function(e) {
                        r(e.target.result);
                    };
                    t.readAsText(e);
                }, function(i) {
                    t(i, "in readingFile(), while reading file " + e);
                });
            });
        },
        removeFile: function(e, r) {
            i(e, false, function(i) {
                i.remove(r, function(i) {
                    t(i, "in removeFile(), while reading file " + e);
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