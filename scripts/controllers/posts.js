var PostsController = function($scope) {
    $scope.posts = [];

    $scope.removePost = function(post) {
    };

    $scope.loadPosts = function() {
        fs.root.getDirectory(POSTS_FOLDER_PATH, {}, function(dirEntry) {
            var dirReader = dirEntry.createReader();
            dirReader.readEntries(function(entries) {
                for (var i = 0; i < entries.length; i++) {
                    var entry = entries[i];
                    if (entry.isFile) {

                        console.log('File', entry);


                        fs.root.getFile(entry.fullPath, {}, function(fileEntry) {
                            fileEntry.file(function(file) {
                                var reader = new FileReader();
                                reader.onloadend = function(e) {
                                    var post = JSON.parse(this.result);

                                    $scope.posts.push(post);

                                    console.log(post);
                                };
                                reader.readAsText(file);
                            }, onError);
                        }, onError);


                    }
                }

            }, onError);
        }, onError);
    };
};

PostsController.$inject = ['$scope'];