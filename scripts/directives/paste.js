angular.module('platen.directives').directive('paste', function() {
  return {

    restrict: 'A',
    require: '?ngModel',

    link: function($scope, $element, attrs, $ngModel) {

      $element.on('paste', function(event) {
        var item = event.originalEvent.clipboardData.items[0];

        if (!item || item.type !== 'image/png') return;

        $scope.$emit('imageInserted', item.getAsFile());
      });
    }
  };
});