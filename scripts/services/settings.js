angular.module('platen.services').factory('settings', function() {
  var LOCAL_STORAGE_OPTIONS_KEY = 'platen.settings';

  var SETTINGS = {
    theme: 'theme',
    postTitleFont: 'postTitleFont',
    postTitleFontSize: 'postTitleFontSize',
    postBodyFont: 'postBodyFont',
    postBodyFontSize: 'postBodyFontSize',
    postHtmlFont: 'postHtmlFont',
    postHtmlFontSize: 'postHtmlFontSize'
  };

  var DEFAULTS = {
    theme: 'white',
    postTitleFont: 'economica',
    postTitleFontSize: 30,
    postBodyFont: 'inconsolata',
    postBodyFontSize: 16,
    postHtmlFont: 'goudy',
    postHtmlFontSize: 16
  };

  var THEMES = {
    white: 'white',
    dark: 'dark'
  };

  var getSetting = function(key) {
    return localStorage[LOCAL_STORAGE_OPTIONS_KEY + '.' + key];
  }

  var saveSetting = function(key, value) {
    localStorage[LOCAL_STORAGE_OPTIONS_KEY + '.' + key] = value;
  };

  // initialize settings to defaults if empty
  _.each(SETTINGS, function(setting) {
    if (!getSetting(setting)) {
      saveSetting(setting, DEFAULTS[setting]);
    }
  });

  return {
    getSetting: function(key) {
      return getSetting(key);
    },

    setSetting: function(key, value) {
      saveSetting(key, value);
    },

    THEME: SETTINGS.theme,
    keys: SETTINGS
  }
});