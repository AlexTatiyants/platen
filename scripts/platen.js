/*! platen 2013-04-07 */
"use strict";

angular.module("platen.directives", []);

angular.module("platen", [ "platen.directives" ]);

"use strict";

var EditorController = function(e) {
    e.post = {};
    e.update = function() {
        e.post.htmlContent = marked(e.post.rawContent);
        console.log(e.post);
    };
    $("#post-title").focus();
};

EditorController.$inject = [ "$scope" ];

"use strict";

angular.module("platen.directives").directive("editPanel", function() {
    return {
        restrict: "E",
        templateUrl: "views/edit-panel.html"
    };
});

angular.module("platen.directives").directive("previewPanel", function() {
    return {
        restrict: "E",
        templateUrl: "views/preview-panel.html"
    };
});

angular.module("platen.directives").directive("configPanel", function() {
    return {
        restrict: "E",
        templateUrl: "views/config-panel.html"
    };
});