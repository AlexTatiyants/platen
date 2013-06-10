angular.module('platen.services').factory('wordpress', ['$dialog', '$rootScope', 'logger',
  function($dialog, $rootScope, logger) {
    var POST_TYPE = 'post';
    var TAG_TYPE = 'post_tag';
    var CATEGORY_TYPE = 'category';
    var DEFAULT_BLOG_ID = 1;
    var DEFAULT_AUTHOR_ID = 1;
    var LOCAL_STORAGE_WORDPRESS_CREDENTIALS_KEY = 'platen.wordPressCredentials';

    var _credentials = {};

    var areCredentialsValid = function() {
      return !_.isEmpty(_credentials) && _credentials.url.trim() !== "" && _credentials.username.trim() !== "" && _credentials.password.trim() !== "";
    };

    var valueOrDefault = function(value, defaultValue) {
      if (value !== null) {
        return value;
      } else {
        if (defaultValue) {
          return defaultValue;
        } else {
          return '';
        }
      }
    };

    var loadCredentialsFromStorage = function(onCompletionCallback) {

      chrome.storage.local.get(LOCAL_STORAGE_WORDPRESS_CREDENTIALS_KEY, function(storedValues) {

        if (storedValues[LOCAL_STORAGE_WORDPRESS_CREDENTIALS_KEY]) {
          _credentials.url = valueOrDefault(storedValues[LOCAL_STORAGE_WORDPRESS_CREDENTIALS_KEY].url, '');
          _credentials.password = valueOrDefault(storedValues[LOCAL_STORAGE_WORDPRESS_CREDENTIALS_KEY].password, _credentials.currentSessionCachedPassword);
          _credentials.username = valueOrDefault(storedValues[LOCAL_STORAGE_WORDPRESS_CREDENTIALS_KEY].username, '');
          _credentials.rememberPassword = valueOrDefault(storedValues[LOCAL_STORAGE_WORDPRESS_CREDENTIALS_KEY].rememberPassword, false);
        } else {
          _credentials.url = '';
          _credentials.username = '';
          _credentials.password = '';
          _credentials.rememberPassword = false;
        }

        logger.log("loaded login credentials", "wordpress service");
        onCompletionCallback(_credentials);
      });
    };

    var obtainCredentialsFromUserIfNeeded = function(onSuccessCallback, onErrorCallback) {
      var createLoginDialog = function() {
        if (!areCredentialsValid()) {
          var d = $dialog.dialog({
            controller: 'LoginController',
            templateUrl: 'views/modals/login.html'
          });

          d.open().then(function() {
            if (areCredentialsValid()) {
              onSuccessCallback();
            } else {
              onErrorCallback("cannot execute call, invalid credentials for WordPress blog");
              logger.log("cannot execute call, invalid credentials for WordPress blog", "wordpress service");
            }
          });

          $rootScope.safeApply();

        } else {
          onSuccessCallback();
        }
      };

      if (_.isEmpty(_credentials)) {
        loadCredentialsFromStorage(createLoginDialog);
      } else {
        createLoginDialog();
      }
    };

    var callWordPress = function(methodName, additionalParams, onSuccessCallback, onErrorCallback) {
      var codeToRun = function() {
        var loginParams = [DEFAULT_BLOG_ID, _credentials.username, _credentials.password];
        var fullParams = loginParams.concat(additionalParams);
        var fullUrl = _credentials.url.replace(/\/$/, "") + "/xmlrpc.php";

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

      if (areCredentialsValid) {
        codeToRun();
      } else {
        obtainCredentialsFromUserIfNeeded(codeToRun, onErrorCallback);
      }
    };

    return {
      loadCredentials: function(onCompletionCallback, onErrorCallback) {
        loadCredentialsFromStorage(onCompletionCallback, onErrorCallback);
      },

      getCredentials: function(onSuccessCallback, onErrorCallback) {
        obtainCredentialsFromUserIfNeeded(onSuccessCallback, onErrorCallback);
      },

      saveCredentials: function(userSuppliedCredentials) {
        var saveMe = {};

        _.each(userSuppliedCredentials, function(value, key, list) {
          _credentials[key] = userSuppliedCredentials[key];
        });

        // if user requests not to store the password, cache it for the duration of the session
        if (!userSuppliedCredentials.rememberPassword) {
          _credentials.currentSessionCachedPassword = userSuppliedCredentials.password;
          userSuppliedCredentials.password = '';
        }
        saveMe[LOCAL_STORAGE_WORDPRESS_CREDENTIALS_KEY] = userSuppliedCredentials;

        chrome.storage.local.set(saveMe, function() {
          logger.log("saved login credentials for blog '" + _credentials.url + "'", "wordpress service");
        });
      },

      resetCredentials: function() {
        _credentials = {
          url: '',
          username: '',
          password: '',
          rememberPassword: false
        };

        var saveMe = {};

        saveMe[LOCAL_STORAGE_WORDPRESS_CREDENTIALS_KEY] = _credentials;

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
        // though the jquery xmlrpc library does have a base64 type, its implementation doesn't
        // leverage native btoa() and atob() methods. The code below overrides the default implementation
        
        $.xmlrpc.makeType('base64', true, function(value) {
          return btoa(value);
        }, function(text) {
          return atob(text);
        });

        var file = {
          name: fileName,
          type: fileType,
          bits: $.xmlrpc.force('base64', fileData),
          overwrite: false
        };

        callWordPress('wp.uploadFile', [file], onSuccessCallback, onErrorCallback);
      },
    };
  }
]);