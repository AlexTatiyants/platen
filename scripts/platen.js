/*! platen 2013-04-17 */
"use strict";

angular.module("platen.directives", []);

angular.module("platen.services", []);

var platen = angular.module("platen", [ "platen.directives", "platen.services", "$strap.directives" ]).config([ "$routeProvider", function(e) {
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

var EditorController = function(e, t, n, o, r, i, a, l) {
    var s = 12e3;
    e.status = {};
    e.previewOn = false;
    e.status.autoSaveTime = "unsaved";
    e.showMetadata = false;
    e.post = {};
    var c = function(e) {
        return "/" + l.POST_DIRECTORY_PATH + "/" + e;
    };
    var u = function() {
        e.post.id = new Date().getTime();
        e.post.path = c(e.post.id);
        e.post.createdDate = new Date();
        e.post.lastUpdatedDate = "";
        e.post.title = "";
        e.post.contentMarkdown = "";
        e.post.contentHtml = "";
        e.post.excerpt = "";
        e.post.tags = "";
        e.post.categories = "";
        e.post.status = "";
    };
    var f = function(t) {
        r.readFile(c(t), function(t) {
            e.post = JSON.parse(t);
            e.$apply();
            i.log("loaded post '" + e.post.title + "'", "EditorController");
        });
    };
    var d = function() {
        if (t.postId === "0") {
            u();
        } else {
            f(t.postId);
        }
    };
    d();
    $("#post-title").focus();
    var p = function() {
        if (e.post.title.trim() === "" && e.post.contentMarkdown.trim() === "") return;
        var t = JSON.parse(JSON.stringify(e.post));
        t.contentHtml = "";
        t.lastUpdatedDate = new Date();
        r.writeFile(e.post.path, e.post.id, JSON.stringify(t), function(t) {
            e.status.autoSaveTime = o("date")(new Date(), "shortTime");
            i.log("saved post '" + e.post.title + "' on " + e.status.autoSaveTime, "EditorController");
        });
    };
    e.togglePreview = function() {
        if (!e.previewOn) {
            e.post.contentHtml = marked(e.post.contentMarkdown);
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
    e.sync = function() {
        if (!a.areCredentialsSet) {}
        e.post.content = marked(e.post.contentMarkdown).replace(/</g, "&lt;").replace(/>/g, "&gt;");
        a.savePost(e.post);
    };
    e.$on("postContentChanged", function(e, t) {
        p();
    });
};

EditorController.$inject = [ "$scope", "$routeParams", "$timeout", "$filter", "fileManager", "logger", "wordpress", "resources" ];

var LoginController = function(e) {
    e.login = {};
};

LoginController.$inject = [ "$scope" ];

var LogsController = function(e, t) {
    e.logs = t.getLogs();
};

LogsController.$inject = [ "$scope", "logger" ];

var MainController = function(e, t, n) {
    t.initialize();
    e.modal = {
        content: "Hello Modal",
        saved: false
    };
    e.viaService = function() {
        var e = n({
            template: "views/pages/modal.html",
            show: true,
            backdrop: "static"
        });
    };
    e.parentController = function(e) {
        console.warn(arguments);
        e();
    };
    e.dismiss = function() {
        console.log("dismissing");
        dismiss();
    };
};

MainController.$inject = [ "$scope", "fileManager", "$modal" ];

var PostsController = function(e, t, n, o, r, i) {
    e.posts = {};
    e.loaded = false;
    if (!e.loaded) {
        o.readFilesInDirectory(i.POST_DIRECTORY_PATH, function(t) {
            var n = JSON.parse(this.result);
            e.posts[n.id] = n;
            e.loaded = true;
            e.$apply();
            r.log("read post '" + n.title + "'", "PostsController");
        });
    }
    e.deletePost = function(t) {
        o.removeFile(t.path, function() {
            delete e.posts[t.id];
            e.$apply();
            r.log("deleted post '" + t.title + "'", "PostsController");
        });
    };
    e.editPost = function(e) {
        n.path("posts/" + e.id);
    };
    e.deleteAll = function() {
        o.clearDirectory(i.POST_DIRECTORY_PATH, function() {
            r.log("deleted all posts", "PostsController");
            e.posts = {};
        });
    };
};

PostsController.$inject = [ "$scope", "$q", "$location", "fileManager", "logger", "resources" ];

angular.module("platen.directives").directive("editable", function() {
    return {
        restrict: "A",
        require: "?ngModel",
        link: function(e, t, n, o) {
            if (!o) return;
            o.$render = function() {
                t.html(o.$viewValue || "");
            };
            t.bind("blur keyup change", function() {
                e.$apply(r);
            });
            var r = function() {
                o.$setViewValue(t.context.innerText);
            };
            t.bind("blur paste", function() {
                e.$emit("postContentChanged");
            });
            r();
        }
    };
});

angular.module("platen.directives").directive("markdownenabled", function() {
    return {
        restrict: "A",
        require: "?ngModel",
        link: function(e, t, n, o) {
            if (!o) return;
            o.$render = function() {
                t.html(o.$viewValue || "");
            };
            t.bind("blur keyup change", function() {
                e.$apply(r);
            });
            var r = function() {
                e.post.contentMarkdown = t.context.innerText;
                o.$setViewValue(t.html());
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
        var n = "";
        switch (e.code) {
          case FileError.QUOTA_EXCEEDED_ERR:
            n = "QUOTA_EXCEEDED_ERR";
            break;

          case FileError.NOT_FOUND_ERR:
            n = "NOT_FOUND_ERR";
            break;

          case FileError.SECURITY_ERR:
            n = "SECURITY_ERR";
            break;

          case FileError.INVALID_MODIFICATION_ERR:
            n = "INVALID_MODIFICATION_ERR";
            break;

          case FileError.INVALID_STATE_ERR:
            n = "INVALID_STATE_ERR";
            break;

          default:
            n = "Unknown Error";
            break;
        }
        console.log("Error: " + n, t);
    };
    var n = function(n, o, r) {
        if (e) {
            e.root.getFile(n, {
                create: o
            }, r, function(e) {
                t(e, "in handleFile(), while getting file path " + n);
            });
        }
    };
    return {
        initialize: function() {
            window.webkitRequestFileSystem(PERSISTENT, 1024 * 1024, function(t) {
                e = t;
            });
        },
        readFilesInDirectory: function(o, r) {
            if (e) {
                e.root.getDirectory(o, {
                    create: true
                }, function(e) {
                    var i = e.createReader();
                    i.readEntries(function(e) {
                        _.each(e, function(e) {
                            if (e.isFile) {
                                n(e.fullPath, false, function(n) {
                                    n.file(function(e) {
                                        var t = new FileReader();
                                        t.onloadend = r;
                                        t.readAsText(e);
                                    }, function(n) {
                                        t(n, "in readFilesInDirectory, while getting file " + e.fullPath);
                                    });
                                });
                            }
                        });
                    }, function(e) {
                        t(e, "in readFilesInDirectory, while reading entries from " + o);
                    });
                }, function(e) {
                    t(e, "in readFilesInDirectory, while getting directory " + o);
                });
            }
        },
        clearDirectory: function(o) {
            if (e) {
                e.root.getDirectory(o, {}, function(e) {
                    var r = e.createReader();
                    r.readEntries(function(e) {
                        _.each(e, function(e) {
                            if (e.isFile) {
                                n(e.fullPath, false, function(n) {
                                    n.remove(function() {
                                        console.log("removed file " + e.fullPath);
                                    }, function(n) {
                                        t(n, "while removing file " + e.fullPath);
                                    });
                                });
                            }
                        });
                    }, function(e) {
                        t(e, "in clearDirectory, while reading entries for " + o);
                    });
                }, function(e) {
                    t(e, "in clearDirectory(), while getting directory " + o);
                });
            }
        },
        writeFile: function(e, o, r, i) {
            n(e, true, function(n) {
                n.createWriter(function(e) {
                    var o = new Blob([ r ], {
                        type: "text/javascript"
                    });
                    e.onerror = t;
                    e.onwriteend = i(n);
                    e.write(o);
                }, function(n) {
                    t(n, "in writeFile(), while creating fileWriter for " + e + "/" + o);
                });
            });
        },
        readFile: function(e, o) {
            n(e, false, function(n) {
                n.file(function(e) {
                    var t = new FileReader();
                    t.onload = function(e) {
                        o(e.target.result);
                    };
                    t.readAsText(e);
                }, function(n) {
                    t(n, "in readingFile(), while reading file " + e);
                });
            });
        },
        removeFile: function(e, o) {
            n(e, false, function(n) {
                n.remove(o, function(n) {
                    t(n, "in removeFile(), while reading file " + e);
                });
            });
        }
    };
});

angular.module("platen.services").factory("logger", function() {
    var e = 100;
    var t = 0;
    var n = [];
    return {
        log: function(o, r) {
            if (n.length > e) {
                console.log("removing log item");
                var i = n[t];
                if (++t * 2 >= n.length) {
                    n = n.slice(t);
                    t = 0;
                }
            }
            n.push({
                message: o,
                location: r,
                date: new Date()
            });
        },
        getLogs: function() {
            return n;
        }
    };
});

angular.module("platen.services").value("resources", {
    POST_DIRECTORY_PATH: "posts"
});

angular.module("platen.services").factory("wordpress", function() {
    var e = "post";
    var t = 1;
    var n = 1;
    var o = "";
    var r = "";
    var i = "";
    var a = null;
    var l = function() {
        if (!a) {
            a = new WordPress(o, r, i);
        }
    };
    return {
        setCredentials: function(e, t, n) {
            o = e;
            r = t;
            i = n;
        },
        areCredentialsSet: function() {
            if (o === "" || r === "" || i === "") {
                return false;
            }
            return true;
        },
        savePost: function(o) {
            if (!a) return;
            var r;
            var i = {
                post_type: e,
                post_status: o.status,
                post_title: o.title,
                post_author: n,
                post_excerpt: o.excerpt,
                post_content: o.content,
                post_format: ""
            };
            if (o.wordPressId) {
                r = a.editPost(t, o.wordPressId, content);
            } else {
                r = a.newPost(t, i);
                o.wordPressId = r;
            }
        }
    };
});