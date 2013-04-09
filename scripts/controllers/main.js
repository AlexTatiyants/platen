'use strict';

var MainController = function($scope, $location) {

    $scope.getPosts = function() {
        console.log("in posts");
        $location.path('posts/');
    };

    $scope.getPost = function(id) {
        console.log("in post " + id);
        $location.path('posts/' + id);
    };

};

MainController.$inject = ['$scope', '$location'];