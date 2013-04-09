'use strict';

var PostsController = function($scope) {

    $scope.posts = {};
    $scope.posts.count = 10;

};

PostsController.$inject = ['$scope'];