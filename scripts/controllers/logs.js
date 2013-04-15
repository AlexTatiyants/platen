var LogsController = function($scope, logger) {
  $scope.logs = logger.getLogs();
  console.log($scope.logs);
};

LogsController.$inject = ['$scope', 'logger'];