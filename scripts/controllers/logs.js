var LogsController = function($scope, logger) {
  $scope.logs = logger.getLogs();
};

LogsController.$inject = ['$scope', 'logger'];