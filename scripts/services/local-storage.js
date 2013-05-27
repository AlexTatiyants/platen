angular.module('platen.services').factory('localStorage', ['logger', function(logger) {
  var asyncKeys = {};
  var _getKey, _setKey;
  var collectionName;

  // The purpose of this service is to abstract away a local storage mechanism used by the app.
  // This is needed because legacy packaged apps can only use localStorage, while new packaged apps can only use chrome.storage.

  // There are important differences between these two mechanisms:
  // 1. localStorage is synchronous, while chrome.storage is asynchronous   
  // 2. localStorage can only store strings, while chrome.storage can store objects

  if (chrome.storage) {
    logger.log("local storage configured for new pacakged apps", "LocalStorage service");
    // If chrome.storage is available, this means that we're running as a new packaged app. 
    // Chrome.storage calls are asynchronous, but we want to expose a common synchronous 
    // interface for setting and getting keys to the app. To do this, we will leverage an internal 
    // object to store keys in 
    _getKey = function(key) {
      return asyncKeys[key];
    };

    _setKey = function(key, value) {
      asyncKeys[key] = value;
      chrome.storage.sync.set({
        collectionName: asyncKeys
      });
      return value;
    };
  } else {
    logger.log("local storage configured for legacy pacakged apps", "LocalStorage service");
    // use localStorage by default (and for legacy packaged apps)
    _getKey = function(key) {
      return localStorage[collectionName + '.' + key];
    };

    _setKey = function(key, value) {
      localStorage[collectionName + '.' + key] = value;
      return value;
    };
  }

  return {
    getKey: _getKey,
    setKey: _setKey,

    initialize: function(colName, doAction) {
      collectionName = colName;

      if (chrome.sync) {
        chrome.storage.sync.get(collectionName, function(result) {
          asyncKeys = result;
          if (doAction) {
            doAction(asyncKeys);
          }
        });
      }
    }
  };
}]);