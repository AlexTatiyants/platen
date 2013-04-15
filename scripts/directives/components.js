angular.module('platen.directives').directive('editPanel', function() {
    return {
        restrict: 'E',
        templateUrl: 'views/partials/edit-panel.html'
    }
});

angular.module('platen.directives').directive('metadataPanel', function() {
    return {
        restrict: 'E',
        templateUrl: 'views/partials/metadata-panel.html'
    }
});

angular.module('platen.directives').directive('statusPanel', function() {
    return {
        restrict: 'E',
        templateUrl: 'views/partials/status-panel.html'
    }
});

angular.module('platen.directives').directive('config-menu', function() {
    return {
        restrict: 'E',
        templateUrl: 'views/partials/config-menu.html'
    }
});

