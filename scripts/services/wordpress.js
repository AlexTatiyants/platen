angular.module('platen.services').factory('wordpress', ['$dialog', 'logger', function($dialog, logger) {
  var POST_TYPE = 'post';
  var DEFAULT_BLOG_ID = 1;
  var DEFAULT_AUTHOR_ID = 1;

  var l = {
    url: 'http://localhost/wordpress/xmlrpc.php',
    username: 'admin',
    password: 'admin'
  }

  var wp = null;

  var initializeConnection = function(onSuccessCallback) {
    var d = $dialog.dialog({
      backdrop: true,
      keyboard: true,
      backdropClick: true,
      controller: 'LoginController',
      templateUrl: 'views/pages/login.html'
    });

    d.open().then(function() {
      debugger;
      wp = new WordPress(l.url, l.username, l.password);
      logger.log("logged into blog '" + l.url, "in wordpress service");
      onSuccessCallback;
    })
  };

  return {
    login: l,

    getPost: function(postId) {
      if (!wp) initializeConnection();
    },

    savePost: function(post) {
      if (!wp) {
        initializeConnection(function() {
          var result;

          var data = {
            post_type: POST_TYPE,
            post_status: post.status,
            post_title: post.title,
            post_author: DEFAULT_AUTHOR_ID,
            post_excerpt: post.excerpt,
            post_content: post.content,
            post_format: ''
          };

          if (post.wordPressId) {
            result = wp.editPost(DEFAULT_BLOG_ID, post.wordPressId, content);
            logger.log("updated post '" + post.title + "' in blog '" + l.url + "'", "in wordpress service");
          } else {
            result = wp.newPost(DEFAULT_BLOG_ID, data);
            post.wordPressId = result;
            logger.log("created post '" + post.title + "' in blog '" + l.url + "'", "in wordpress service");
          }
        });
      }
    }
  }
}]);