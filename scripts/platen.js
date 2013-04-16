/*! platen 2013-04-16 */
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

var EditorController = function(e, t, o, n, i, r, l) {
    var a = 12e3;
    e.status = {};
    e.previewOn = false;
    e.status.autoSaveTime = "unsaved";
    e.showMetadata = true;
    e.post = {};
    var s = function(e) {
        return "/" + l.POST_DIRECTORY_PATH + "/" + e;
    };
    var c = function() {
        e.post.id = new Date().getTime();
        e.post.path = s(e.post.id);
        e.post.createdDate = new Date();
        e.post.lastUpdatedDate = "";
        e.post.title = "";
        e.post.content = "";
        e.post.htmlPreview = "";
        e.post.excerpt = "";
        e.post.tags = "";
        e.post.categories = "";
        e.post.status = "";
    };
    var u = function(t) {
        i.readFile(s(t), function(t) {
            e.post = JSON.parse(t);
            e.$apply();
            r.log("loaded post '" + e.post.title + "'", "EditorController");
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
    $("#post-title").focus();
    var p = function() {
        if (e.post.title.trim() === "" && e.post.content.trim() === "") return;
        var t = JSON.parse(JSON.stringify(e.post));
        t.htmlPreview = "";
        t.lastUpdatedDate = new Date();
        i.writeFile(e.post.path, e.post.id, JSON.stringify(t), function(t) {
            e.status.autoSaveTime = n("date")(new Date(), "shortTime");
            r.log("saved post '" + e.post.title + "' on " + e.status.autoSaveTime, "EditorController");
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
        if (e.showMetadata && e.post.excerpt === "") {
            e.updateExcerpt();
        }
    };
    e.updateExcerpt = function() {
        console.log(e.post);
    };
    e.$on("postContentChanged", function(e, t) {
        p();
    });
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

var PostsController = function(e, t, o, n, i, r) {
    e.posts = [];
    e.loaded = false;
    if (!e.loaded) {
        n.readFilesInDirectory(r.POST_DIRECTORY_PATH, function(t) {
            var o = JSON.parse(this.result);
            e.posts.push(o);
            e.loaded = true;
            e.$apply();
            i.log("read post '" + o.title + "'", "PostsController");
        });
    }
    e.deletePost = function(t) {
        n.removeFile(t.path, function() {
            e.posts.splice(t);
            e.$apply();
            i.log("deleted post '" + t.title + "'", "PostsController");
        });
    };
    e.editPost = function(e) {
        o.path("posts/" + e.id);
    };
    e.deleteAll = function() {
        n.clearDirectory(r.POST_DIRECTORY_PATH, function() {
            i.log("deleted all posts", "PostsController");
            e.posts = [];
        });
    };
};

PostsController.$inject = [ "$scope", "$q", "$location", "fileManager", "logger", "resources" ];

angular.module("platen.directives").directive("contenteditable", function() {
    return {
        restrict: "A",
        require: "?ngModel",
        link: function(e, t, o, n) {
            if (!n) return;
            n.$render = function() {
                t.html(n.$viewValue || "");
            };
            t.bind("blur keyup change", function() {
                e.$apply(i);
            });
            var i = function() {
                n.$setViewValue(t.html());
            };
            t.bind("blur paste", function() {
                e.$emit("postContentChanged");
            });
            i();
        }
    };
});

angular.module("platen.services").factory("fileManager", function() {
    var e;
    var t = function(e, t) {
        var o = "";
        switch (e.code) {
          case FileError.QUOTA_EXCEEDED_ERR:
            o = "QUOTA_EXCEEDED_ERR";
            break;

          case FileError.NOT_FOUND_ERR:
            o = "NOT_FOUND_ERR";
            break;

          case FileError.SECURITY_ERR:
            o = "SECURITY_ERR";
            break;

          case FileError.INVALID_MODIFICATION_ERR:
            o = "INVALID_MODIFICATION_ERR";
            break;

          case FileError.INVALID_STATE_ERR:
            o = "INVALID_STATE_ERR";
            break;

          default:
            o = "Unknown Error";
            break;
        }
        console.log("Error: " + o, t);
    };
    var o = function(o, n, i) {
        if (e) {
            e.root.getFile(o, {
                create: n
            }, i, function(e) {
                t(e, "in handleFile(), while getting file path " + o);
            });
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
                e.root.getDirectory(n, {
                    create: true
                }, function(e) {
                    var r = e.createReader();
                    r.readEntries(function(e) {
                        _.each(e, function(e) {
                            if (e.isFile) {
                                o(e.fullPath, false, function(o) {
                                    o.file(function(e) {
                                        var t = new FileReader();
                                        t.onloadend = i;
                                        t.readAsText(e);
                                    }, function(o) {
                                        t(o, "in readFilesInDirectory, while getting file " + e.fullPath);
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
                    var i = e.createReader();
                    i.readEntries(function(e) {
                        _.each(e, function(e) {
                            if (e.isFile) {
                                o(e.fullPath, false, function(o) {
                                    o.remove(function() {
                                        console.log("removed file " + e.fullPath);
                                    }, function(o) {
                                        t(o, "while removing file " + e.fullPath);
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
        writeFile: function(e, n, i, r) {
            o(e, true, function(o) {
                o.createWriter(function(e) {
                    var n = new Blob([ i ], {
                        type: "text/javascript"
                    });
                    e.onerror = t;
                    e.onwriteend = r(o);
                    e.write(n);
                }, function(o) {
                    t(o, "in writeFile(), while creating fileWriter for " + e + "/" + n);
                });
            });
        },
        readFile: function(e, n) {
            o(e, false, function(o) {
                o.file(function(e) {
                    var t = new FileReader();
                    t.onload = function(e) {
                        n(e.target.result);
                    };
                    t.readAsText(e);
                }, function(o) {
                    t(o, "in readingFile(), while reading file " + e);
                });
            });
        },
        removeFile: function(e, n) {
            o(e, false, function(o) {
                o.remove(n, function(o) {
                    t(o, "in removeFile(), while reading file " + e);
                });
            });
        }
    };
});

angular.module("platen.services").factory("logger", function() {
    var e = 100;
    var t = 0;
    var o = [];
    return {
        log: function(n, i) {
            if (o.length > e) {
                console.log("removing log item");
                var r = o[t];
                if (++t * 2 >= o.length) {
                    o = o.slice(t);
                    t = 0;
                }
            }
            o.push({
                message: n,
                location: i,
                date: new Date()
            });
        },
        getLogs: function() {
            return o;
        }
    };
});

angular.module("platen.services").value("resources", {
    POST_DIRECTORY_PATH: "posts"
});