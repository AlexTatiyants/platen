/*! platen 2013-04-15 */
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
    e.when("/logs", {
        templateUrl: "views/pages/logs.html"
    });
    e.otherwise({
        redirectTo: "/posts"
    });
} ]);

var EditorController = function(e, t, i, n, r, o, l) {
    var a = 12e3;
    e.post = {};
    e.status = {};
    e.post.title = "UNTITLED";
    e.previewOn = false;
    e.status.autoSaveTime = "unsaved";
    e.showMetadata = false;
    var s = function(e) {
        return "/" + l.POST_DIRECTORY_PATH + "/" + e;
    };
    var c = function() {
        e.post.id = new Date().getTime();
        e.post.path = s(e.post.id);
        e.post.createdDate = new Date();
        o.log("created post '" + e.post.title + "'", "EditorController");
    };
    var u = function(t) {
        r.readFile(s(t), function(t) {
            e.post = JSON.parse(t);
            e.$apply();
            o.log("loaded post '" + e.post.title + "'", "EditorController");
        });
    };
    var f = function() {
        if (t.postId === "0") {
            c();
        } else {
            u(t.postId);
        }
    };
    f();
    var d = function() {
        var t = JSON.parse(JSON.stringify(e.post));
        t.htmlPreview = "";
        r.writeFile(e.post.path, e.post.id, JSON.stringify(t), function(t) {
            e.status.autoSaveTime = n("date")(new Date(), "shortTime");
            o.log("saved post '" + e.post.title + "' on " + e.status.autoSaveTime, "EditorController");
        });
    };
    e.togglePreview = function() {
        if (!e.previewOn) {
            e.post.htmlPreview = marked(e.post.content);
        }
        e.previewOn = !e.previewOn;
    };
    e.toggleMetadataPanel = function() {
        e.showMetadata = !e.showMetadata;
    };
    e.$on("postContentChanged", function(e, t) {
        d();
    });
    $("#post-title").focus();
};

EditorController.$inject = [ "$scope", "$routeParams", "$timeout", "$filter", "fileManager", "logger", "resources" ];

var LoginController = function(e) {
    e.login = {};
};

LoginController.$inject = [ "$scope" ];

var LogsController = function(e, t) {
    e.logs = t.getLogs();
};

LogsController.$inject = [ "$scope", "logger" ];

var MainController = function(e, t) {
    t.initialize();
};

MainController.$inject = [ "$scope", "fileManager" ];

var PostsController = function(e, t, i, n, r, o) {
    e.posts = [];
    e.loaded = false;
    if (!e.loaded) {
        n.readFilesInDirectory(o.POST_DIRECTORY_PATH, function(t) {
            var i = JSON.parse(this.result);
            e.posts.push(i);
            e.loaded = true;
            e.$apply();
            r.log("read post '" + i.title + "'", "PostsController");
        });
    }
    e.deletePost = function(t) {
        n.removeFile(t.path, function() {
            e.posts.splice(t);
            e.$apply();
            r.log("deleted post '" + t.title + "'", "PostsController");
        });
    };
    e.editPost = function(e) {
        i.path("posts/" + e.id);
    };
    e.deleteAll = function() {
        n.clearDirectory(o.POST_DIRECTORY_PATH, function() {
            r.log("deleted all posts", "PostsController");
            e.posts = [];
        });
    };
};

PostsController.$inject = [ "$scope", "$q", "$location", "fileManager", "logger", "resources" ];

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
            t.bind("blur paste", function() {
                e.$emit("postContentChanged");
            });
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

angular.module("platen.services").factory("logger", function() {
    var e = 100;
    var t = 0;
    var i = [];
    return {
        log: function(n, r) {
            if (i.length > e) {
                console.log("removing log item");
                var o = i[t];
                if (++t * 2 >= i.length) {
                    i = i.slice(t);
                    t = 0;
                }
            }
            i.push({
                message: n,
                location: r,
                date: new Date()
            });
        },
        getLogs: function() {
            return i;
        }
    };
});

angular.module("platen.services").value("resources", {
    POST_DIRECTORY_PATH: "posts"
});