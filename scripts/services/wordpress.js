angular.module('platen.services').factory('wordpress', ['$dialog', 'logger',
  function($dialog, logger) {
    var POST_TYPE = 'post';
    var TAG_TYPE = 'post_tag';
    var CATEGORY_TYPE = 'category';
    var DEFAULT_BLOG_ID = 1;
    var DEFAULT_AUTHOR_ID = 1;
    var _login = {};

    var LOCAL_STORAGE_WORDPRESS_CREDENTIALS_KEY = 'platen.wordPressCredentials';

    var isLoginValid = function() {
      return _login.url.trim() !== "" || _login.username.trim() !== "" || _login.password.trim() !== "";
    };

    var loadCredentialsFromStorage = function(onCompletionCallback) {
      chrome.storage.local.get(LOCAL_STORAGE_WORDPRESS_CREDENTIALS_KEY, function(storedValues) {

        _login.url = storedValues[LOCAL_STORAGE_WORDPRESS_CREDENTIALS_KEY].url || '';
        _login.password = storedValues[LOCAL_STORAGE_WORDPRESS_CREDENTIALS_KEY].password || _login.currentSessionCachedPassword || '';
        _login.username = storedValues[LOCAL_STORAGE_WORDPRESS_CREDENTIALS_KEY].username || '';
        _login.rememberPassword = storedValues[LOCAL_STORAGE_WORDPRESS_CREDENTIALS_KEY].rememberPassword || '';

        logger.log("loaded WordPress configuration", "wordpress service");
        onCompletionCallback(_login);
      });
    };

    var callWordPress = function(methodName, additionalParams, onSuccessCallback, onErrorCallback) {

      var codeToRun = function() {
        var loginParams = [DEFAULT_BLOG_ID, _login.username, _login.password];
        var fullParams = loginParams.concat(additionalParams);
        var fullUrl = _login.url.replace(/\/$/, "") + "/xmlrpc.php";

        $.xmlrpc({
          url: fullUrl,
          methodName: methodName,
          params: fullParams,
          success: function(response, status, jqXHR) {
            onSuccessCallback(response);
          },
          error: function(jqXHR, status, error) {
            onErrorCallback(error);
          }
        });
      };

      var obtainCredentialsFromUserIfNeeded = function() {

        if (!isLoginValid()) {
          var d = $dialog.dialog({
            controller: 'LoginController',
            templateUrl: 'views/modals/login.html'
          });

          d.open().then(function() {
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

      if (_.isEmpty(_login)) {
        loadCredentialsFromStorage(obtainCredentialsFromUserIfNeeded);
      } else {
        obtainCredentialsFromUserIfNeeded();
      }
    };

    return {
      loadCredentials: function(onCompletionCallback) {
        loadCredentialsFromStorage(onCompletionCallback);
      },

      saveCredentials: function(login) {
        var saveMe = {};

        if (!login.rememberPassword) {
          // if the user doesn't want the password persisted, we still want to hold on
          // to it for the duration of this session
          login.currentSessionCachedPassword = login.password;
          login.password = '';
        }

        _login = login;

        saveMe[LOCAL_STORAGE_WORDPRESS_CREDENTIALS_KEY] = login;

        chrome.storage.local.set(saveMe, function() {
          logger.log("saved login credentials for blog '" + login.url + "'", "wordpress service");
        });
      },

      resetCredentials: function() {
        _login = {
          url: '',
          username: '',
          password: '',
          rememberPassword: false
        };

        var saveMe = {};

        saveMe[LOCAL_STORAGE_WORDPRESS_CREDENTIALS_KEY] = _login;

        chrome.storage.local.set(saveMe, function() {
          logger.log("reset credentials", "wordpress service");
        });
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
        var base64EncodedFile = new Base64(fileData);

        var file = {
          name: fileName,
          type: fileType,
          bits: $.xmlrpc.binary.fromBase64(base64EncodedFile.bytes),
          overwrite: false
        };

        callWordPress('wp.uploadFile', [file], onSuccessCallback, onErrorCallback);
      },
    };
  }
]);