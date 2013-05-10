angular.module('platen.directives').directive('pastableImage', function() {
  return {

    restrict: 'A',
    require: '?ngModel',

    link: function($scope, $element, attrs, $ngModel) {

      $element.on('paste', function(event) {

        // first, check the clipboard to see if an image being pasted
        var pastedImage;
        _.each(event.originalEvent.clipboardData.items, function(item) {
          if (item.type === 'image/png') {
            pastedImage = item;
          }
        });

        if (pastedImage) {
          // if there is an image being pasted, we need to prevent the browswer from
          // pasting any html which may be contained in the clipboard
          event.preventDefault();
          $scope.$emit('imageInserted', pastedImage.getAsFile());
        }
      });
    }
  };
});