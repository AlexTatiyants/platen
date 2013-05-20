angular.module('platen.models').factory('Post', ['$q', 'resources', 'fileManager', 'wordpress', 'logger',

function($q, resources, fileManager, wordpress, logger) {
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
        content - markdown text converted to HTML and encoded (i.e. content of the post for Wordpress)
    */
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
        // platen suffixes images with a unique identifier which has to be removed
        // prior to uploading the file to WordPress
        var cleanFileName = image.fileName.substr(0, image.fileName.lastIndexOf("."));
        wordpress.uploadFile(cleanFileName, image.type, imageData, function(id, url) {
          image.blogUrl = url;
          image.blogId = id;
          logger.log("uploaded image '" + image.fileName + "' to '" + image.blogUrl, "Post module");
          d.resolve();

        }, function(e) {
          d.reject();
          logger.log("error uploading image '" + image.fileName + "'", "Post Module");
        })

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
    }
    else {
      // if there were no promises to begin with, just proceed with uploading
      onCompletionCallback();
    }
  };


  var replaceImageHtml = function(content, image) {
    return content
    .replace('&lt;img src="' + image.localUrl, '&lt;a href="' + image.blogUrl + '"&gt; &lt;img class="align' + image.alignment + '" width="' + image.maxWidth + '" src="' + image.blogUrl)
    .replace('alt="' + image.title +'"&gt;', 'alt="' + image.title +'"&gt;&lt;/a&gt;');
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
        })
      }
    },

    save: function(onSuccessCallback, onErrorCallback) {
      if (data.title.trim() === '' && data.contentMarkdown.trim() === '') return;
      savePost(onSuccessCallback, onErrorCallback);
    },

    sync: function(onSuccessCallback, onErrorCallback) {
      data.content = marked(data.contentMarkdown).replace(/</g, '&lt;').replace(/>/g, '&gt;');

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

          wordpress.savePost(data, function(result) {
            // if this is the first time the post is being uploaded
            // we'll get a WordPress id which should be saved locally
            data.state.lastUploadDate = new Date();
            if (data.state.toBePublished) {
              data.state.toBePublished = false;
            }
            if (!data.wordPressId) {
              data.wordPressId = result;
              savePost(onSuccessCallback, onErrorCallback);
            } else {
              onSuccessCallback();
            }
          }, onErrorCallback);
        });
      } catch (e) {
        onErrorCallback(e);
      }
    }
  }
}]);