angular.module('platen.directives').directive('editPanel', function() {
    return {
        restrict: 'E',
        templateUrl: 'views/partials/edit-panel.html'
    }
});

angular.module('platen.directives').directive('previewPanel', function() {
    return {
        restrict: 'E',
        templateUrl: 'views/partials/preview-panel.html'
    }
});

angular.module('platen.directives').directive('configPanel', function() {
    return {
        restrict: 'E',
        templateUrl: 'views/partials/config-panel.html'
    }
});

angular.module('platen.directives').directive('statusPanel', function() {
    return {
        restrict: 'E',
        templateUrl: 'views/partials/status-panel.html'
    }
});