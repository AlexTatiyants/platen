angular.module('platen.models').factory('Post', ['$rootScope', '$q', 'resources', 'fileManager', 'wordpress', 'logger',
  function($rootScope, $q, resources, fileManager, wordpress, logger) {
    var data = {};
    var STATUS_DRAFT = 'draft';
    var STATUS_PUBLISH = 'publish';

    var getFilePath = function(postId) {
      return "/" + resources.POST_DIRECTORY_PATH + '/' + postId;
    };

    var createPost = function() {
      data.id = new Date().getTime();
      data.path = getFilePath(data.id);
      data.status = STATUS_DRAFT;
      data.title = '';

      /* there are 4 representations of the post:
        contentMarkdown - raw text written using markdown formatting (innerText property of the editor window)
        contentMarkdownHTML - markdown text, HTMLified by the browswer (innerHTML property of the editor window)
        contentHTMLPreview - markdown text converted to HTML (innerHTML content of the preview window)
        content - markdown text converted to HTML and encoded (i.e. content of the post for Wordpress) */
      data.content = '';
      data.contentMarkdown = ''; // set by editable-markdown directive
      data.contentMarkdownHtml = '';
      data.contentHtmlPreview = '';
      data.wordPressId = 0;

      data.excerpt = '';

      data.images = {};
      data.tags = '';
      data.categories = '';

      data.state = {
        createDate: new Date(),
        lastSaveDate: '',
        lastUploadDate: '',
        toBePublished: false
      };
    };

    var savePost = function(onSuccessCallback, onErrorCallback) {
      var postToSave = JSON.parse(JSON.stringify(data));
      // since there are 4 different representations of the same content, we only need to save one of them
      postToSave.content = '';
      postToSave.contentHtmlPreview = '';

      fileManager.writeFile(getFilePath(data.id), JSON.stringify(postToSave), function() {
        data.state.lastSaveDate = new Date();
        onSuccessCallback();
      }, onErrorCallback);
    };

    var uploadImage = function(image) {
      var d = $q.defer();

      try {
        fileManager.readFile(image.filePath, false, function(imageData) {
          // platen suffixes images with a unique identifier which has to be removed prior to uploading the file to WordPress
          var cleanFileName = image.fileName.substr(0, image.fileName.lastIndexOf("."));

          wordpress.uploadFile(cleanFileName, image.type, imageData, function(response) {
            image.blogUrl = response[0].url;
            image.blogId = response[0].id;

            logger.log("uploaded image '" + image.name + "' to '" + image.blogUrl + "'", "Post module");
            d.resolve();
            $rootScope.$apply();

          }, function(e) {
            logger.log("error uploading image '" + image.name + "'", "Post Module");
            d.reject();
            $rootScope.$apply();
          });

        }, function(e) {
          logger.log("error reading image '" + image.name + "'", "Post Module");
          d.reject();
          $rootScope.$apply();
        });

      } catch (e) {
        d.reject();
        logger.log("error uploading image '" + image.name + "'", "Post Module");
      }

      return d.promise;
    };

    var uploadImages = function(content, onCompletionCallback) {
      var promises = [];

      _.each(data.images, function(image) {
        if (!image.blogId || image.blogId.trim() === '') {
          // for each image to be uploaded, initiate upload to wordpress
          // because this operation is asyncronous, we need to get a promise for it
          promises.push(uploadImage(image));
        }
      });

      if (promises.length > 0) {
        // once all promises are fullfilled (i.e. all items have been uploaded),
        // proceed with uploading the post
        $q.all(promises).then(onCompletionCallback);
      } else {
        // if there were no promises to begin with, just proceed with uploading
        onCompletionCallback();
      }
    };

    var replaceImageHtml = function(content, image) {
      var imgReplacement = '<a href="' + image.blogUrl + '"><img class="align' + image.alignment;
      var endingPTag = '';

      if (image.width > 0) {
        imgReplacement += '" width="' + image.width;
      }

      imgReplacement += '" src="' + image.blogUrl;

      if (image.alignment === 'center') {
        imgReplacement = '<p style="text-align: center;">' + imgReplacement;
        endingPTag = '</p>';
      }

      return content
        .replace('<img src="' + image.localUrl, imgReplacement)
        .replace('alt="' + image.name + '">', 'alt="' + image.name + '"></a>') + endingPTag;
    };

    return {
      initialize: function(postId, onSuccessCallback, onErrorCallback) {
        // load or create new
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
        if (data.title.trim() === '' && data.contentMarkdown.trim() === '') return;
        savePost(onSuccessCallback, onErrorCallback);
      },

      sync: function(onSuccessCallback, onErrorCallback) {
        data.content = marked(data.contentMarkdown);

        var saveOnSuccessCallback = function(result) {
          logger.log("synched post '" + data.title + "'", "Post service");

          data.state.lastUploadDate = new Date();
          if (data.state.toBePublished) {
            data.state.toBePublished = false;
          }
          if (!data.wordPressId) {
            data.wordPressId = result[0];
          }

          savePost(onSuccessCallback, onErrorCallback);
        };

        try {
          // before uploading the post to WordPress, we need to
          // extract and upload any images which haven't already been uploaded
          uploadImages(data.content, function() {
            // replace references to images within the post body with WordPress urls
            var content = data.content;

            _.each(data.images, function(image) {
              content = replaceImageHtml(content, image);
            });

            data.content = content;

            wordpress.savePost(data, saveOnSuccessCallback, onErrorCallback);

          });
        } catch (e) {
          onErrorCallback(e);
        }
      },

      resetWordPressInfo: function() {
        data.wordPressId = 0;
        _.each(data.images, function(image) {
            image.blogUrl = null;
            image.blogId = null;
        });     
      },
    }; 
  }
]);