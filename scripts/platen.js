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
        redirectTo: "/posts"
    });
} ]);

var EditorController = function(e, t, r, i) {
    var n = 6e3;
    e.post = {};
    e.status = {};
    e.post.title = "UNTITLED";
    e.writeFile = function() {
        if (!e.post.id) {
            e.post.id = new Date().getTime();
        }
        console.log(e.post);
        i.writeFile(e.post.id, JSON.stringify(e.post), function(t) {
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

var MainController = function(e, t) {
    t.initialize();
};

MainController.$inject = [ "$scope", "fileManager" ];

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
        link: function(e, t, r, i) {
            if (!i) return;
            i.$render = function() {
                t.html(i.$viewValue || "");
            };
            t.bind("blur keyup change", function() {
                e.$apply(n);
            });
            n();
            function n() {
                i.$setViewValue(t.html());
            }
        }
    };
});

var fileManagerFactory = function(e) {
    var t = "posts";
    var r = null;
    var i = function(e) {
        console.log(e);
    };
    var n = function() {
        var t = e.defer();
        console.log("deferred before resolve", t);
        window.webkitRequestFileSystem(PERSISTENT, 1024 * 1024, function(e) {
            r = e;
            console.log("got fs, resolving deferred", t);
            t.resolve();
        });
        return t.promise;
    };
    var o = function(e) {
        console.log("in foo with fs ", r);
        r.root.getDirectory(t, {}, function(t) {
            var n = t.createReader();
            n.readEntries(function(t) {
                for (var n = 0; n < t.length; n++) {
                    var o = t[n];
                    if (o.isFile) {
                        r.root.getFile(o.fullPath, {}, function(t) {
                            t.file(function(t) {
                                var r = new FileReader();
                                r.onloadend = e;
                                r.readAsText(t);
                            }, i);
                        }, i);
                    }
                }
            }, i);
        }, i);
    };
    return {
        initialize: function() {
            console.log("init fileManager");
            n();
        },
        readFiles: function(e) {
            if (!r) {
                var t = n();
                t.then(o(e));
            } else {
                o(e);
            }
        },
        writeFile: function(e, n, o) {
            if (!r) {
                return;
            }
            r.root.getDirectory(t, {
                create: true
            }, function(t) {
                t.getFile(e, {
                    create: true,
                    exclusive: false
                }, function(e) {
                    e.createWriter(function(e) {
                        var t = new Blob([ n ], {
                            type: "text/javascript"
                        });
                        e.onerror = i;
                        e.onwriteend = o;
                        e.write(t);
                    }, i);
                }, i);
            }, i);
        }
    };
};

fileManagerFactory.$inject = [ "$q" ];

angular.module("platen.services").factory("fileManager", fileManagerFactory);