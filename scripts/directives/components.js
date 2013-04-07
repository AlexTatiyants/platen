angular.module('components', [])
.directive('editPanel', function() {
    return {
        restrict: 'E',
        templateUrl: 'views/edit-panel.html'
    }
})
.directive('previewPanel', function() {
    return {
        restrict: 'E',
        templateUrl: 'views/preview-panel.html'
    }
})
.directive('configPanel', function() {
    return {
        restrict: 'E',
        templateUrl: 'views/config-panel.html'
    }
})
;