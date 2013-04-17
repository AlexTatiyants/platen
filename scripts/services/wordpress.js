angular.module('platen.services').factory('wordpress', function() {
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

    credentialsSet: function() {
      if (url === '' || username === '' || password === '') {
        return false;
      }
      return true;
    }

    savePost: function(post) {
      var result;

      var data = {
        post_type: 'post',
        post_status: post.status,
        post_title: post.title,
        post_author: 1,
        post_excerpt: post.excerpt,
        post_content: post.content,
        post_format: ''
      };

      if (post.wordPressId) {
        result = wp.editPost(1, post.wordPressId, content);

      } else {
        result = wp.newPost(1, data);
        post.wordPressId = result;
      }
    }
  }
});