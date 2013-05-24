angular.module('platen.services').factory('settings', function() {
  var LOCAL_STORAGE_OPTIONS_KEY = 'platen.settings';

  // typography is measured in rems
  var BASE_FONT_SIZE = 1;
  var BASE_LINE_HEIGHT = 1.8;
  var settings = {};

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
    postHtmlLineHeight: 'postHtmlLineHeight',
    imageAlignment: 'imageAlignment'
  };

  var THEMES = {
    white: 'white',
    dark: 'dark',
    gray: 'gray'
  };


  chrome.storage.sync.get(LOCAL_STORAGE_OPTIONS_KEY, function(result) {
    settings = result;

    // initialize settings to defaults if empty
    _.each(settings, function(setting) {
      if (!settings[setting]) {
        settings[setting] = DEFAULTS[setting];
      }
    });
  });


  var getSetting = function(key) {
    return settings[key];
    // return localStorage[LOCAL_STORAGE_OPTIONS_KEY + '.' + key];
  };

  var saveSetting = function(key, value) {
    // localStorage[LOCAL_STORAGE_OPTIONS_KEY + '.' + key] = value;
    // return localStorage[LOCAL_STORAGE_OPTIONS_KEY + '.' + key];

    settings[key] = value;
    chrome.storage.sync.set({ LOCAL_STORAGE_OPTIONS_KEY: settings});
    return settings[key];
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
  };
});