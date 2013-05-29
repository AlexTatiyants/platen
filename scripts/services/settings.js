angular.module('platen.services').factory('settings', ['logger',
  function(logger) {
    var LOCAL_STORAGE_SETTINGS_KEY = 'platen.settings';

    // typography is measured in rems
    var BASE_FONT_SIZE = 1;
    var BASE_LINE_HEIGHT = 1.8;

    var DEFAULTS = {
      theme: 'white',
      postTitleFont: 'economica',
      postTitleFontSize: BASE_FONT_SIZE * 2,
      postBodyFont: 'inconsolata',
      postBodyFontSize: BASE_FONT_SIZE,
      postBodyLineHeight: BASE_LINE_HEIGHT,
      postHtmlFont: 'goudy',
      postHtmlFontSize: BASE_FONT_SIZE,
      postHtmlH1FontSize: BASE_FONT_SIZE * 2,
      postHtmlH2FontSize: BASE_FONT_SIZE * 1.5,
      postHtmlH3FontSize: BASE_FONT_SIZE * 1.3125,
      postHtmlH4FontSize: BASE_FONT_SIZE * 1.125,
      postHtmlH5FontSize: BASE_FONT_SIZE * 1,
      postHtmlH6FontSize: BASE_FONT_SIZE * 1,
      postHtmlLineHeight: BASE_LINE_HEIGHT,
      imageAlignment: 'center'
    };

    var THEMES = {
      white: 'white',
      dark: 'dark',
      gray: 'gray'
    };

    var _settings = DEFAULTS;

    return {
      settings: _settings,
      themes: THEMES,
      defaults: DEFAULTS,

      initialize: function(onCompletionCallback) {
        chrome.storage.local.get(LOCAL_STORAGE_SETTINGS_KEY, function(settings) {
          console.log("loaded settings", settings);
          // for any settings not already configured, set them to the default value
          _.each(DEFAULTS, function(value, key, list) {
            console.log("in settings.initialize(), setting for key " + key + " is " + settings[key]);
            if (!settings[key]) {
              settings[key] = value;
            }
          });

          onCompletionCallback(settings);
        });
      },

      save: function(foo, onCompletionCallback) {
        var saveMe = {};
        saveMe[LOCAL_STORAGE_SETTINGS_KEY] = foo;
        console.log("saving settings", saveMe);
        chrome.storage.local.set(saveMe);
      },

      clear: function() {
        chrome.storage.local.clear();
      },

      getAll: function(onCompletionCallback) {
        chrome.storage.local.get(null, onCompletionCallback);
      }
    };

    // var getInternalKey = function(key) {
    //   return LOCAL_STORAGE_SETTINGS_KEY + "." + key;
    // };

    // var setKey = function(key, value) {
    //   var setting = {};
    //   setting[getInternalKey(key)] = value;
    //   chrome.storage.local.set(setting);
    // };

    // return {
    //   getAllSettings: function(onCompletionCallback) {
    //     var keysToGet = [],
    //       response = {};

    //     _.each(DEFAULTS, function(value, key, list) {
    //       keysToGet.push(getInternalKey(key));
    //     });

    //     chrome.storage.local.get(keysToGet, function(values) {
    //       // if any of the settings aren't already stored, initialize them from defaults
    //       _.each(DEFAULTS, function(value, key, list) {
    //         if (values[getInternalKey(key)]) {
    //           response[key] = values[getInternalKey(key)];
    //         } else {
    //           response[key] = DEFAULTS[key];
    //           setKey(key, response[key]);
    //         }
    //       });
    //       onCompletionCallback(response);
    //     });
    //   },

    //   getSetting: function(key, onCompletionCallback) {
    //     var internalKey = getInternalKey(key);
    //     chrome.storage.local.get(internalKey, function(value) {
    //       if (_.isEmpty(value)) {
    //         value = DEFAULTS[key];
    //         setKey(key, value);
    //       }
    //       onCompletionCallback(value[internalKey]);
    //     });
    //   },

    //   setSetting: function(key, value, onCompletionCallback) {
    //     setKey(key, value);
    //     if (onCompletionCallback) {
    //       onCompletionCallback();
    //     }
    //   },

    //   resetSetting: function(key) {
    //     setKey(key, DEFAULTS[key]);
    //     if (onCompletionCallback) {
    //       onCompletionCallback();
    //     }
    //   },

    //   themes: THEMES,
    //   defaults: DEFAULTS
    // };
  }
]);