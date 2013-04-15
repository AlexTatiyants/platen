angular.module('platen.services').factory('logger', function() {

  var MAX_QUEUE_SIZE = 2;
  var offset = 0;
  var log = [];

  return {
    log: function(message, location) {

      if (log.length > MAX_QUEUE_SIZE) {
        console.log("removing log item");
        var item = log[offset];
        if (++offset * 2 >= log.length) {
          log = log.slice(offset);
          offset = 0;
        }
      }

      log.push({
        message: message,
        location: location
      });
    },

    getLogs: function() {
      return log;
    }
  }
});