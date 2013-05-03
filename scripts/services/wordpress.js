angular.module('platen.services').factory('wordpress', ['$dialog', 'logger', function($dialog, logger) {
  var POST_TYPE = 'post';
  var TAG_TYPE = 'post_tag';
  var CATEGORY_TYPE = 'category';
  var DEFAULT_BLOG_ID = 1;
  var DEFAULT_AUTHOR_ID = 1;

  var l = {
    url: localStorage['url'] || '',
    username: localStorage['username'] || '',
    password: localStorage['password'] || '',
    shouldStoreCredentials: false
  }

  var wp = null;

  var initialize = function(onSuccessCallback, onErrorCallback) {
    if (l.url.trim() === '' || l.username.trim() === '' || l.password.trim() === '') {
      var d = $dialog.dialog({
        backdrop: true,
        keyboard: true,
        backdropClick: true,
        controller: 'LoginController',
        templateUrl: 'views/modals/login.html'
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
        localStorage['url'] = l.url;
        localStorage['username'] = l.username;
        localStorage['password'] = l.password;
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
      post_format: '',
      terms_names: ''
    };

    if (post.tags.trim() !== '') {
      terms.post_tag = post.tags.replace(' ', '').split(',');
    }

    if (post.categories.trim() !== '') {
      terms.category = post.categories.replace(' ', '').split(',');
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
    var result = wp.getTerms(DEFAULT_BLOG_ID, termType, '');
    if (result.faultCode) {
      var err = result.faultString.concat()
      logger.log("error for loading tags for blog '" + l.url + "': " + err, "wordpress service");
      onErrorCallback(err);
    } else {

      // create a proper terms array
      var terms = [],
        term;

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

    resetCredentials: function() {
      localStorage['url'] = '';
      localStorage['username'] = '';
      localStorage['password'] = '';

      l.url = '';
      l.username = '';
      l.password = '';
      logger.log("reset credentials", "wordpress service");
    },

    // getPost: function(postId, onSuccessCallback, onErrorCallback) {
    //   if (!wp) initialize();
    // },

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
    },

  }
}]);