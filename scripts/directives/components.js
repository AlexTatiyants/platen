'use strict';

angular.module('platen.directives').directive('editPanel', function() {
    return {
        restrict: 'E',
        templateUrl: 'views/edit-panel.html'
    }
});

angular.module('platen.directives').directive('previewPanel', function() {
    return {
        restrict: 'E',
        templateUrl: 'views/preview-panel.html'
    }
});

angular.module('platen.directives').directive('configPanel', function() {
    return {
        restrict: 'E',
        templateUrl: 'views/config-panel.html'
    }
});

angular.module('platen.directives').directive('statusPanel', function() {
    return {
        restrict: 'E',
        templateUrl: 'views/status-panel.html'
    }
});