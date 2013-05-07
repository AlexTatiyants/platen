/*! platen 2013-05-07 */
"use strict";

angular.module("platen.directives", []);

angular.module("platen.services", []);

angular.module("platen.models", []);

var platen = angular.module("platen", [ "platen.models", "platen.directives", "platen.services", "ui.bootstrap", "ui" ]).config([ "$routeProvider", function($routeProvider) {
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

var EditorController = function(Post, $scope, $routeParams, $filter, fileManager, wordpress, logger, resources) {
    var AUTOSAVE_INTERVAL = 12e3;
    var STATUS_DRAFT = "draft";
    var STATUS_PUBLISH = "publish";
    var POST_TITLE_ID = "post-title";
    var POST_CONTENT_ID = "post-content";
    var POST_EXCERPT = "post-excerpt";
    var POST_TAGS = "post-tags";
    var POST_CATEGORIES = "post-categories";
    var EDITABLE_ELEMENTS = [ POST_TITLE_ID, POST_CONTENT_ID, POST_EXCERPT, POST_TAGS, POST_CATEGORIES ];
    var INSERTED_IMAGE_PLACEHOLDER = "[[!@#IMAGE_PLACEHOLDER#@!]]";
    var DELETED_IMAGE_PLACEHOLDER = "!! IMAGE DELETED !!";
    var MESSAGE_PREVIEW_HTML = "Preview as HTML";
    var MESSAGE_PREVIEW_MARKDOWN = "View Markdown";
    var IMAGE_TYPE = "image/png";
    var notify = function(message, error, isSuccess) {
        if (error) {
            message += ": " + error;
        }
        logger.log(message, "EditorController");
        $scope.$emit(resources.events.PROCESSING_FINISHED, {
            message: message,
            success: isSuccess
        });
    };
    Post.initialize($routeParams.postId, function(post) {
        $scope.post = post;
        $scope.previewOn = false;
        $scope.showMetadata = false;
        $scope.previewMessage = MESSAGE_PREVIEW_HTML;
        logger.log("loaded post '" + $scope.post.title + "'", "EditorController");
        $("#post-title").focus();
        $scope.safeApply();
    }, function(error) {
        notify("error loading post", error, false);
    });
    var savePost = function() {
        Post.save(function() {
            $scope.$apply();
            logger.log("saved post '" + $scope.post.title + "' on " + $scope.post.state.lastSaveDate, "EditorController");
        }, function(error) {
            notify("erorr saving post", error, false);
        });
    };
    $scope.$on("elementEdited", function(event, elementId) {
        if (_.contains(EDITABLE_ELEMENTS, elementId)) {
            savePost();
        }
    });
    var addImage = function(imageName, imageBlob, onSuccessCallback, onErrorCallback) {
        var fileName = imageName.replace(/[^a-z0-9]/gi, "_").toLowerCase();
        if (fileName.indexOf(".png") === -1) {
            fileName += ".png";
        }
        var image = {
            id: new Date().getTime(),
            type: IMAGE_TYPE,
            name: imageName,
            fileName: fileName,
            filePath: resources.IMAGE_DIRECTORY_PATH + "/" + fileName
        };
        var contentMarkdownHtml = $scope.post.contentMarkdownHtml;
        fileManager.writeFile(image.filePath, imageBlob, function(fileEntry) {
            image.localUrl = fileEntry.toURL();
            image.markdownUrl = "![" + image.name + "](" + image.localUrl + ")";
            $scope.post.contentMarkdownHtml = contentMarkdownHtml.replace(INSERTED_IMAGE_PLACEHOLDER, image.markdownUrl);
            $scope.post.images[image.id] = image;
            savePost();
            image = {};
            notify("image saved", null, true);
        }, function(error) {
            notify("error saving image", error, false);
        });
    };
    $scope.$on("imageInserted", function(event, blob) {
        $scope.imageToInsert = {};
        $scope.imageToInsert.blob = blob;
        document.execCommand("insertHtml", false, INSERTED_IMAGE_PLACEHOLDER);
        $scope.insertImageDialogOpen = true;
    });
    $scope.proceedWithImageInsert = function() {
        $scope.insertImageDialogOpen = false;
        addImage($scope.imageToInsert.fileName, $scope.imageToInsert.blob, function() {
            savePost();
        }, function(error) {
            notify("erorr updating post '" + $scope.post.title, error, false);
        });
    };
    $scope.cancelImageInsert = function() {
        $scope.imageToInsert = {};
        $scope.post.contentMarkdownHtml = $scope.post.contentMarkdownHtml.replace(INSERTED_IMAGE_PLACEHOLDER, "");
        $("#post-content").focus();
        $scope.insertImageDialogOpen = false;
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
    $scope.sync = function() {
        notify("starting WordPress upload", null, true);
        Post.sync(function() {
            notify("finished upload to WordPress", null, false);
        }, function(error) {
            notify("error uploading post '" + $scope.post.title, error, false);
        });
    };
    $scope.getTags = function() {
        wordpress.getTags(function(result) {
            $scope.tags = result;
        }, function(error) {
            notify("error loading tags from WordPress", error, false);
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
        }, function(error) {
            notify("error loading categories from WordPress", error, false);
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
    $scope.initiateImageDelete = function(image) {
        $scope.imageToDelete = image;
        $scope.deleteImageConfirmOpen = true;
    };
    $scope.cancelImageDelete = function() {
        $scope.deleteImageConfirmOpen = false;
        $scope.imageToDelete = {};
    };
    $scope.proceedWithImageDelete = function() {
        $scope.deleteImageConfirmOpen = false;
        var imageToDelete = $scope.imageToDelete;
        fileManager.removeFile($scope.imageToDelete.filePath, function() {
            $scope.post.contentMarkdownHtml = $scope.post.contentMarkdownHtml.replace(imageToDelete.localUrl, DELETED_IMAGE_PLACEHOLDER);
            delete $scope.post.images[imageToDelete.id];
            savePost();
            logger.log("deleted image '" + imageToDelete.fileName + "'", "EditorController");
            $scope.imageToDelete = {};
        }, function(error) {
            notify("error deleting image", error, false);
        });
    };
    $scope.addImageToPost = function(image) {};
    $scope.togglePublishStatus = function() {
        if ($scope.post.status === STATUS_DRAFT) {
            $scope.post.status = STATUS_PUBLISH;
            $scope.post.state.toBePublished = true;
        } else {
            $scope.post.status = STATUS_DRAFT;
            $scope.post.state.toBePublished = false;
        }
        savePost();
    };
};

EditorController.$inject = [ "Post", "$scope", "$routeParams", "$filter", "fileManager", "wordpress", "logger", "resources" ];

var ImagesController = function($scope, fileManager, logger, resources) {
    $scope.images = {};
    $scope.confirm = {};
    $scope.loaded = false;
    $scope.imageToDelete = {};
    if (!$scope.loaded) {
        fileManager.accessFilesInDirectory(resources.IMAGE_DIRECTORY_PATH, fileManager.directoryAccessActions.LIST, function(file) {
            var image = {};
            image.name = file.name;
            image.url = file.toURL();
            image.id = file.fullPath;
            image.path = file.fullPath;
            $scope.images[image.id] = image;
            $scope.$apply();
        }, function(error) {
            logger.log(error, "ImagesController");
            $scope.$emit(resources.events.PROCESSING_FINISHED, {
                message: "loading images failed",
                success: false
            });
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
            logger.log("deleted image '" + $scope.imageToDelete.title + "'", "ImagesController");
            $scope.imageToDelete = {};
            $scope.$apply();
        }, function(error) {
            $scope.$emit(resources.events.PROCESSING_FINISHED, {
                message: "failed to deleted image '" + $scope.postToDelete.title + "'",
                success: false
            });
        });
    };
    $scope.deleteAll = function() {
        fileManager.accessFilesInDirectory(resources.IMAGE_DIRECTORY_PATH, fileManager.directoryAccessActions.REMOVE, function(file) {
            logger.log("deleted all images", "ImagesController");
            $scope.images = {};
            $scope.$emit(resources.events.PROCESSING_FINISHED, {
                message: "all images removed",
                success: true
            });
        }, function(error) {
            logger.log("error removing all images: " + error, "ImagesController");
            $scope.$emit(resources.events.PROCESSING_FINISHED, {
                message: "removing images failed",
                success: false
            });
        });
    };
};

ImagesController.$inject = [ "$scope", "fileManager", "logger", "resources" ];

var LoginController = function($scope, dialog, wordpress) {
    $scope.login = {
        url: wordpress.login.url,
        username: wordpress.login.username,
        password: wordpress.login.password,
        rememberCredentials: wordpress.login.rememberCredentials
    };
    $scope.submit = function() {
        wordpress.saveCredentials($scope.login);
        dialog.close();
    };
    $scope.resetCredentials = function() {
        $scope.login.url = "";
        $scope.login.username = "";
        $scope.login.password = "";
        wordpress.saveCredentials($scope.login);
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

var MainController = function($scope, $dialog, $timeout, fileManager, resources, settings) {
    var FADE_DURATION = 3e3;
    $scope.optionsPanelVisible = false;
    $scope.appStatus = {
        isProcessing: false,
        isSuccess: true,
        message: "",
        showMessage: false
    };
    fileManager.initialize();
    $scope.loginCredentials = function() {
        $dialog.dialog({
            backdrop: true,
            keyboard: true,
            backdropClick: true,
            controller: "LoginController",
            templateUrl: "views/modals/login.html"
        }).open();
    };
    $scope.switchTheme = function(themeName) {
        _.each($("link"), function(link) {
            if (link.title !== themeName) {
                link.disabled = true;
            } else {
                link.disabled = false;
            }
        });
        settings.setSetting(settings.THEME, themeName);
        $scope.currentTheme = settings.getSetting(settings.THEME);
    };
    $scope.currentTheme = settings.getSetting(settings.THEME);
    $scope.switchTheme($scope.currentTheme);
    $scope.toggleOptionsPanel = function() {
        $scope.optionsPanelVisible = !$scope.optionsPanelVisible;
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
        $scope.appStatus.showMessage = true;
        $scope.safeApply();
        $timeout(function(e) {
            $scope.appStatus.showMessage = false;
        }, FADE_DURATION);
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
        $scope.appStatus.showMessage = false;
    };
    $scope.safeApply = function(fn) {
        var phase = this.$root.$$phase;
        if (phase == "$apply" || phase == "$digest") {
            if (fn && typeof fn === "function") {
                fn();
            }
        } else {
            this.$apply(fn);
        }
    };
};

MainController.$inject = [ "$scope", "$dialog", "$timeout", "fileManager", "resources", "settings" ];

var PostsController = function($scope, $location, fileManager, logger, resources) {
    $scope.posts = {};
    $scope.confirm = {};
    $scope.loaded = false;
    $scope.postToDelete = {};
    if (!$scope.loaded) {
        fileManager.accessFilesInDirectory(resources.POST_DIRECTORY_PATH, fileManager.directoryAccessActions.READ, function(file) {
            try {
                var post = JSON.parse(file);
                $scope.posts[post.id] = post;
                $scope.loaded = true;
                $scope.$apply();
            } catch (error) {
                logger.log("error reading file [" + file + "]: " + error, "PostsController");
                $scope.$emit(resources.events.PROCESSING_FINISHED, {
                    message: "loading posts failed",
                    success: false
                });
                $scope.$apply();
            }
        }, function(error) {
            logger.log(error, "PostsController");
            $scope.$emit(resources.events.PROCESSING_FINISHED, {
                message: "loading posts failed",
                success: false
            });
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
        }, function(error) {
            $scope.$emit(resources.events.PROCESSING_FINISHED, {
                message: "failed to remove post '" + $scope.postToDelete.title + "'",
                success: false
            });
        });
    };
    $scope.editPost = function(post) {
        $location.path("posts/" + post.id);
    };
    $scope.deleteAll = function() {
        fileManager.accessFilesInDirectory(resources.POST_DIRECTORY_PATH, fileManager.directoryAccessActions.REMOVE, function(file) {
            logger.log("deleted all posts", "PostsController");
            $scope.posts = {};
            $scope.$emit(resources.events.PROCESSING_FINISHED, {
                message: "all posts removed",
                success: true
            });
        }, function(error) {
            logger.log("error removing all posts: " + error, "PostsController");
            $scope.$emit(resources.events.PROCESSING_FINISHED, {
                message: "removing posts failed",
                success: false
            });
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

angular.module("platen.models").factory("Post", [ "$q", "resources", "fileManager", "wordpress", "logger", function($q, resources, fileManager, wordpress, logger) {
    var data = {};
    var STATUS_DRAFT = "draft";
    var STATUS_PUBLISH = "publish";
    var getFilePath = function(postId) {
        return "/" + resources.POST_DIRECTORY_PATH + "/" + postId;
    };
    var createPost = function() {
        data.id = new Date().getTime();
        data.path = getFilePath(data.id);
        data.status = STATUS_DRAFT;
        data.title = "";
        data.content = "";
        data.contentMarkdown = "";
        data.contentMarkdownHtml = "";
        data.contentHtmlPreview = "";
        data.wordPressId = 0;
        data.excerpt = "";
        data.images = {};
        data.tags = "";
        data.categories = "";
        data.state = {
            createDate: new Date(),
            lastSaveDate: "",
            lastUploadDate: "",
            toBePublished: false
        };
    };
    var savePost = function(onSuccessCallback, onErrorCallback) {
        var postToSave = JSON.parse(JSON.stringify(data));
        postToSave.content = "";
        postToSave.contentHtmlPreview = "";
        fileManager.writeFile(getFilePath(data.id), JSON.stringify(postToSave), function() {
            data.state.lastSaveDate = new Date();
            onSuccessCallback();
        }, onErrorCallback);
    };
    var uploadImage = function(image) {
        var d = $q.defer();
        try {
            fileManager.readFile(image.filePath, false, function(imageData) {
                wordpress.uploadFile(image.fileName, image.type, imageData, function(id, url) {
                    image.blogUrl = url;
                    image.blogId = id;
                    logger.log("uploaded image" + image.fileName, "Post module");
                    d.resolve();
                }, function(e) {
                    d.reject();
                    logger.log("error uploading image " + image.fileName, "Post Module");
                });
            }, function(e) {
                d.reject();
                logger.log("error reading image " + image.fileName, "Post Module");
            });
        } catch (e) {
            d.reject();
            logger.log("error uploading image " + image.fileName, "Post Module");
        }
        return d.promise;
    };
    var uploadImages = function(content, onCompletionCallback) {
        var promises = [];
        _.each(data.images, function(image) {
            if (!image.blogId || !image.blogId.trim() === "") {
                promises.push(uploadImage(image));
            }
        });
        $q.all(promises).then(onCompletionCallback);
    };
    return {
        initialize: function(postId, onSuccessCallback, onErrorCallback) {
            if (postId === "0") {
                createPost();
                onSuccessCallback(data);
            } else {
                fileManager.readFile(getFilePath(postId), true, function(postJson) {
                    data = JSON.parse(postJson);
                    onSuccessCallback(data);
                }, function(error) {
                    onErrorCallback(error);
                });
            }
        },
        save: function(onSuccessCallback, onErrorCallback) {
            if (data.title.trim() === "" && data.contentMarkdown.trim() === "") return;
            savePost(onSuccessCallback, onErrorCallback);
        },
        sync: function(onSuccessCallback, onErrorCallback) {
            data.content = marked(data.contentMarkdown).replace(/</g, "&lt;").replace(/>/g, "&gt;");
            try {
                uploadImages(data.content, function() {
                    var content = data.content;
                    _.each(data.images, function(image) {
                        content = content.replace(image.localUrl, image.blogUrl);
                    });
                    data.content = content;
                    wordpress.savePost(data, function(result) {
                        data.state.lastUploadDate = new Date();
                        if (data.state.toBePublished) {
                            data.state.toBePublished = false;
                        }
                        if (!data.wordPressId) {
                            data.wordPressId = result;
                            savePost(onSuccessCallback, onErrorCallback);
                        }
                    }, onErrorCallback);
                });
            } catch (e) {
                onErrorCallback(e);
            }
        }
    };
} ]);

angular.module("platen.services").factory("fileManager", function() {
    var fs;
    var SIZE = 10 * 1024 * 1024;
    var LIST_FILE = 1;
    var READ_FILE = 2;
    var REMOVE_FILE = 3;
    var doCreate = {
        create: true
    };
    var dontCreate = {
        create: false
    };
    var DEFAULT_FILE_TYPE = {
        type: "text/plain"
    };
    var getError = function(e, step) {
        return "Error " + e.code + ": " + e.name + " " + step;
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
    var getFileEntryAndDoAction = function(filePath, createParam, actionCallback, onErrorCallback) {
        if (fs) {
            fs.root.getFile(filePath, createParam, actionCallback, onErrorCallback);
        }
    };
    var processFile = function(filePath, createParam, onSuccessCallback, onErrorCallback) {
        if (fs) {
            fs.root.getFile(filePath, createParam, function(fileEntry) {
                fileEntry.file(onSuccessCallback, onErrorCallback);
            }, onErrorCallback);
        }
    };
    return {
        directoryAccessActions: {
            LIST: LIST_FILE,
            READ: READ_FILE,
            REMOVE: REMOVE_FILE
        },
        initialize: function(onErrorCallback) {
            window.webkitRequestFileSystem(PERSISTENT, SIZE, function(fileSystem) {
                fs = fileSystem;
            }, function(e) {
                onErrorCallback(getError(e, "while initializing file system"));
            });
        },
        accessFilesInDirectory: function(directoryPath, accessAction, onSuccessCallback, onErrorCallback) {
            if (fs) {
                fs.root.getDirectory(directoryPath, doCreate, function(dirEntry) {
                    dirEntry.createReader().readEntries(function(entries) {
                        _.each(entries, function(entry) {
                            if (entry.isFile) {
                                switch (accessAction) {
                                  case LIST_FILE:
                                    onSuccessCallback(entry);
                                    break;

                                  case READ_FILE:
                                    processFile(entry.fullPath, dontCreate, function(file) {
                                        var reader = new FileReader();
                                        reader.onloadend = function(e) {
                                            onSuccessCallback(this.result);
                                        };
                                        reader.readAsText(file);
                                    }, function(e) {
                                        onErrorCallback(getError(e, "while reading file " + entry.fullPath));
                                    });
                                    break;

                                  case REMOVE_FILE:
                                    getFileEntryAndDoAction(entry.fullPath, dontCreate, function(fileEntry) {
                                        fileEntry.remove(onSuccessCallback, function(e) {
                                            onErrorCallback(getError(e, " while removing file " + entry.fullPath));
                                        });
                                    });
                                    break;

                                  default:
                                    onSuccessCallback(entry);
                                    break;
                                }
                            }
                        });
                    }, function(e) {
                        onErrorCallback(getError(e, "while reading entries in " + directoryPath));
                    });
                }, function(e) {
                    onErrorCallback(getError(e, "while reading getting directory " + directoryPath));
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
                    fileWriter.onerror = onErrorCallback;
                    fileWriter.onwriteend = function() {
                        fileWriter.onwriteend = null;
                        fileWriter.write(blob);
                        onSuccessCallback(fileEntry);
                    };
                    fileWriter.truncate(blob.size);
                }, function(e) {
                    onErrorCallback(getError(e, " while creating fileWriter for " + filePath));
                });
            });
        },
        readFile: function(filePath, asText, onSuccessCallback, onErrorCallback) {
            processFile(filePath, dontCreate, function(file) {
                var reader = new FileReader();
                reader.onloadend = function(e) {
                    onSuccessCallback(this.result);
                };
                if (asText) {
                    reader.readAsText(file);
                } else {
                    reader.readAsBinaryString(file);
                }
            }, function(e) {
                onErrorCallback(getError(e, "while reading file " + filePath));
            });
        },
        removeFile: function(filePath, onSuccessCallback, onErrorCallback) {
            getFileEntryAndDoAction(filePath, dontCreate, function(fileEntry) {
                fileEntry.remove(onSuccessCallback, function(e) {
                    onErrorCallback(getError(e, " while removing file " + filePath));
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

angular.module("platen.services").factory("settings", function() {
    var LOCAL_STORAGE_OPTIONS_KEY = "platen.settings";
    var SETTING_THEME = "theme";
    var THEMES = {
        white: "white",
        dark: "dark"
    };
    var AUTOSAVE_INTERVAL = 12e3;
    var getSetting = function(key) {
        return localStorage[LOCAL_STORAGE_OPTIONS_KEY + "." + key];
    };
    var saveSetting = function(key, value) {
        localStorage[LOCAL_STORAGE_OPTIONS_KEY + "." + key] = value;
    };
    if (!getSetting(SETTING_THEME)) {
        saveSetting(SETTING_THEME, THEMES.white);
    }
    return {
        getSetting: function(key) {
            return getSetting(key);
        },
        setSetting: function(key, value) {
            saveSetting(key, value);
        },
        THEME: SETTING_THEME
    };
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
        rememberCredentials: localStorage["rememberCredentials"] === "true" ? true : false
    };
    var wp = null;
    var saveCredentials = function(login) {
        l.url = login.url;
        l.username = login.username;
        l.password = login.password;
        l.rememberCredentials = login.rememberCredentials;
        if (l.rememberCredentials) {
            localStorage["url"] = l.url;
            localStorage["username"] = l.username;
            localStorage["password"] = l.password;
            localStorage["rememberCredentials"] = l.rememberCredentials;
        }
        logger.log("saved login credentials for blog + '" + login.url + "'", "wordpress service");
    };
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
        } catch (e) {
            logger.log("unable to log into blog '" + l.url + "': " + e.message, "wordpress service");
            onErrorCallback(e.message);
        }
        if (wp) {
            onSuccessCallback();
        }
    };
    var uploadPost = function(post, onSuccessCallback, onErrorCallback) {
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
        initialize: function(onSuccessCallback, onErrorCallback) {
            if (!wp) {
                initialize(onSuccessCallback, onErrorCallback);
            }
        },
        saveCredentials: function(login) {
            saveCredentials(login);
        },
        savePost: function(post, onSuccessCallback, onErrorCallback) {
            runCommand(uploadPost, post, onSuccessCallback, onErrorCallback);
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