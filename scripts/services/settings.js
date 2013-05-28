angular.module('platen.services').factory('settings', ['localStorage', 'logger',
  function(localStorage, logger) {
    var LOCAL_STORAGE_SETTINGS_KEY = 'platen.settings';
    var storage = localStorage;

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

    return {
      initialize: function(onSuccessCallback) {
        // initialize settings to defaults if empty
        storage.initialize(function(settings) {
          _.each(SETTINGS, function(setting) {
            if (!settings[setting]) {
              settings[setting] = DEFAULTS[setting];
              storage.setKey(LOCAL_STORAGE_SETTINGS_KEY, setting, settings[setting]);
            }
          });
          logger.log("loaded settings", "settings service");
          onSuccessCallback(settings);
        });
      },

      getSetting: function(key) {
        return storage.getKey(LOCAL_STORAGE_SETTINGS_KEY, key);
      },

      setSetting: function(key, value) {
        return storage.setKey(LOCAL_STORAGE_SETTINGS_KEY, key, value);
      },

      // theme: settings.theme,
      keys: SETTINGS,
      themes: THEMES,
      defaults: DEFAULTS
    };
  }
]);