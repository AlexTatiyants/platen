angular.module('platen.directives').directive('blur', function() {
  return function(scope, elem, attrs) {
    elem.bind('blur', function() {
      scope.$apply(attrs.ngBlur);
    });
  };
});