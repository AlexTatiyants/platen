angular.module('platen.services').factory('settings', function() {
  var LOCAL_STORAGE_OPTIONS_KEY = 'platen.settings';

  var SETTINGS = {
    theme: 'theme',
    postTitleFont: 'postTitleFont',
    postTitleFontSize: 'postTitleFontSize',
    postBodyFont: 'postBodyFont',
    postBodyFontSize: 'postBodyFontSize',
    postBodyLineHeight: 'postBodyLineHeight',
    postHtmlFont: 'postHtmlFont',
    postHtmlFontSize: 'postHtmlFontSize',
    postHtmlH1FontSize: 'postHtmlH1FontSize',
    postHtmlH2FontSize: 'postHtmlH2FontSize',
    postHtmlH3FontSize: 'postHtmlH3FontSize',
    postHtmlH4FontSize: 'postHtmlH4FontSize',
    postHtmlH5FontSize: 'postHtmlH5FontSize',
    postHtmlH6FontSize: 'postHtmlH6FontSize',
    postHtmlLineHeight: 'postHtmlLineHeight'
  };

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
    postHtmlLineHeight: BASE_LINE_HEIGHT
  };

  var THEMES = {
    white: 'white',
    dark: 'dark',
    gray: 'gray'
  };

  var getSetting = function(key) {
    return localStorage[LOCAL_STORAGE_OPTIONS_KEY + '.' + key];
  }

  var saveSetting = function(key, value) {
    localStorage[LOCAL_STORAGE_OPTIONS_KEY + '.' + key] = value;
    return localStorage[LOCAL_STORAGE_OPTIONS_KEY + '.' + key];
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
      return saveSetting(key, value);
    },


    THEME: SETTINGS.theme,
    keys: SETTINGS,
    themes: THEMES,
    defaults: DEFAULTS
  }
});