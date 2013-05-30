angular.module('platen.services').factory('wordpress', ['$dialog', 'logger',
  function($dialog, logger) {
    var POST_TYPE = 'post';
    var TAG_TYPE = 'post_tag';
    var CATEGORY_TYPE = 'category';
    var DEFAULT_BLOG_ID = 1;
    var DEFAULT_AUTHOR_ID = 1;

    var _login = {};

    var isLoginValid = function() {

      var valid = (_login.url && _login.url.trim() === "") ||
      (_login.username && _login.username.trim() === "") ||
      (_login.password && _login.password.trim() === "");
      return valid;
    };

    var callWordPress = function(methodName, additionalParams, onSuccessCallback, onErrorCallback) {

      var codeToRun = function() {
        var loginParams = [DEFAULT_BLOG_ID, _login.username, _login.password];
        var fullParams = loginParams.concat(additionalParams);

        $.xmlrpc({
          url: _login.replace(/\/$/, "") + "/xmlrpc.php",
          methodName: methodName,
          params: fullParams,
          success: function(response, status, jqXHR) {
            console.log("call to " + methodName + " succeeded", response);
            onSuccessCallback(response);
          },
          error: function(jqXHR, status, error) {
            console.log("call to " + methodName + " failed", error);
            onErrorCallback(error);
          }
        });
      };

      if (!isLoginValid()) {
        var d = $dialog.dialog({
          backdrop: true,
          keyboard: true,
          backdropClick: true,
          controller: 'LoginController',
          templateUrl: 'views/modals/login.html'
        });

        d.open().then(function() {
          debugger;
          console.log("login obtained", _login);
          if (isLoginValid()) {
            codeToRun();
          } else {
            onErrorCallback("cannot execute call, invalid credentials for WordPress blog");
            logger.log("cannot execute call, invalid credentials for WordPress blog", "wordpress service");
          }
        });
      } else {
        codeToRun();
      }
    };

    return {
      login: _login,
      saveCredentials: function(login) {
        _login = login;
      },
      resetCredentials: function() {
        _login = {};
      },

      getPost: function(postId, onSuccessCallback, onErrorCallback) {
        callWordPress('wp.getPost', [post_id], onSuccessCallback, onErrorCallback);
      },

      savePost: function(post, onSuccessCallback, onErrorCallback) {
        var result, terms = {};
        var data = {
          post_type: POST_TYPE,
          post_status: post.status,
          post_title: post.title,
          post_author: DEFAULT_AUTHOR_ID,
          post_excerpt: post.excerpt,
          post_content: post.content,
          post_format: '',
          terms_names: ''
        };

        if (post.tags && post.tags.trim() !== '') {
          terms.post_tag = post.tags.replace(' ', '').split(',');
        }

        if (post.categories && post.categories.trim() !== '') {
          terms.category = post.categories.replace(' ', '').split(',');
        }

        data.terms_names = terms;

        if (post.wordPressId) {
          callWordPress('wp.editPost', [post.wordPressId, data], onSuccessCallback, onErrorCallback);
        } else {
          callWordPress('wp.newPost', [data], onSuccessCallback, onErrorCallback);
        }
      },

      getTags: function(onSuccessCallback, onErrorCallback) {
        callWordPress('wp.getTerms', [TAG_TYPE], onSuccessCallback, onErrorCallback);
      },

      getCategories: function(onSuccessCallback, onErrorCallback) {
        callWordPress('wp.getTerms', [CATEGORY_TYPE], onSuccessCallback, onErrorCallback);
      },

      uploadFile: function(fileName, fileType, fileData, onSuccessCallback, onErrorCallback) {
        var file = {
          name: file.fileName,
          type: file.fileType,
          bits: new Base64(file.fileData),
          overwrite: false
        };

        callWordPress('wp.uploadFile', [file], onSuccessCallback, onErrorCallback);
      },
    };
  }
]);