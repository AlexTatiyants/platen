angular.module('platen.services').factory('localStorage', ['logger',
  function(logger) {
    var cachedStorage = {};
    var PLATEN_COLLECTION_KEY = "platen";
    var _getKey, _setKey;

    // The purpose of this service is to abstract away a local storage mechanism used by the app.
    // This is needed because legacy packaged apps can only use localStorage, while new packaged apps can only use chrome.storage.

    // There are important differences between these two mechanisms:
    // 1. localStorage is synchronous, while chrome.storage is asynchronous   
    // 2. localStorage can only store strings, while chrome.storage can store objects

    var loadCachedStorage = function (onCompletionCallback) {
      chrome.storage.local.get(PLATEN_COLLECTION_KEY, function(result) {
        cachedStorage = result;
        logger.log("loaded cached storage", "localStorage service");
        onCompletionCallback(cachedStorage);
      });
    };

    if (chrome.storage) {
      logger.log("local storage configured for new pacakged apps", "localStorage service");



      // If chrome.storage is available, this means that we're running as a new packaged app. 
      // Chrome.storage calls are asynchronous, but we want to expose a common synchronous 
      // interface for setting and getting keys to the app. To do this, we will leverage an internal 
      // object to store keys in 
      _getKey = function(collection, key) {
        console.log("cache", cachedStorage);
        console.log("got key -- collection: " + collection + ", key: " + key + ", value: " + cachedStorage[collection + '.' + key]);
        return cachedStorage[collection + '.' + key];
      };

      _setKey = function(collection, key, value) {

        cachedStorage[collection + '.' + key] = value;
        console.log("set key -- collection: " + collection + ", key: " + key + ", value: " + cachedStorage[collection + '.' + key]);
        chrome.storage.local.set({
          PLATEN_COLLECTION_KEY: cachedStorage
        });
        return value;
      };
    } else {
      logger.log("local storage configured for legacy pacakged apps", "localStorage service");
      // use localStorage by default (and for legacy packaged apps)
      _getKey = function(collection, key) {
        return localStorage[collection + '.' + key];
      };

      _setKey = function(collection, key, value) {
        localStorage[collection + '.' + key] = value;
        return value;
      };
    }

    return {
      getKey: _getKey,
      setKey: _setKey,

      initialize: function(doAction) {
        if (cachedStorage) {
          doAction(cachedStorage);
        } else {
          loadCachedStorage(doAction);
        }
        
        // if (chrome.storage && !cachedStorage) {
        //   chrome.storage.local.get(PLATEN_COLLECTION_KEY, function(result) {
        //     cachedStorage = result;
        //     console.log("loaded collection", cachedStorage);
        //     if (doAction) {
        //       doAction(cachedStorage);
        //     }
        //   });
        // } else {
        //   if (doAction) {
            
        //   }
        // }
      }
    };
  }
]);