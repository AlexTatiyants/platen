angular.module('platen.services').factory('settings', function() {
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

  return {
    themes: THEMES,
    defaults: DEFAULTS,

    load: function(onCompletionCallback) {
      chrome.storage.local.get(LOCAL_STORAGE_SETTINGS_KEY, function(rawValue) {

        var settings = {};
        if (rawValue[LOCAL_STORAGE_SETTINGS_KEY]) {
          settings = rawValue[LOCAL_STORAGE_SETTINGS_KEY];
        }
        // for any settings not already configured, set them to the default value
        _.each(DEFAULTS, function(value, key, list) {
          if (!settings[key]) {
            settings[key] = value;
          }
        });
        onCompletionCallback(settings);
      });
    },

    save: function(settings, onCompletionCallback) {
      var saveMe = {};
      saveMe[LOCAL_STORAGE_SETTINGS_KEY] = settings;
      chrome.storage.local.set(saveMe, onCompletionCallback);
    }
  };
});