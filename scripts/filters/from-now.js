angular.module('platen.filters').filter('fromNow', function() {
  return function(date) {
    if (date) {
      return moment(date).fromNow();
    } else {
      return "never";
    }
  };
});