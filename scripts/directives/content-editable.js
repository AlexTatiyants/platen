angular.module('platen.directives').directive('contenteditable', function() {
  return {
    restrict: 'A', // only activate on element attribute
    require: '?ngModel', // get a hold of NgModelController
    link: function(scope, element, attrs, ngModel) {
      if (!ngModel) return; // do nothing if no ng-model

      // Specify how UI should be updated
      ngModel.$render = function() {
        element.html(ngModel.$viewValue || '');
      };

      // Listen for change events to enable binding
      element.bind('blur keyup change', function() {
        scope.$apply(read);
      });
      read(); // initialize

      // Write data to the model

      function read() {
        var text = element.html()
        .replace(/<br>/gi, "\n")
        .replace(/<(?:.|\n)*?>/gm, '')
        .replace(/&lt;/gi, '<')
        .replace(/&gt;/gi, '>');
        ngModel.$setViewValue(text);
      }
    }
  };
});