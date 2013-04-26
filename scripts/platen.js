/*! platen 2013-04-26 */
"use strict";

angular.module("platen.directives", []);

angular.module("platen.services", []);

var platen = angular.module("platen", [ "platen.directives", "platen.services", "ui.bootstrap", "ui" ]).config([ "$routeProvider", function(e) {
    e.when("/posts", {
        templateUrl: "views/posts.html"
    });
    e.when("/posts/:postId", {
        templateUrl: "views/edit.html"
    });
    e.when("/logs", {
        templateUrl: "views/logs.html"
    });
    e.when("/login", {
        templateUrl: "views/login.html"
    });
    e.otherwise({
        redirectTo: "/posts"
    });
} ]);

var EditorController = function(e, t, o, r, n, i, a, l, s) {
    var c = 12e3;
    var u = "draft";
    var d = "publish";
    var f = "post-title";
    var p = "post-content";
    var g = "post-excerpt";
    var v = "post-tags";
    var m = "post-categories";
    e.status = {};
    e.previewOn = false;
    e.status.autoSaveTime = "unsaved";
    e.showMetadata = false;
    e.post = {};
    var w = function(e) {
        return "/" + s.POST_DIRECTORY_PATH + "/" + e;
    };
    var h = function() {
        e.post.id = new Date().getTime();
        e.post.path = w(e.post.id);
        e.post.status = u;
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
    var T = function(t) {
        n.readFile(w(t), function(t) {
            e.post = JSON.parse(t);
            e.$apply();
            i.log("loaded post '" + e.post.title + "'", "EditorController");
        });
    };
    var E = function() {
        if (t.postId === "0") {
            h();
        } else {
            T(t.postId);
        }
    };
    E();
    $("#post-title").focus();
    var D = function() {
        if (e.post.title.trim() === "" && e.post.contentMarkdown.trim() === "") return;
        var t = JSON.parse(JSON.stringify(e.post));
        t.content = "";
        t.contentHtmlPreview = "";
        t.lastUpdatedDate = new Date();
        n.writeTextFile(e.post.path, e.post.id, JSON.stringify(t), function(t) {
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
        if (e.showMetadata) {
            $("#post-excerpt").focus();
        }
    };
    e.updateExcerpt = function() {
        e.post.excerpt = e.post.contentMarkdown.match(/^(.*)$/m);
        D();
    };
    e.read = function() {
        T(e.post.id);
    };
    e.sync = function() {
        e.post.content = marked(e.post.contentMarkdown).replace(/</g, "&lt;").replace(/>/g, "&gt;");
        a.savePost(e.post, function(t) {
            e.post.wordPressId = t;
            D();
        }, function(e) {
            alert("OOPS " + e);
        });
    };
    e.getTags = function() {
        a.getTags(function(t) {
            e.tags = t;
        }, function(e) {
            alert("OOPS " + e);
        });
    };
    e.addTag = function(t) {
        if (e.post.tags.indexOf(t.name) === -1) {
            if (e.post.tags.trim() === "") {
                e.post.tags += t.name;
            } else {
                e.post.tags += ", " + t.name;
            }
        }
    };
    e.getCategories = function() {
        a.getCategories(function(t) {
            e.categories = t;
        }, function(e) {
            alert("OOPS " + e);
        });
    };
    e.addCategory = function(t) {
        if (e.post.categories.indexOf(t.name) === -1) {
            if (e.post.categories.trim() === "") {
                e.post.categories += t.name;
            } else {
                e.post.categories += ", " + t.name;
            }
        }
    };
    e.$on("elementEdited", function(e, t) {
        if (t === f || t === p || t === g || t === v || t || m) {
            D();
        }
    });
};

EditorController.$inject = [ "$scope", "$routeParams", "$timeout", "$filter", "fileManager", "logger", "wordpress", "imageManager", "resources" ];

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

var MainController = function(e, t, o, r, n) {
    o.initialize();
    o.createDirectory(r.POST_DIRECTORY_PATH, function() {
        n.log("created directory for " + r.POST_DIRECTORY_PATH, "MainController");
    });
    o.createDirectory(r.IMAGE_DIRECTORY_PATH, function() {
        n.log("created directory for " + r.IMAGE_DIRECTORY_PATH, "MainController");
    });
    var i;
    e.loginCredentials = function() {
        i = t.dialog({
            backdrop: true,
            keyboard: true,
            backdropClick: true,
            controller: "LoginController",
            templateUrl: "views/login.html"
        });
        i.open();
    };
};

MainController.$inject = [ "$scope", "$dialog", "fileManager", "resources", "logger" ];

var PostsController = function(e, t, o, r, n, i) {
    e.posts = {};
    e.confirm = {};
    e.loaded = false;
    e.postToDelete = {};
    if (!e.loaded) {
        r.readFilesInDirectory(i.POST_DIRECTORY_PATH, function(t) {
            var o = JSON.parse(this.result);
            e.posts[o.id] = o;
            e.loaded = true;
            e.$apply();
            n.log("read post '" + o.title + "'", "PostsController");
        });
    }
    e.readImages = function() {
        r.readFile("images", function(e) {
            console.log("read image", e);
        });
    };
    e.cancelDelete = function() {
        e.shouldBeOpen = false;
        e.postToDelete = {};
    };
    e.proceedWithDelete = function() {
        debugger;
        e.shouldBeOpen = false;
        r.removeFile(e.postToDelete.path, function() {
            delete e.posts[e.postToDelete.id];
            n.log("deleted post '" + e.postToDelete.title + "'", "PostsController");
            e.postToDelete = {};
            e.$apply();
        });
    };
    e.deletePost = function(t) {
        e.postToDelete = t;
        e.shouldBeOpen = true;
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
    var t;
    var o = function(e, t) {
        var o = "";
        switch (e.code) {
          case FileError.QUOTA_EXCEEDED_ERR:
            o = "Quota Exceeded";
            break;

          case FileError.NOT_FOUND_ERR:
            o = "Not Found";
            break;

          case FileError.SECURITY_ERR:
            o = "Security";
            break;

          case FileError.INVALID_MODIFICATION_ERR:
            o = "Invalid Modification";
            break;

          case FileError.INVALID_STATE_ERR:
            o = "Invalid State";
            break;

          case FileError.TYPE_MISMATCH_ERR:
            o = "Type Mismatch";
            break;

          default:
            o = "Unknown Error";
            break;
        }
        console.log("Error " + e.code + ": " + o, t);
    };
    var r = function(e, r, n) {
        if (t) {
            t.root.getFile(e, {
                create: r
            }, n, function(t) {
                o(t, "in handleFile(), while getting file path " + e);
            });
        }
    };
    var n = function(e, t, n, i) {
        r(e, true, function(r) {
            r.createWriter(function(e) {
                e.onerror = o;
                e.onwriteend = function() {
                    e.onwriteend = null;
                    e.write(n);
                    i(r);
                };
                e.truncate(n.size);
            }, function(r) {
                o(r, "in writeFile(), while creating fileWriter for " + e + "/" + t);
            });
        });
    };
    return {
        initialize: function() {
            window.webkitRequestFileSystem(PERSISTENT, 1024 * 1024, function(e) {
                t = e;
            });
        },
        createDirectory: function(r, n) {
            if (t) {
                t.root.getDirectory(r, {
                    create: true
                }, function(e) {
                    n();
                }, o(e, "in createDirectory, while creating directory " + r));
            }
        },
        readFilesInDirectory: function(e, n) {
            if (t) {
                t.root.getDirectory(e, {
                    create: true
                }, function(t) {
                    var i = t.createReader();
                    i.readEntries(function(e) {
                        _.each(e, function(e) {
                            if (e.isFile) {
                                console.log(e);
                                r(e.fullPath, false, function(t) {
                                    t.file(function(e) {
                                        var t = new FileReader();
                                        t.onloadend = n;
                                        t.readAsText(e);
                                    }, function(t) {
                                        o(t, "in readFilesInDirectory, while getting file " + e.fullPath);
                                    });
                                });
                            }
                        });
                    }, function(t) {
                        o(t, "in readFilesInDirectory, while reading entries from " + e);
                    });
                }, function(t) {
                    o(t, "in readFilesInDirectory, while getting directory " + e);
                });
            }
        },
        readDirectoryContents: function(e, r) {
            if (t) {
                t.root.getDirectory(e, {
                    create: true
                }, function(t) {
                    var r = t.createReader();
                    r.readEntries(function(e) {
                        _.each(e, function(e) {
                            console.log(e);
                        });
                    }, function(t) {
                        o(t, "in readFilesInDirectory, while reading entries from " + e);
                    });
                }, function(t) {
                    o(t, "in readFilesInDirectory, while getting directory " + e);
                });
            }
        },
        clearDirectory: function(e) {
            if (t) {
                t.root.getDirectory(e, {}, function(t) {
                    var n = t.createReader();
                    n.readEntries(function(e) {
                        _.each(e, function(e) {
                            if (e.isFile) {
                                r(e.fullPath, false, function(t) {
                                    t.remove(function() {
                                        console.log("removed file " + e.fullPath);
                                    }, function(t) {
                                        o(t, "while removing file " + e.fullPath);
                                    });
                                });
                            }
                        });
                    }, function(t) {
                        o(t, "in clearDirectory, while reading entries for " + e);
                    });
                }, function(t) {
                    o(t, "in clearDirectory(), while getting directory " + e);
                });
            }
        },
        writeTextFile: function(e, t, o, r) {
            var i = new Blob([ o ], {
                type: "text/plain"
            });
            n(e, t, i, r);
        },
        writeBlob: function(e, t, o, r) {
            n(e, t, o, r);
        },
        readFile: function(e, t) {
            r(e, false, function(r) {
                r.file(function(e) {
                    var o = new FileReader();
                    o.onload = function(e) {
                        t(e.target.result);
                    };
                    o.readAsText(e);
                }, function(t) {
                    o(t, "in readingFile(), while reading file " + e);
                });
            });
        },
        removeFile: function(e, t) {
            r(e, false, function(r) {
                r.remove(t, function(t) {
                    o(t, "in removeFile(), while reading file " + e);
                });
            });
        }
    };
});

angular.module("platen.services").factory("imageManager", [ "$window", "fileManager", "logger", "resources", function(e, t, o, r) {
    e.addEventListener("paste", function(e) {
        var o = e.clipboardData.items[0];
        if (o.type !== "image/png") return;
        var n = new Date().getTime() + ".png";
        t.writeBlob(r.IMAGE_DIRECTORY_PATH, n, o.getAsFile(), function() {
            console.log("saved image " + n);
            document.execCommand("insertHtml", false, "![Alt text](/images/" + n + ")");
        });
    });
} ]);

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
            return o.reverse();
        }
    };
});

angular.module("platen.services").value("resources", {
    POST_DIRECTORY_PATH: "posts",
    IMAGE_DIRECTORY_PATH: "images"
});

angular.module("platen.services").factory("wordpress", [ "$dialog", "logger", function(e, t) {
    var o = "post";
    var r = "post_tag";
    var n = "category";
    var i = 1;
    var a = 1;
    var l = {
        url: localStorage["url"] || "",
        username: localStorage["username"] || "",
        password: localStorage["password"] || "",
        shouldStoreCredentials: false
    };
    var s = null;
    var c = function(t, o) {
        if (l.url.trim() === "" || l.username.trim() === "" || l.password.trim() === "") {
            var r = e.dialog({
                backdrop: true,
                keyboard: true,
                backdropClick: true,
                controller: "LoginController",
                templateUrl: "views/pages/login.html"
            });
            r.open().then(function() {
                u(t, o);
            });
        } else {
            u(t, o);
        }
    };
    var u = function(e, o) {
        var r = l.url.replace(/\/$/, "") + "/xmlrpc.php";
        try {
            s = new WordPress(r, l.username, l.password);
            t.log("logged into blog '" + l.url + "'", "wordpress service");
            if (l.shouldStoreCredentials) {
                localStorage["url"] = l.url;
                localStorage["username"] = l.username;
                localStorage["password"] = l.password;
                t.log("saved login credentials for blog + '" + l.url + "'", "wordpress service");
            }
            e();
        } catch (n) {
            t.log("unable to log into blog '" + l.url + "': " + n.message, "wordpress service");
            o(n.message);
        }
    };
    var d = function(e, r, n) {
        var c;
        var u = {};
        var d = {
            post_type: o,
            post_status: e.status,
            post_title: e.title,
            post_author: a,
            post_excerpt: e.excerpt,
            post_content: e.content,
            post_format: "",
            terms_names: ""
        };
        if (e.tags.trim() !== "") {
            u.post_tag = e.tags.replace(" ", "").split(",");
        }
        if (e.categories.trim() !== "") {
            u.category = e.categories.replace(" ", "").split(",");
        }
        d.terms_names = u;
        if (e.wordPressId) {
            c = s.editPost(i, e.wordPressId, d);
            p(c, e, function() {
                t.log("updated post '" + e.title + "' in blog '" + l.url + "'", "wordpress service");
            }, n);
        } else {
            c = s.newPost(i, d);
            p(c, e, function() {
                r(c.concat());
                t.log("created post '" + e.title + "' in blog '" + l.url + "'", "wordpress service");
            }, n);
        }
    };
    var f = function(e, o, r) {
        var n = s.getTerms(i, e, "");
        if (n.faultCode) {
            var a = n.faultString.concat();
            t.log("error for loading tags for blog '" + l.url + "': " + a, "wordpress service");
            r(a);
        } else {
            var c = [], u;
            _.each(n, function(e) {
                u = {};
                u.count = e.count;
                u.name = e.name.concat();
                u.slug = e.slug.concat();
                u.taxonomy = e.taxonomy.concat();
                u.term_id = e.term_id.concat();
                c.push(u);
            });
            o(c);
        }
    };
    var p = function(e, o, r, n) {
        if (e.faultCode) {
            var i = e.faultString.concat();
            t.log("error for post '" + o.title + "' in blog '" + l.url + "': " + i, "wordpress service");
            n(i);
        } else {
            r();
        }
    };
    var g = function(e, t, o, r) {
        if (!s) {
            c(function() {
                e(t, o, r);
            }, r);
        } else {
            e(t, o, r);
        }
    };
    return {
        login: l,
        resetCredentials: function() {
            localStorage["url"] = "";
            localStorage["username"] = "";
            localStorage["password"] = "";
            l.url = "";
            l.username = "";
            l.password = "";
            t.log("reset credentials", "wordpress service");
        },
        getPost: function(e) {
            if (!s) c();
        },
        savePost: function(e, t, o) {
            g(d, e, t, o);
        },
        getTags: function(e, t) {
            g(f, r, e, t);
        },
        getCategories: function(e, t) {
            g(f, n, e, t);
        }
    };
} ]);