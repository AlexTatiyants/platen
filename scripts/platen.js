/*! platen 2013-04-19 */
"use strict";

angular.module("platen.directives", []);

angular.module("platen.services", []);

var platen = angular.module("platen", [ "platen.directives", "platen.services", "ui.bootstrap" ]).config([ "$routeProvider", function(e) {
    e.when("/posts", {
        templateUrl: "views/pages/posts.html"
    });
    e.when("/posts/:postId", {
        templateUrl: "views/pages/edit.html"
    });
    e.when("/logs", {
        templateUrl: "views/pages/logs.html"
    });
    e.when("/login", {
        templateUrl: "views/pages/login.html"
    });
    e.otherwise({
        redirectTo: "/posts"
    });
} ]);

var EditorController = function(e, t, o, n, r, i, a, l) {
    var s = 12e3;
    var c = "draft";
    var u = "publish";
    var d = "post-title";
    var f = "post-content";
    e.status = {};
    e.previewOn = false;
    e.status.autoSaveTime = "unsaved";
    e.showMetadata = false;
    e.post = {};
    var p = function(e) {
        return "/" + l.POST_DIRECTORY_PATH + "/" + e;
    };
    var g = function() {
        e.post.id = new Date().getTime();
        e.post.path = p(e.post.id);
        e.post.status = c;
        e.post.title = "";
        e.post.content = "";
        e.post.contentMarkdown = "";
        e.post.contentMarkdownHtml = "";
        e.post.contentHtmlPreview = "";
        e.post.excerpt = "";
        e.post.createdDate = new Date();
        e.post.lastUpdatedDate = "";
        e.post.tags = "";
        e.post.categories = "";
    };
    var v = function(t) {
        r.readFile(p(t), function(t) {
            e.post = JSON.parse(t);
            e.$apply();
            i.log("loaded post '" + e.post.title + "'", "EditorController");
        });
    };
    var w = function() {
        if (t.postId === "0") {
            g();
        } else {
            v(t.postId);
        }
    };
    w();
    $("#post-title").focus();
    var m = function() {
        if (e.post.title.trim() === "" && e.post.contentMarkdown.trim() === "") return;
        var t = JSON.parse(JSON.stringify(e.post));
        t.content = "";
        t.contentHtmlPreview = "";
        t.lastUpdatedDate = new Date();
        r.writeFile(e.post.path, e.post.id, JSON.stringify(t), function(t) {
            e.status.autoSaveTime = n("date")(new Date(), "shortTime");
            i.log("saved post '" + e.post.title + "' on " + e.status.autoSaveTime, "EditorController");
        });
    };
    e.togglePreview = function() {
        if (!e.previewOn) {
            e.post.contentHtmlPreview = marked(e.post.contentMarkdown);
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
        e.post.content = marked(e.post.contentMarkdown).replace(/</g, "&lt;").replace(/>/g, "&gt;");
        a.savePost(e.post, function(t) {
            e.post.wordPressId = t;
            m();
        }, function(e) {
            alert("OOPS" + e);
        });
    };
    e.$on("elementEdited", function(e, t) {
        if (t === d || t === f) {
            m();
        }
    });
};

EditorController.$inject = [ "$scope", "$routeParams", "$timeout", "$filter", "fileManager", "logger", "wordpress", "resources" ];

var LoginController = function(e, t, o) {
    e.login = o.login;
    console.log(e.login);
    e.submit = function() {
        t.close("ok");
    };
};

LoginController.$inject = [ "$scope", "dialog", "wordpress" ];

var LogsController = function(e, t) {
    e.logs = t.getLogs();
};

LogsController.$inject = [ "$scope", "logger" ];

var MainController = function(e, t) {
    t.initialize();
};

MainController.$inject = [ "$scope", "fileManager" ];

var PostsController = function(e, t, o, n, r, i) {
    e.posts = {};
    e.loaded = false;
    if (!e.loaded) {
        n.readFilesInDirectory(i.POST_DIRECTORY_PATH, function(t) {
            var o = JSON.parse(this.result);
            e.posts[o.id] = o;
            e.loaded = true;
            e.$apply();
            r.log("read post '" + o.title + "'", "PostsController");
        });
    }
    e.deletePost = function(t) {
        n.removeFile(t.path, function() {
            delete e.posts[t.id];
            e.$apply();
            r.log("deleted post '" + t.title + "'", "PostsController");
        });
    };
    e.editPost = function(e) {
        o.path("posts/" + e.id);
    };
    e.deleteAll = function() {
        n.clearDirectory(i.POST_DIRECTORY_PATH, function() {
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
        link: function(e, t, o, n) {
            if (!n) return;
            n.$render = function() {
                t.html(n.$viewValue || "");
            };
            t.bind("blur keyup change", function() {
                e.$apply(r);
            });
            var r = function() {
                n.$setViewValue(t.context.innerText);
            };
            t.bind("blur paste", function() {
                e.$emit("elementEdited", t[0].id);
            });
            r();
        }
    };
});

angular.module("platen.directives").directive("markdownenabled", function() {
    return {
        restrict: "A",
        require: "?ngModel",
        link: function(e, t, o, n) {
            if (!n) return;
            n.$render = function() {
                t.html(n.$viewValue || "");
            };
            t.bind("blur keyup change", function() {
                e.$apply(r);
            });
            var r = function() {
                e.post.contentMarkdown = t.context.innerText;
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
    var o = function(o, n, r) {
        if (e) {
            e.root.getFile(o, {
                create: n
            }, r, function(e) {
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
        readFilesInDirectory: function(n, r) {
            if (e) {
                e.root.getDirectory(n, {
                    create: true
                }, function(e) {
                    var i = e.createReader();
                    i.readEntries(function(e) {
                        _.each(e, function(e) {
                            if (e.isFile) {
                                o(e.fullPath, false, function(o) {
                                    o.file(function(e) {
                                        var t = new FileReader();
                                        t.onloadend = r;
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
                    var r = e.createReader();
                    r.readEntries(function(e) {
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
        writeFile: function(e, n, r, i) {
            o(e, true, function(o) {
                o.createWriter(function(e) {
                    var n = new Blob([ r ], {
                        type: "text/javascript"
                    });
                    e.onerror = t;
                    e.onwriteend = i(o);
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
        log: function(n, r) {
            if (o.length > e) {
                console.log("removing log item");
                var i = o[t];
                if (++t * 2 >= o.length) {
                    o = o.slice(t);
                    t = 0;
                }
            }
            o.push({
                message: n,
                location: r,
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

angular.module("platen.services").factory("wordpress", [ "$dialog", "logger", function(e, t) {
    var o = "post";
    var n = 1;
    var r = 1;
    var i = {
        url: "http://localhost:8888/",
        username: "admin",
        password: "admin"
    };
    var a = null;
    var l = function(o, n) {
        var r = e.dialog({
            backdrop: true,
            keyboard: true,
            backdropClick: true,
            controller: "LoginController",
            templateUrl: "views/pages/login.html"
        });
        r.open().then(function() {
            var e = i.url.replace(/\/$/, "") + "/xmlrpc.php";
            try {
                a = new WordPress(e, i.username, i.password);
                t.log("logged into blog '" + i.url + "'", "wordpress service");
                o();
            } catch (r) {
                t.log("unable to log into blog '" + i.url + "': " + r.message, "wordpress service");
                n(r.message);
            }
        });
    };
    var s = function(e, l, s) {
        var u;
        var d = {
            post_type: o,
            post_status: e.status,
            post_title: e.title,
            post_author: r,
            post_excerpt: e.excerpt,
            post_content: e.content,
            post_format: ""
        };
        if (e.wordPressId) {
            u = a.editPost(n, e.wordPressId, d);
            c(u, e, function() {
                t.log("updated post '" + e.title + "' in blog '" + i.url + "'", "wordpress service");
            }, s);
        } else {
            u = a.newPost(n, d);
            c(u, e, function() {
                l(u.concat());
                t.log("created post '" + e.title + "' in blog '" + i.url + "'", "wordpress service");
            }, s);
        }
    };
    var c = function(e, o, n, r) {
        if (e.faultCode) {
            var a = e.faultString.concat();
            t.log("error for post '" + o.title + "' in blog '" + i.url + "': " + a, "wordpress service");
            r(a);
        } else {
            n();
        }
    };
    return {
        login: i,
        getPost: function(e) {
            if (!a) l();
        },
        savePost: function(e, t, o) {
            if (!a) {
                l(function() {
                    s(e, t, o);
                }, o);
            } else {
                s(e, t, o);
            }
        }
    };
} ]);