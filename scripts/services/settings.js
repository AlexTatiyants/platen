angular.module('platen.services').factory('settings', function() {
  var LOCAL_STORAGE_OPTIONS_KEY = 'platen.settings';
  var SETTING_THEME = 'theme';

  var THEMES = {
    white: 'white',
    dark: 'dark'
  };
  var AUTOSAVE_INTERVAL = 12000;

  var getSetting = function(key) {
    return localStorage[LOCAL_STORAGE_OPTIONS_KEY + '.' + key];
  }

  var saveSetting = function(key, value) {
    localStorage[LOCAL_STORAGE_OPTIONS_KEY + '.' + key] = value;
  };

  if (!getSetting(SETTING_THEME)) {
    saveSetting(SETTING_THEME, THEMES.white);
  }

  return {
    getSetting: function(key) {
      return getSetting(key);
    },

    setSetting: function(key, value) {
      saveSetting(key, value);
    },

    THEME: SETTING_THEME
  }
});