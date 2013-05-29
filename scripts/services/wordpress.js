// angular.module('platen.services').factory('wordpress', ['$dialog', 'logger',
//   function($dialog, logger) {
//     var POST_TYPE = 'post';
//     var TAG_TYPE = 'post_tag';
//     var CATEGORY_TYPE = 'category';
//     var DEFAULT_BLOG_ID = 1;
//     var DEFAULT_AUTHOR_ID = 1;
//     var l = {};
//     var dialogOpen = false;

//     var LOCAL_STORAGE_WORDPRESS_CREDENTIALS_KEY = 'platen.wordPressCredentials';

//     var wp = null;

//     var getConfiguration = function(key) {
//       return storage.getKey(LOCAL_STORAGE_WORDPRESS_CREDENTIALS_KEY, key);
//     };

//     var setConfiguration = function(key, value) {
//       storage.setKey(LOCAL_STORAGE_WORDPRESS_CREDENTIALS_KEY, key, value);
//     };

//     var loadConfiguration = function() {
//       storage.initialize(function(config) {
//         l.url = getConfiguration("url") || '';
//         l.username = getConfiguration("username") || '';
//         l.password = getConfiguration("password") || '';
//         l.rememberCredentials = (getConfiguration("rememberCredentials") === 'true') ? true : false;

//         logger.log("loaded WordPress configuration", "wordpress service");
//       });
//     };

//     var saveCredentials = function(login) {
//       l.url = login.url;
//       l.username = login.username;
//       l.password = login.password;
//       l.rememberCredentials = login.rememberCredentials;

//       setConfiguration("url", l.url);
//       setConfiguration("username", l.username);
//       setConfiguration("rememberCredentials", l.rememberCredentials);

//       if (l.rememberCredentials) {
//         setConfiguration("password", l.password);
//       } else {
//         setConfiguration("password", "");
//       }

//       logger.log("saved login credentials for blog '" + login.url + "'", "wordpress service");
//     };

//     var initializeConnection = function(onSuccessCallback, onErrorCallback) {
//       if (l.url.trim() === '' || l.username.trim() === '' || l.password.trim() === '') {

//         // for some reason, dialog is sometimes instantiated twice. Check below is intended
//         // to prevent that from happenning
//         if (!dialogOpen) {
//           var d = $dialog.dialog({
//             backdrop: true,
//             keyboard: true,
//             backdropClick: true,
//             controller: 'LoginController',
//             templateUrl: 'views/modals/login.html'
//           });

//           dialogOpen = true;

//           d.open().then(function() {
//             dialogOpen = false;
//             createConnection(onSuccessCallback, onErrorCallback);
//           });
//         }

//       } else {
//         createConnection(onSuccessCallback, onErrorCallback);
//       }
//     };

//     var createConnection = function(onSuccessCallback, onErrorCallback) {
//       var fullUrl = l.url.replace(/\/$/, "") + "/xmlrpc.php";

//       try {
//         wp = new WordPress(fullUrl, l.username, l.password);
//         logger.log("logged into blog '" + l.url + "'", "wordpress service");
//       } catch (e) {
//         logger.log("unable to log into blog '" + l.url + "': " + e.message, "wordpress service");
//         onErrorCallback(e.message);
//       }
//       if (wp) {
//         try {
//           onSuccessCallback();
//         } catch (e) {
//           logger.log("error accessing WordPress blog '" + l.url + "': " + e.message, "wordpress service");
//           onErrorCallback(e.message);
//         }
//       }
//     };

//     var uploadPost = function(post, onSuccessCallback, onErrorCallback) {
//       var result;
//       var terms = {};

//       var data = {
//         post_type: POST_TYPE,
//         post_status: post.status,
//         post_title: post.title,
//         post_author: DEFAULT_AUTHOR_ID,
//         post_excerpt: post.excerpt,
//         post_content: post.content,
//         post_format: '',
//         terms_names: ''
//       };

//       if (post.tags && post.tags.trim() !== '') {
//         terms.post_tag = post.tags.replace(' ', '').split(',');
//       }

//       if (post.categories && post.categories.trim() !== '') {
//         terms.category = post.categories.replace(' ', '').split(',');
//       }

//       data.terms_names = terms;

//       if (post.wordPressId) {
//         result = wp.editPost(DEFAULT_BLOG_ID, post.wordPressId, data);
//         processResponse(result, post, function() {
//           logger.log("updated post '" + post.title + "' in blog '" + l.url + "'", "wordpress service");
//           onSuccessCallback();
//         }, onErrorCallback);

//       } else {
//         result = wp.newPost(DEFAULT_BLOG_ID, data);
//         processResponse(result, post, function() {
//           logger.log("created post '" + post.title + "' in blog '" + l.url + "'", "wordpress service");
//           onSuccessCallback(result.concat());
//         }, onErrorCallback);
//       }
//     };

//     var getTerms = function(termType, onSuccessCallback, onErrorCallback) {
//       var result = wp.getTerms(DEFAULT_BLOG_ID, termType, '');
//       if (result.faultCode) {
//         var err = result.faultString.concat();
//         logger.log("error for loading tags for blog '" + l.url + "': " + err, "wordpress service");
//         onErrorCallback(err);
//       } else {

//         // create a proper terms array
//         var terms = [],
//           term;

//         _.each(result, function(rawTerm) {
//           term = {};
//           term.count = rawTerm.count;
//           term.name = rawTerm.name.concat();
//           term.slug = rawTerm.slug.concat();
//           term.taxonomy = rawTerm.taxonomy.concat();
//           term.term_id = rawTerm.term_id.concat();
//           terms.push(term);

//         });

//         onSuccessCallback(terms);
//       }
//     };

//     var processResponse = function(result, post, onSuccessCallback, onErrorCallback) {
//       if (result.faultCode) {
//         var err = result.faultString.concat();
//         logger.log("error for post '" + post.title + "' in blog '" + l.url + "': " + err, "wordpress service");
//         onErrorCallback(err);
//       } else {
//         onSuccessCallback();
//       }
//     };

//     var uploadFile = function(file, onSuccessCallback, onErrorCallback) {
//       var result = wp.uploadFile(1, {
//         name: file.fileName,
//         type: file.fileType,
//         bits: new Base64(file.fileData),
//         overwrite: false
//       });

//       if (result.faultCode) {
//         var err = result.faultString.concat();
//         logger.log("unable to upload file '" + file.fileName + "' to blog '" + l.url + "': " + err, "wordpress service");
//         onErrorCallback(err);
//       } else {
//         logger.log("uploaded file '" + file.fileName + "' to blog '" + l.url, "wordpress service");
//         onSuccessCallback(result.id.concat(), result.url.concat());
//       }
//     };

//     var runCommand = function(runAction, args, onSuccessCallback, onErrorCallback) {
//       if (!wp) {
//         initializeConnection(function() {
//           runAction(args, onSuccessCallback, onErrorCallback);
//         }, onErrorCallback);
//       } else {
//         runAction(args, onSuccessCallback, onErrorCallback);
//       }
//     };

//     return {
//       login: l,

//       loadConfiguration: function() {
//         // loadConfiguration();
//       },

//       initialize: function(onSuccessCallback, onErrorCallback) {
//         if (!wp) {
//           initializeConnection(onSuccessCallback, onErrorCallback);
//         }
//       },

//       saveCredentials: function(login) {
//         saveCredentials(login);
//       },

//       resetCredentials: function() {
//         saveCredentials({
//           url: "",
//           username: "",
//           password: ""
//         });

//         wp = null;
//         logger.log("reset WordPress credentials", "wordpress service");
//       },

//       // getPost: function(postId, onSuccessCallback, onErrorCallback) {
//       //   if (!wp) initialize();
//       // },

//       savePost: function(post, onSuccessCallback, onErrorCallback) {
//         runCommand(uploadPost, post, onSuccessCallback, onErrorCallback);
//       },

//       getTags: function(onSuccessCallback, onErrorCallback) {
//         runCommand(getTerms, TAG_TYPE, onSuccessCallback, onErrorCallback);
//       },

//       getCategories: function(onSuccessCallback, onErrorCallback) {
//         runCommand(getTerms, CATEGORY_TYPE, onSuccessCallback, onErrorCallback);
//       },

//       uploadFile: function(fileName, fileType, fileData, onSuccessCallback, onErrorCallback) {
//         var args = {};
//         args.fileName = fileName;
//         args.fileType = fileType;
//         args.fileData = fileData;
//         runCommand(uploadFile, args, onSuccessCallback, onErrorCallback);
//       },
//     };
//   }
// ]);