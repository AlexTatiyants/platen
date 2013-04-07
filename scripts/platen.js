/*! platen 2013-04-06 */
var EditorController = function(t) {
    t.post = {};
    t.update = function() {
        t.post.htmlContent = marked(t.post.rawContent);
        console.log(t.post);
    };
    $("#post-title").focus();
};

angular.module("components", []).directive("editPanel", function() {
    return {
        restrict: "E",
        templateUrl: "views/edit-panel.html"
    };
}).directive("previewPanel", function() {
    return {
        restrict: "E",
        templateUrl: "views/preview-panel.html"
    };
}).directive("configPanel", function() {
    return {
        restrict: "E",
        templateUrl: "views/config-panel.html"
    };
});

angular.module("platen", [ "components" ]);