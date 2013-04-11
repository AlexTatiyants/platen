/*! platen 2013-04-11 */
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
        redirectTo: "/"
    });
} ]);

var EditorController = function(e, t, r, n) {
    var o = 6e3;
    e.post = {};
    e.status = {};
    e.post.title = "UNTITLED";
    e.writeFile = function() {
        if (!e.post.id) {
            e.post.id = new Date().getTime();
        }
        console.log(e.post);
        n.writeFile(e.post.id, JSON.stringify(e.post), function(t) {
            e.status.autoSaveTime = r("date")(new Date(), "shortTime");
        });
    };
    $("#post-title").focus();
};

EditorController.$inject = [ "$scope", "$timeout", "$filter", "fileManager" ];

var LoginController = function(e) {
    e.login = {};
};

LoginController.$inject = [ "$scope" ];

var PostsController = function(e, t, r) {
    e.posts = [];
    e.loaded = false;
    if (!e.loaded) {
        console.log("loading posts");
        r.readFiles(function(t) {
            var r = JSON.parse(this.result);
            e.posts.push(r);
            e.loaded = true;
            e.$apply();
        });
    }
};

PostsController.$inject = [ "$scope", "$q", "fileManager" ];

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
                e.$apply(o);
            });
            o();
            function o() {
                n.$setViewValue(t.html());
            }
        }
    };
});

var fileManagerFactory = function(e, t) {
    var r = "posts";
    var n = null;
    var o = function(e) {
        console.log(e);
    };
    var i = function() {
        var r = e.defer();
        console.log("deferred before resolve", r);
        t.$apply(function() {
            window.webkitRequestFileSystem(PERSISTENT, 1024 * 1024, function(e) {
                n = e;
                console.log("got fs, resolving deferred", r);
                r.resolve();
            });
        });
        return r.promise;
    };
    var l = function(e) {
        console.log("in foo with fs ", n);
        n.root.getDirectory(r, {}, function(t) {
            var r = t.createReader();
            r.readEntries(function(t) {
                for (var r = 0; r < t.length; r++) {
                    var i = t[r];
                    if (i.isFile) {
                        n.root.getFile(i.fullPath, {}, function(t) {
                            t.file(function(t) {
                                var r = new FileReader();
                                r.onloadend = e;
                                r.readAsText(t);
                            }, o);
                        }, o);
                    }
                }
            }, o);
        }, o);
    };
    return {
        readFiles: function(e) {
            if (!n) {
                var t = i();
                t.then(l(e));
            } else {
                l(e);
            }
        },
        writeFile: function(e, t, i) {
            if (!n) {
                return;
            }
            n.root.getDirectory(r, {
                create: true
            }, function(r) {
                r.getFile(e, {
                    create: true,
                    exclusive: false
                }, function(e) {
                    e.createWriter(function(e) {
                        var r = new Blob([ t ], {
                            type: "text/javascript"
                        });
                        e.onerror = o;
                        e.onwriteend = i;
                        e.write(r);
                    }, o);
                }, o);
            }, o);
        }
    };
};

fileManagerFactory.$inject = [ "$q", "$scope" ];

angular.module("platen.services").factory("fileManager", fileManagerFactory);