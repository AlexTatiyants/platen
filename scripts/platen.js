/*! platen 2013-04-27 */
"use strict";

angular.module("platen.directives", []);

angular.module("platen.services", []);

var platen = angular.module("platen", [ "platen.directives", "platen.services", "ui.bootstrap", "ui" ]).config([ "$routeProvider", function($routeProvider) {
    $routeProvider.when("/posts", {
        templateUrl: "views/posts.html"
    });
    $routeProvider.when("/posts/:postId", {
        templateUrl: "views/edit.html"
    });
    $routeProvider.when("/logs", {
        templateUrl: "views/logs.html"
    });
    $routeProvider.when("/login", {
        templateUrl: "views/login.html"
    });
    $routeProvider.otherwise({
        redirectTo: "/posts"
    });
} ]);

var EditorController = function($scope, $routeParams, $timeout, $filter, fileManager, logger, wordpress, imageManager, resources) {
    var AUTOSAVE_INTERVAL = 12e3;
    var STATUS_DRAFT = "draft";
    var STATUS_PUBLISH = "publish";
    var POST_TITLE_ID = "post-title";
    var POST_CONTENT_ID = "post-content";
    var POST_EXCERPT = "post-excerpt";
    var POST_TAGS = "post-tags";
    var POST_CATEGORIES = "post-categories";
    $scope.status = {};
    $scope.previewOn = false;
    $scope.status.autoSaveTime = "unsaved";
    $scope.showMetadata = false;
    $scope.post = {};
    var getFilePath = function(postId) {
        return "/" + resources.POST_DIRECTORY_PATH + "/" + postId;
    };
    var createPost = function() {
        $scope.post.id = new Date().getTime();
        $scope.post.path = getFilePath($scope.post.id);
        $scope.post.status = STATUS_DRAFT;
        $scope.post.title = "";
        $scope.post.content = "";
        $scope.post.contentMarkdown = "";
        $scope.post.contentMarkdownHtml = "";
        $scope.post.contentHtmlPreview = "";
        $scope.post.excerpt = "";
        $scope.post.createdDate = new Date();
        $scope.post.lastUpdatedDate = "";
        $scope.post.tags = "";
        $scope.post.categories = "";
    };
    var loadPost = function(postId) {
        fileManager.readFile(getFilePath(postId), true, function(postJson) {
            $scope.post = JSON.parse(postJson);
            $scope.$apply();
            logger.log("loaded post '" + $scope.post.title + "'", "EditorController");
        });
    };
    var initializePost = function() {
        if ($routeParams.postId === "0") {
            createPost();
        } else {
            loadPost($routeParams.postId);
        }
    };
    var uploadImages = function() {};
    initializePost();
    $("#post-title").focus();
    var savePost = function() {
        if ($scope.post.title.trim() === "" && $scope.post.contentMarkdown.trim() === "") return;
        var postToSave = JSON.parse(JSON.stringify($scope.post));
        postToSave.content = "";
        postToSave.contentHtmlPreview = "";
        postToSave.lastUpdatedDate = new Date();
        fileManager.writeFile(getFilePath($scope.post.id), JSON.stringify(postToSave), function(fileEntry) {
            $scope.status.autoSaveTime = $filter("date")(new Date(), "shortTime");
            logger.log("saved post '" + $scope.post.title + "' on " + $scope.status.autoSaveTime, "EditorController");
        });
    };
    $scope.togglePreview = function() {
        if (!$scope.previewOn) {
            $scope.post.contentHtmlPreview = marked($scope.post.contentMarkdown);
        }
        $scope.previewOn = !$scope.previewOn;
    };
    $scope.toggleMetadataPanel = function() {
        $scope.showMetadata = !$scope.showMetadata;
        if ($scope.showMetadata && $scope.post.excerpt === "") {
            $scope.updateExcerpt();
        }
        if ($scope.showMetadata) {
            $("#post-excerpt").focus();
        }
    };
    $scope.updateExcerpt = function() {
        $scope.post.excerpt = $scope.post.contentMarkdown.match(/^(.*)$/m);
        savePost();
    };
    $scope.read = function() {
        loadPost($scope.post.id);
    };
    $scope.sync = function() {
        $scope.post.content = marked($scope.post.contentMarkdown).replace(/</g, "&lt;").replace(/>/g, "&gt;");
        uploadImages();
        wordpress.savePost($scope.post, function(result) {
            $scope.post.wordPressId = result;
            savePost();
        }, function(errorMessage) {
            alert("OOPS " + errorMessage);
        });
    };
    $scope.getTags = function() {
        wordpress.getTags(function(result) {
            $scope.tags = result;
        }, function(errorMessage) {
            alert("OOPS " + errorMessage);
        });
    };
    $scope.addTag = function(tag) {
        if ($scope.post.tags.indexOf(tag.name) === -1) {
            if ($scope.post.tags.trim() === "") {
                $scope.post.tags += tag.name;
            } else {
                $scope.post.tags += ", " + tag.name;
            }
        }
    };
    $scope.getCategories = function() {
        wordpress.getCategories(function(result) {
            $scope.categories = result;
        }, function(errorMessage) {
            alert("OOPS " + errorMessage);
        });
    };
    $scope.addCategory = function(category) {
        if ($scope.post.categories.indexOf(category.name) === -1) {
            if ($scope.post.categories.trim() === "") {
                $scope.post.categories += category.name;
            } else {
                $scope.post.categories += ", " + category.name;
            }
        }
    };
    $scope.$on("elementEdited", function(event, elementId) {
        if (elementId === POST_TITLE_ID || elementId === POST_CONTENT_ID || elementId === POST_EXCERPT || elementId === POST_TAGS || elementId || POST_CATEGORIES) {
            savePost();
        }
    });
};

EditorController.$inject = [ "$scope", "$routeParams", "$timeout", "$filter", "fileManager", "logger", "wordpress", "imageManager", "resources" ];

var LoginController = function($scope, dialog, wordpress) {
    $scope.login = wordpress.login;
    $scope.submit = function() {
        dialog.close("ok");
    };
    $scope.resetCredentials = function() {
        wordpress.resetCredentials();
        dialog.close();
    };
    $scope.cancel = function() {
        dialog.close();
    };
};

LoginController.$inject = [ "$scope", "dialog", "wordpress" ];

var LogsController = function($scope, logger) {
    $scope.logs = logger.getLogs();
};

LogsController.$inject = [ "$scope", "logger" ];

var MainController = function($scope, $dialog, fileManager, resources) {
    fileManager.initialize();
    var d;
    $scope.loginCredentials = function() {
        d = $dialog.dialog({
            backdrop: true,
            keyboard: true,
            backdropClick: true,
            controller: "LoginController",
            templateUrl: "views/login.html"
        });
        d.open();
    };
};

MainController.$inject = [ "$scope", "$dialog", "fileManager", "resources" ];

var PostsController = function($scope, $q, $location, fileManager, logger, resources) {
    $scope.posts = {};
    $scope.confirm = {};
    $scope.loaded = false;
    $scope.postToDelete = {};
    if (!$scope.loaded) {
        fileManager.readFilesInDirectory(resources.POST_DIRECTORY_PATH, function(e) {
            var post = JSON.parse(this.result);
            $scope.posts[post.id] = post;
            $scope.loaded = true;
            $scope.$apply();
            logger.log("read post '" + post.title + "'", "PostsController");
        });
    }
    $scope.readImages = function() {
        fileManager.readBlob("images", function(e) {
            console.log("read image", e);
        });
    };
    $scope.readDirectory = function() {
        fileManager.readRootDirectory();
    };
    $scope.deletePost = function(post) {
        $scope.postToDelete = post;
        $scope.shouldBeOpen = true;
    };
    $scope.cancelDelete = function() {
        $scope.shouldBeOpen = false;
        $scope.postToDelete = {};
    };
    $scope.proceedWithDelete = function() {
        $scope.shouldBeOpen = false;
        fileManager.removeFile($scope.postToDelete.path, function() {
            delete $scope.posts[$scope.postToDelete.id];
            logger.log("deleted post '" + $scope.postToDelete.title + "'", "PostsController");
            $scope.postToDelete = {};
            $scope.$apply();
        });
    };
    $scope.editPost = function(post) {
        $location.path("posts/" + post.id);
    };
    $scope.deleteAll = function() {
        fileManager.clearDirectory(resources.POST_DIRECTORY_PATH, function() {
            logger.log("deleted all posts", "PostsController");
            $scope.posts = {};
        });
    };
};

PostsController.$inject = [ "$scope", "$q", "$location", "fileManager", "logger", "resources" ];

angular.module("platen.directives").directive("editableMarkdown", function() {
    return {
        restrict: "A",
        require: "?ngModel",
        link: function(scope, element, attrs, ngModel) {
            if (!ngModel) return;
            ngModel.$render = function() {
                element.html(ngModel.$viewValue || "");
            };
            element.bind("blur keyup change", function() {
                scope.$apply(read);
            });
            var read = function() {
                scope.post.contentMarkdown = element.context.innerText;
                ngModel.$setViewValue(element.html());
            };
            element.bind("blur paste", function() {
                scope.$emit("elementEdited", element[0].id);
            });
            read();
        }
    };
});

angular.module("platen.directives").directive("editableText", function() {
    return {
        restrict: "A",
        require: "?ngModel",
        link: function(scope, element, attrs, ngModel) {
            if (!ngModel) return;
            ngModel.$render = function() {
                element.html(ngModel.$viewValue || "");
            };
            element.bind("blur keyup change", function() {
                scope.$apply(read);
            });
            var read = function() {
                ngModel.$setViewValue(element.context.innerText);
            };
            element.bind("blur paste", function() {
                scope.$emit("elementEdited", element[0].id);
            });
            read();
        }
    };
});

angular.module("platen.services").factory("fileManager", function() {
    var fs;
    var SIZE = 10 * 1024 * 1024;
    var doCreate = {
        create: true
    };
    var dontCreate = {
        create: false
    };
    var DEFAULT_FILE_TYPE = {
        type: "text/plain"
    };
    var onError = function(e, step) {
        console.log("Error " + e.code + ": " + e.name, step);
    };
    FileError.prototype.__defineGetter__("name", function() {
        var keys = Object.keys(FileError);
        for (var i = 0, key; key = keys[i]; ++i) {
            if (FileError[key] == this.code) {
                return key;
            }
        }
        return "Unknown Error";
    });
    var getFileEntryAndDoAction = function(filePath, createParam, action) {
        if (fs) {
            fs.root.getFile(filePath, createParam, action, function(e) {
                onError(e, "in getFileEntryAndDoAction(), while getting file entry for " + filePath);
            });
        }
    };
    return {
        initialize: function() {
            window.webkitRequestFileSystem(PERSISTENT, SIZE, function(fileSystem) {
                fs = fileSystem;
            }, onError);
        },
        readFilesInDirectory: function(directoryPath, onSuccessCallback) {
            if (fs) {
                fs.root.getDirectory(directoryPath, doCreate, function(dirEntry) {
                    var dirReader = dirEntry.createReader();
                    dirReader.readEntries(function(entries) {
                        _.each(entries, function(entry) {
                            if (entry.isFile) {
                                getFileEntryAndDoAction(entry.fullPath, dontCreate, function(fileEntry) {
                                    fileEntry.file(function(file) {
                                        var reader = new FileReader();
                                        reader.onloadend = onSuccessCallback;
                                        reader.readAsText(file);
                                    }, function(e) {
                                        onError(e, "in readFilesInDirectory, while getting file " + entry.fullPath);
                                    });
                                });
                            }
                        });
                    }, function(e) {
                        onError(e, "in readFilesInDirectory, while reading entries from " + directoryPath);
                    });
                }, function(e) {
                    onError(e, "in readFilesInDirectory, while getting directory " + directoryPath);
                });
            }
        },
        readRootDirectory: function() {
            var dirReader = fs.root.createReader();
            dirReader.readEntries(function(entries) {
                var imgReader = entries[2].createReader();
                imgReader.readEntries(function(images) {
                    console.log(images);
                    _.each(images, function(image) {
                        console.log(image.toURL());
                    });
                });
            });
        },
        clearDirectory: function(directoryPath) {
            if (fs) {
                fs.root.getDirectory(directoryPath, {}, function(dirEntry) {
                    var dirReader = dirEntry.createReader();
                    dirReader.readEntries(function(entries) {
                        _.each(entries, function(entry) {
                            if (entry.isFile) {
                                getFileEntryAndDoAction(entry.fullPath, false, function(fileEntry) {
                                    fileEntry.remove(function() {
                                        console.log("removed file " + entry.fullPath);
                                    }, function(e) {
                                        onError(e, "while removing file " + entry.fullPath);
                                    });
                                });
                            }
                        });
                    }, function(e) {
                        onError(e, "in clearDirectory, while reading entries for " + directoryPath);
                    });
                }, function(e) {
                    onError(e, "in clearDirectory(), while getting directory " + directoryPath);
                });
            }
        },
        writeFile: function(filePath, fileBody, onSuccessCallback) {
            var blob;
            if (fileBody instanceof Blob) {
                blob = fileBody;
            } else {
                blob = new Blob([ fileBody ], DEFAULT_FILE_TYPE);
            }
            getFileEntryAndDoAction(filePath, doCreate, function(fileEntry) {
                fileEntry.createWriter(function(fileWriter) {
                    fileWriter.onerror = onError;
                    fileWriter.onwriteend = function() {
                        fileWriter.onwriteend = null;
                        fileWriter.write(blob);
                        onSuccessCallback(fileEntry);
                    };
                    fileWriter.truncate(blob.size);
                }, function(e) {
                    onError(e, "in writeFile(), while creating fileWriter for " + filePath + "/" + fileName);
                });
            });
        },
        readFile: function(filePath, asText, getResultCallback) {
            getFileEntryAndDoAction(filePath, dontCreate, function(fileEntry) {
                fileEntry.file(function(file) {
                    var reader = new FileReader();
                    reader.onload = function(e) {
                        getResultCallback(e.target.result);
                    };
                    if (asText) {
                        reader.readAsText(file);
                    } else {
                        reader.readAsBinaryString(file);
                    }
                }, function(e) {
                    onError(e, "in readingFile(), while reading file " + filePath);
                });
            });
        },
        removeFile: function(filePath, onSuccess) {
            getFileEntryAndDoAction(filePath, dontCreate, function(fileEntry) {
                fileEntry.remove(onSuccess, function(e) {
                    onError(e, "in removeFile(), while reading file " + filePath);
                });
            });
        }
    };
});

angular.module("platen.services").factory("imageManager", [ "$window", "fileManager", "logger", "resources", function($window, fileManager, logger, resources) {
    $window.addEventListener("paste", function(event) {
        var item = event.clipboardData.items[0];
        if (item.type !== "image/png") return;
        var fileName = new Date().getTime() + ".png";
        var filePath = resources.IMAGE_DIRECTORY_PATH + "/" + fileName;
        fileManager.writeFile(filePath, item.getAsFile(), function(fileEntry) {
            logger.log("saved image " + fileName, "imageManager service");
            document.execCommand("insertHtml", false, "![Alt text](" + fileEntry.toURL() + ")");
        });
    });
} ]);

angular.module("platen.services").factory("logger", function() {
    var MAX_QUEUE_SIZE = 100;
    var offset = 0;
    var log = [];
    return {
        log: function(message, location) {
            if (log.length > MAX_QUEUE_SIZE) {
                console.log("removing log item");
                var item = log[offset];
                if (++offset * 2 >= log.length) {
                    log = log.slice(offset);
                    offset = 0;
                }
            }
            log.push({
                message: message,
                location: location,
                date: new Date()
            });
        },
        getLogs: function() {
            return log.reverse();
        }
    };
});

angular.module("platen.services").value("resources", {
    POST_DIRECTORY_PATH: "posts",
    IMAGE_DIRECTORY_PATH: "images"
});

angular.module("platen.services").factory("wordpress", [ "$dialog", "logger", function($dialog, logger) {
    var POST_TYPE = "post";
    var TAG_TYPE = "post_tag";
    var CATEGORY_TYPE = "category";
    var DEFAULT_BLOG_ID = 1;
    var DEFAULT_AUTHOR_ID = 1;
    var l = {
        url: localStorage["url"] || "",
        username: localStorage["username"] || "",
        password: localStorage["password"] || "",
        shouldStoreCredentials: false
    };
    var wp = null;
    var initialize = function(onSuccessCallback, onErrorCallback) {
        if (l.url.trim() === "" || l.username.trim() === "" || l.password.trim() === "") {
            var d = $dialog.dialog({
                backdrop: true,
                keyboard: true,
                backdropClick: true,
                controller: "LoginController",
                templateUrl: "views/login.html"
            });
            d.open().then(function() {
                createConnection(onSuccessCallback, onErrorCallback);
            });
        } else {
            createConnection(onSuccessCallback, onErrorCallback);
        }
    };
    var createConnection = function(onSuccessCallback, onErrorCallback) {
        var fullUrl = l.url.replace(/\/$/, "") + "/xmlrpc.php";
        try {
            wp = new WordPress(fullUrl, l.username, l.password);
            logger.log("logged into blog '" + l.url + "'", "wordpress service");
            if (l.shouldStoreCredentials) {
                localStorage["url"] = l.url;
                localStorage["username"] = l.username;
                localStorage["password"] = l.password;
                logger.log("saved login credentials for blog + '" + l.url + "'", "wordpress service");
            }
            onSuccessCallback();
        } catch (e) {
            logger.log("unable to log into blog '" + l.url + "': " + e.message, "wordpress service");
            onErrorCallback(e.message);
        }
    };
    var save = function(post, onSuccessCallback, onErrorCallback) {
        var result;
        var terms = {};
        var data = {
            post_type: POST_TYPE,
            post_status: post.status,
            post_title: post.title,
            post_author: DEFAULT_AUTHOR_ID,
            post_excerpt: post.excerpt,
            post_content: post.content,
            post_format: "",
            terms_names: ""
        };
        if (post.tags.trim() !== "") {
            terms.post_tag = post.tags.replace(" ", "").split(",");
        }
        if (post.categories.trim() !== "") {
            terms.category = post.categories.replace(" ", "").split(",");
        }
        data.terms_names = terms;
        if (post.wordPressId) {
            result = wp.editPost(DEFAULT_BLOG_ID, post.wordPressId, data);
            processResponse(result, post, function() {
                logger.log("updated post '" + post.title + "' in blog '" + l.url + "'", "wordpress service");
            }, onErrorCallback);
        } else {
            result = wp.newPost(DEFAULT_BLOG_ID, data);
            processResponse(result, post, function() {
                onSuccessCallback(result.concat());
                logger.log("created post '" + post.title + "' in blog '" + l.url + "'", "wordpress service");
            }, onErrorCallback);
        }
    };
    var getTerms = function(termType, onSuccessCallback, onErrorCallback) {
        var result = wp.getTerms(DEFAULT_BLOG_ID, termType, "");
        if (result.faultCode) {
            var err = result.faultString.concat();
            logger.log("error for loading tags for blog '" + l.url + "': " + err, "wordpress service");
            onErrorCallback(err);
        } else {
            var terms = [], term;
            _.each(result, function(rawTerm) {
                term = {};
                term.count = rawTerm.count;
                term.name = rawTerm.name.concat();
                term.slug = rawTerm.slug.concat();
                term.taxonomy = rawTerm.taxonomy.concat();
                term.term_id = rawTerm.term_id.concat();
                terms.push(term);
            });
            onSuccessCallback(terms);
        }
    };
    var processResponse = function(result, post, onSuccessCallback, onErrorCallback) {
        if (result.faultCode) {
            var err = result.faultString.concat();
            logger.log("error for post '" + post.title + "' in blog '" + l.url + "': " + err, "wordpress service");
            onErrorCallback(err);
        } else {
            onSuccessCallback();
        }
    };
    var runCommand = function(runAction, args, onSuccessCallback, onErrorCallback) {
        if (!wp) {
            initialize(function() {
                runAction(args, onSuccessCallback, onErrorCallback);
            }, onErrorCallback);
        } else {
            runAction(args, onSuccessCallback, onErrorCallback);
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
            logger.log("reset credentials", "wordpress service");
        },
        getPost: function(postId) {
            if (!wp) initialize();
        },
        savePost: function(post, onSuccessCallback, onErrorCallback) {
            runCommand(save, post, onSuccessCallback, onErrorCallback);
        },
        getTags: function(onSuccessCallback, onErrorCallback) {
            runCommand(getTerms, TAG_TYPE, onSuccessCallback, onErrorCallback);
        },
        getCategories: function(onSuccessCallback, onErrorCallback) {
            runCommand(getTerms, CATEGORY_TYPE, onSuccessCallback, onErrorCallback);
        },
        uploadImage: function(onSuccessCallback, onErrorCallback) {}
    };
} ]);