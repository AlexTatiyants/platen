/*! platen 2013-04-23 */
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

var EditorController = function(e, t, o, r, n, i, l, a) {
    var s = 12e3;
    var c = "draft";
    var u = "publish";
    var d = "post-title";
    var p = "post-content";
    e.status = {};
    e.previewOn = false;
    e.status.autoSaveTime = "unsaved";
    e.showMetadata = false;
    e.post = {};
    var f = function(e) {
        return "/" + a.POST_DIRECTORY_PATH + "/" + e;
    };
    var g = function() {
        e.post.id = new Date().getTime();
        e.post.path = f(e.post.id);
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
        n.readFile(f(t), function(t) {
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
        n.writeFile(e.post.path, e.post.id, JSON.stringify(t), function(t) {
            e.status.autoSaveTime = r("date")(new Date(), "shortTime");
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
    e.read = function() {
        v(e.post.id);
    };
    e.sync = function() {
        e.post.content = marked(e.post.contentMarkdown).replace(/</g, "&lt;").replace(/>/g, "&gt;");
        l.savePost(e.post, function(t) {
            e.post.wordPressId = t;
            m();
        }, function(e) {
            alert("OOPS" + e);
        });
    };
    e.$on("elementEdited", function(e, t) {
        if (t === d || t === p) {
            m();
        }
    });
};

EditorController.$inject = [ "$scope", "$routeParams", "$timeout", "$filter", "fileManager", "logger", "wordpress", "resources" ];

var LoginController = function(e, t, o) {
    e.login = o.login;
    e.submit = function() {
        t.close("ok");
    };
    e.resetCredentials = function() {
        o.resetCredentials();
        t.close();
    };
    e.cancel = function() {
        t.close();
    };
};

LoginController.$inject = [ "$scope", "dialog", "wordpress" ];

var LogsController = function(e, t) {
    e.logs = t.getLogs();
};

LogsController.$inject = [ "$scope", "logger" ];

var MainController = function(e, t, o) {
    o.initialize();
    var r;
    e.loginCredentials = function() {
        r = t.dialog({
            backdrop: true,
            keyboard: true,
            backdropClick: true,
            controller: "LoginController",
            templateUrl: "views/pages/login.html"
        });
        r.open();
    };
};

MainController.$inject = [ "$scope", "$dialog", "fileManager" ];

var PostsController = function(e, t, o, r, n, i) {
    e.posts = {};
    e.loaded = false;
    if (!e.loaded) {
        r.readFilesInDirectory(i.POST_DIRECTORY_PATH, function(t) {
            var o = JSON.parse(this.result);
            e.posts[o.id] = o;
            e.loaded = true;
            e.$apply();
            n.log("read post '" + o.title + "'", "PostsController");
        });
    }
    e.deletePost = function(t) {
        r.removeFile(t.path, function() {
            delete e.posts[t.id];
            e.$apply();
            n.log("deleted post '" + t.title + "'", "PostsController");
        });
    };
    e.editPost = function(e) {
        o.path("posts/" + e.id);
    };
    e.deleteAll = function() {
        r.clearDirectory(i.POST_DIRECTORY_PATH, function() {
            n.log("deleted all posts", "PostsController");
            e.posts = {};
        });
    };
};

PostsController.$inject = [ "$scope", "$q", "$location", "fileManager", "logger", "resources" ];

angular.module("platen.directives").directive("editableMarkdown", function() {
    return {
        restrict: "A",
        require: "?ngModel",
        link: function(e, t, o, r) {
            if (!r) return;
            r.$render = function() {
                t.html(r.$viewValue || "");
            };
            t.bind("blur keyup change", function() {
                e.$apply(n);
            });
            var n = function() {
                e.post.contentMarkdown = t.context.innerText;
                r.$setViewValue(t.html());
            };
            t.bind("blur paste", function() {
                e.$emit("elementEdited", t[0].id);
            });
            n();
        }
    };
});

angular.module("platen.directives").directive("editableText", function() {
    return {
        restrict: "A",
        require: "?ngModel",
        link: function(e, t, o, r) {
            if (!r) return;
            r.$render = function() {
                t.html(r.$viewValue || "");
            };
            t.bind("blur keyup change", function() {
                e.$apply(n);
            });
            var n = function() {
                r.$setViewValue(t.context.innerText);
            };
            t.bind("blur paste", function() {
                e.$emit("elementEdited", t[0].id);
            });
            n();
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
    var o = function(o, r, n) {
        if (e) {
            e.root.getFile(o, {
                create: r
            }, n, function(e) {
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
        readFilesInDirectory: function(r, n) {
            if (e) {
                e.root.getDirectory(r, {
                    create: true
                }, function(e) {
                    var i = e.createReader();
                    i.readEntries(function(e) {
                        _.each(e, function(e) {
                            if (e.isFile) {
                                o(e.fullPath, false, function(o) {
                                    o.file(function(e) {
                                        var t = new FileReader();
                                        t.onloadend = n;
                                        t.readAsText(e);
                                    }, function(o) {
                                        t(o, "in readFilesInDirectory, while getting file " + e.fullPath);
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
                        t(e, "in clearDirectory, while reading entries for " + r);
                    });
                }, function(e) {
                    t(e, "in clearDirectory(), while getting directory " + r);
                });
            }
        },
        writeFile: function(e, r, n, i) {
            o(e, true, function(o) {
                o.createWriter(function(e) {
                    var r = new Blob([ n ], {
                        type: "text/plain"
                    });
                    e.onerror = t;
                    e.onwriteend = function() {
                        e.onwriteend = null;
                        e.write(r);
                        i(o);
                    };
                    e.truncate(r.size);
                }, function(o) {
                    t(o, "in writeFile(), while creating fileWriter for " + e + "/" + r);
                });
            });
        },
        readFile: function(e, r) {
            o(e, false, function(o) {
                o.file(function(e) {
                    var t = new FileReader();
                    t.onload = function(e) {
                        r(e.target.result);
                    };
                    t.readAsText(e);
                }, function(o) {
                    t(o, "in readingFile(), while reading file " + e);
                });
            });
        },
        removeFile: function(e, r) {
            o(e, false, function(o) {
                o.remove(r, function(o) {
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
        log: function(r, n) {
            if (o.length > e) {
                console.log("removing log item");
                var i = o[t];
                if (++t * 2 >= o.length) {
                    o = o.slice(t);
                    t = 0;
                }
            }
            o.push({
                message: r,
                location: n,
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
    var r = 1;
    var n = 1;
    var i = {
        url: localStorage["url"],
        username: localStorage["username"],
        password: localStorage["password"],
        shouldStoreCredentials: false
    };
    var l = null;
    var a = function(t, o) {
        if (i.url.trim() === "" || i.username.trim() === "" || i.password.trim() === "") {
            var r = e.dialog({
                backdrop: true,
                keyboard: true,
                backdropClick: true,
                controller: "LoginController",
                templateUrl: "views/pages/login.html"
            });
            r.open().then(function() {
                s(t, o);
            });
        } else {
            s(t, o);
        }
    };
    var s = function(e, o) {
        var r = i.url.replace(/\/$/, "") + "/xmlrpc.php";
        try {
            l = new WordPress(r, i.username, i.password);
            t.log("logged into blog '" + i.url + "'", "wordpress service");
            if (i.shouldStoreCredentials) {
                localStorage["url"] = i.url;
                localStorage["username"] = i.username;
                localStorage["password"] = i.password;
                t.log("saved login credentials for blog + '" + i.url + "'", "wordpress service");
            }
            e();
        } catch (n) {
            t.log("unable to log into blog '" + i.url + "': " + n.message, "wordpress service");
            o(n.message);
        }
    };
    var c = function(e, a, s) {
        var c;
        var d = {
            post_type: o,
            post_status: e.status,
            post_title: e.title,
            post_author: n,
            post_excerpt: e.excerpt,
            post_content: e.content,
            post_format: ""
        };
        if (e.wordPressId) {
            c = l.editPost(r, e.wordPressId, d);
            u(c, e, function() {
                t.log("updated post '" + e.title + "' in blog '" + i.url + "'", "wordpress service");
            }, s);
        } else {
            c = l.newPost(r, d);
            u(c, e, function() {
                a(c.concat());
                t.log("created post '" + e.title + "' in blog '" + i.url + "'", "wordpress service");
            }, s);
        }
    };
    var u = function(e, o, r, n) {
        if (e.faultCode) {
            var l = e.faultString.concat();
            t.log("error for post '" + o.title + "' in blog '" + i.url + "': " + l, "wordpress service");
            n(l);
        } else {
            r();
        }
    };
    return {
        login: i,
        resetCredentials: function() {
            localStorage["url"] = "";
            localStorage["username"] = "";
            localStorage["password"] = "";
            i.url = "";
            i.username = "";
            i.password = "";
            t.log("reset credentials", "wordpress service");
        },
        getPost: function(e) {
            if (!l) a();
        },
        savePost: function(e, t, o) {
            if (!l) {
                a(function() {
                    c(e, t, o);
                }, o);
            } else {
                c(e, t, o);
            }
        }
    };
} ]);