angular.module('platen.services').factory('wordpress', function() {
  var POST_TYPE = 'post';
  var DEFAULT_BLOG_ID = 1;
  var DEFAULT_AUTHOR_ID = 1;
  var url = '';
  var username = '';
  var password = '';

  var wp = null;

  var initializeConnection = function() {
    if (!wp) {
      wp = new WordPress(url, username, password);
    }
  };

  return {
    setCredentials: function(blogUrl, user, pwd) {
      url = blogUrl;
      username = user;
      password = pwd;
    },

    areCredentialsSet: function() {
      if (url === '' || username === '' || password === '') {
        return false;
      }
      return true;
    },

    savePost: function(post) {
      if (!wp) return;

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

      } else {
        result = wp.newPost(DEFAULT_BLOG_ID, data);
        post.wordPressId = result;
      }
    }
  }
});