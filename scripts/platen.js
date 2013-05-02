/*! platen 2013-05-02 */
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
    $routeProvider.when("/images", {
        templateUrl: "views/images.html"
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

var EditorController = function($rootScope, $scope, $routeParams, $timeout, $filter, $q, fileManager, logger, wordpress, resources) {
    var AUTOSAVE_INTERVAL = 12e3;
    var STATUS_DRAFT = "draft";
    var STATUS_PUBLISH = "publish";
    var POST_TITLE_ID = "post-title";
    var POST_CONTENT_ID = "post-content";
    var POST_EXCERPT = "post-excerpt";
    var POST_TAGS = "post-tags";
    var POST_CATEGORIES = "post-categories";
    var IMAGE_TYPE = "image/png";
    var INSERTED_IMAGE_PLACEHOLDER = "[[!@#IMAGE_PLACEHOLDER#@!]]";
    var MESSAGE_PREVIEW_HTML = "Preview as HTML";
    var MESSAGE_PREVIEW_MARKDOWN = "View Markdown";
    $scope.status = {};
    $scope.previewOn = false;
    $scope.status.autoSaveTime = "unsaved";
    $scope.showMetadata = false;
    $scope.previewMessage = MESSAGE_PREVIEW_HTML;
    $scope.post = {};
    var getFilePath = function(postId) {
        return "/" + resources.POST_DIRECTORY_PATH + "/" + postId;
    };
    var createPost = function() {
        $scope.post.id = new Date().getTime();
        $scope.post.path = getFilePath($scope.post.id);
        $scope.post.status = STATUS_DRAFT;
        $scope.post.title = "";
        $scope.post.images = {};
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
            if (!$scope.post.images) {
                $scope.post.images = {};
            }
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
    var uploadImage = function(image) {
        var d = $q.defer();
        fileManager.readFile(image.filePath, false, function(imageData) {
            wordpress.uploadFile(image.fileName, image.type, imageData, function(id, url) {
                image.blogUrl = url;
                image.blogId = id;
                savePost();
                logger.log("uploaded image" + image.fileName, "EditorController");
                d.resolve();
            }, function(e) {
                logger.log("error uploading image " + image.fileName, "EditorController");
            });
        });
        return d.promise;
    };
    var uploadImages = function(content, onCompletionCallback) {
        var promises = [];
        _.each($scope.post.images, function(image) {
            if (!image.blogId || !image.blogId.trim() === "") {
                promises.push(uploadImage(image));
            }
        });
        $q.all(promises).then(onCompletionCallback);
    };
    var insertImage = function(blob) {
        $scope.imageToInsert = {};
        $scope.imageToInsert.blob = blob;
        document.execCommand("insertHtml", false, INSERTED_IMAGE_PLACEHOLDER);
        $scope.insertImageDialogOpen = true;
    };
    $scope.proceedWithImageInsert = function() {
        $scope.insertImageDialogOpen = false;
        var fileName = $scope.imageToInsert.fileName.replace(/[^a-z0-9]/gi, "_").toLowerCase();
        if (fileName.indexOf(".png") === -1) {
            fileName += ".png";
        }
        var image = {
            id: new Date().getTime(),
            type: IMAGE_TYPE,
            fileName: fileName,
            filePath: resources.IMAGE_DIRECTORY_PATH + "/" + fileName
        };
        var contentMarkdownHtml = $scope.post.contentMarkdownHtml;
        fileManager.writeFile(image.filePath, $scope.imageToInsert.blob, function(fileEntry) {
            logger.log("saved image " + image.fileName, "EditorController");
            image.localUrl = fileEntry.toURL();
            image.markdownUrl = "![" + image.fileName + "](" + image.localUrl + ")";
            $scope.post.contentMarkdownHtml = contentMarkdownHtml.replace(INSERTED_IMAGE_PLACEHOLDER, image.markdownUrl);
            $scope.post.images[image.id] = image;
            savePost();
            image = {};
        });
    };
    $scope.cancelImageInsert = function() {
        $scope.imageToInsert = {};
        $scope.post.contentMarkdownHtml = $scope.post.contentMarkdownHtml.replace(INSERTED_IMAGE_PLACEHOLDER, "");
        $("#post-content").focus();
        $scope.insertImageDialogOpen = false;
    };
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
            $scope.$apply();
            logger.log("saved post '" + $scope.post.title + "' on " + $scope.status.autoSaveTime, "EditorController");
        }, function() {});
    };
    $scope.togglePreview = function() {
        if (!$scope.previewOn) {
            $scope.post.contentHtmlPreview = marked($scope.post.contentMarkdown);
        }
        $scope.previewOn = !$scope.previewOn;
        $scope.previewMessage = $scope.previewOn ? MESSAGE_PREVIEW_MARKDOWN : MESSAGE_PREVIEW_HTML;
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
        $scope.post.excerpt = $scope.post.contentMarkdown.match(/^(.*)$/m)[0];
        savePost();
    };
    $scope.read = function() {
        loadPost($scope.post.id);
    };
    $scope.sync = function() {
        $scope.$emit(resources.events.PROCESSING_STARTED, "uploading post to WordPress");
        $scope.post.content = marked($scope.post.contentMarkdown).replace(/</g, "&lt;").replace(/>/g, "&gt;");
        uploadImages($scope.post.content, function() {
            var content = $scope.post.content;
            _.each($scope.post.images, function(image) {
                content = content.replace(image.localUrl, image.blogUrl);
            });
            $scope.post.content = content;
            wordpress.savePost($scope.post, function(result) {
                console.log("finished wordpress upload in editor");
                $scope.post.wordPressId = result;
                savePost();
                $scope.$emit(resources.events.PROCESSING_FINISHED, {
                    message: "upload to WordPress complete",
                    success: true
                });
            }, function(errorMessage) {
                $scope.$emit(resources.events.PROCESSING_FINISHED, {
                    message: "upload to WordPress failed",
                    success: false
                });
            });
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
    $scope.imagesAvailable = function() {
        return !$.isEmptyObject($scope.post.images);
    };
    $scope.deleteImage = function(image) {
        $scope.imageToDelete = image;
        $scope.deleteImageConfirmOpen = true;
    };
    $scope.cancelImageDelete = function() {
        $scope.deleteImageConfirmOpen = false;
        $scope.imageToDelete = {};
    };
    $scope.proceedWithImageDelete = function() {
        $scope.deleteImageConfirmOpen = false;
        fileManager.removeFile($scope.imageToDelete.filePath, function() {
            delete $scope.post.images[$scope.imageToDelete.id];
            savePost();
            logger.log("deleted image '" + $scope.imageToDelete.fileName + "'", "EditorController");
            $scope.imageToDelete = {};
        });
    };
    $scope.$on("elementEdited", function(event, elementId) {
        if (elementId === POST_TITLE_ID || elementId === POST_CONTENT_ID || elementId === POST_EXCERPT || elementId === POST_TAGS || elementId || POST_CATEGORIES) {
            savePost();
        }
    });
    $scope.$on("imageInserted", function(event, blob) {
        insertImage(blob);
    });
};

EditorController.$inject = [ "$rootScope", "$scope", "$routeParams", "$timeout", "$filter", "$q", "fileManager", "logger", "wordpress", "resources" ];

var ImagesController = function($scope, fileManager, logger, resources) {
    $scope.images = {};
    $scope.confirm = {};
    $scope.loaded = false;
    $scope.imageToDelete = {};
    if (!$scope.loaded) {
        fileManager.listFilesinDirectory(resources.IMAGE_DIRECTORY_PATH, function(entry) {
            var image = {};
            image.name = entry.name;
            image.url = entry.toURL();
            image.id = entry.fullPath;
            image.path = entry.fullPath;
            $scope.images[image.id] = image;
            $scope.$apply();
        });
    }
    $scope.deleteImage = function(image) {
        $scope.imageToDelete = image;
        $scope.deleteImageConfirmOpen = true;
    };
    $scope.cancelDelete = function() {
        $scope.deleteImageConfirmOpen = false;
        $scope.imageToDelete = {};
    };
    $scope.proceedWithDelete = function() {
        $scope.deleteImageConfirmOpen = false;
        fileManager.removeFile($scope.imageToDelete.path, function() {
            delete $scope.images[$scope.imageToDelete.id];
            logger.log("deleted image  '" + $scope.imageToDelete.title + "'", "ImagesController");
            $scope.imageToDelete = {};
            $scope.$apply();
        });
    };
    $scope.deleteAll = function() {
        fileManager.clearDirectory(resources.IMAGE_DIRECTORY_PATH, function() {
            logger.log("deleted all images", "ImagesController");
            $scope.images = {};
        });
    };
};

ImagesController.$inject = [ "$scope", "fileManager", "logger", "resources" ];

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
    $scope.appStatus = {
        isProcessing: false,
        isSuccess: true,
        message: ""
    };
    fileManager.initialize();
    var d;
    $scope.loginCredentials = function() {
        d = $dialog.dialog({
            backdrop: true,
            keyboard: true,
            backdropClick: true,
            controller: "LoginController",
            templateUrl: "views/modals/login.html"
        });
        d.open();
    };
    $scope.$on(resources.events.PROCESSING_STARTED, function(event, message) {
        $scope.appStatus.isProcessing = true;
        $scope.appStatus.isSuccess = true;
        $scope.appStatus.message = message;
    });
    $scope.$on(resources.events.PROCESSING_FINISHED, function(event, args) {
        $scope.appStatus.isProcessing = false;
        $scope.appStatus.message = args.message;
        $scope.appStatus.isSuccess = args.success;
    });
    $scope.startProcessing = function() {
        $scope.$emit(resources.events.PROCESSING_STARTED, "starting something");
    };
    $scope.stopProcessing = function() {
        $scope.$emit(resources.events.PROCESSING_FINISHED, {
            message: "bad things happened",
            success: false
        });
    };
    $scope.resetError = function() {
        $scope.appStatus.message = "";
        $scope.appStatus.isProcessing = false;
        $scope.appStatus.isSuccess = true;
    };
};

MainController.$inject = [ "$scope", "$dialog", "fileManager", "resources" ];

var PostsController = function($scope, $location, fileManager, logger, resources) {
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
    $scope.deletePost = function(post) {
        $scope.postToDelete = post;
        $scope.deletePostConfirmOpen = true;
    };
    $scope.cancelDelete = function() {
        $scope.deletePostConfirmOpen = false;
        $scope.postToDelete = {};
    };
    $scope.proceedWithDelete = function() {
        $scope.deletePostConfirmOpen = false;
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

PostsController.$inject = [ "$scope", "$location", "fileManager", "logger", "resources" ];

angular.module("platen.directives").directive("editableMarkdown", function() {
    return {
        restrict: "A",
        require: "?ngModel",
        link: function($scope, $element, attrs, $ngModel) {
            if (!$ngModel) return;
            $ngModel.$render = function() {
                $element.html($ngModel.$viewValue || "");
            };
            $element.bind("blur keyup change", function() {
                $scope.$apply(read);
            });
            var read = function() {
                $scope.post.contentMarkdown = $element.context.innerText;
                $ngModel.$setViewValue($element.html());
            };
            $element.bind("blur paste", function() {
                $scope.$emit("elementEdited", $element[0].id);
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

angular.module("platen.directives").directive("pastableImage", function() {
    return {
        restrict: "A",
        require: "?ngModel",
        link: function($scope, $element, attrs, $ngModel) {
            $element.on("paste", function(event) {
                var item = event.originalEvent.clipboardData.items[0];
                if (!item || item.type !== "image/png") return;
                $scope.$emit("imageInserted", item.getAsFile());
            });
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
        listFilesinDirectory: function(directoryPath, onSuccessCallback) {
            if (fs) {
                fs.root.getDirectory(directoryPath, doCreate, function(dirEntry) {
                    var dirReader = dirEntry.createReader();
                    dirReader.readEntries(function(entries) {
                        _.each(entries, function(entry) {
                            if (entry.isFile) {
                                onSuccessCallback(entry);
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
        writeFile: function(filePath, fileBody, onSuccessCallback, onErrorCallback) {
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
                    onErrorCallback();
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
    IMAGE_DIRECTORY_PATH: "images",
    events: {
        PROCESSING_STARTED: "processingStarted",
        PROCESSING_FINISHED: "processingFinished"
    }
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
                templateUrl: "views/modals/login.html"
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
        } catch (e) {
            logger.log("unable to log into blog '" + l.url + "': " + e.message, "wordpress service");
            onErrorCallback(e.message);
        }
        if (wp) {
            onSuccessCallback();
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
                onSuccessCallback();
            }, onErrorCallback);
        } else {
            result = wp.newPost(DEFAULT_BLOG_ID, data);
            processResponse(result, post, function() {
                logger.log("created post '" + post.title + "' in blog '" + l.url + "'", "wordpress service");
                onSuccessCallback(result.concat());
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
    var uploadFile = function(file, onSuccessCallback, onErrorCallback) {
        var result = wp.uploadFile(1, {
            name: file.fileName,
            type: file.fileType,
            bits: new Base64(file.fileData),
            overwrite: false
        });
        if (result.faultCode) {
            var err = result.faultString.concat();
            logger.log("unable to upload file " + file.fileName + "' to blog '" + l.url + "': " + err, "wordpress service");
            onErrorCallback(err);
        } else {
            logger.log("uploaded file " + file.fileName + "' to blog '" + l.url, "wordpress service");
            onSuccessCallback(result.id.concat(), result.url.concat());
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
        uploadFile: function(fileName, fileType, fileData, onSuccessCallback, onErrorCallback) {
            var args = {};
            args.fileName = fileName;
            args.fileType = fileType;
            args.fileData = fileData;
            runCommand(uploadFile, args, onSuccessCallback, onErrorCallback);
        }
    };
} ]);