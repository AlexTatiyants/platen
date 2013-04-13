angular.module('platen.services').factory('htmlizer', function() {
  return {
    deHTMLizeText: function(html) {
      // contenteditable produces odd html which needs to be converted to proper text
      // in particular, the following happens:
      // first line of text is left as text
      // all consequent lines are wrapped in <div> tags
      // empty lines are converted into <div><br></div>
      return html.replace(/<div><br><\/div>/gi, '\n')
        .replace(/<div>/gi, '\n')
        .replace(/<\/div>/gi, '')
        .replace(/&lt;/gi, '<')
        .replace(/&gt;/gi, '>');
    },
    HTMLizeText: function(text) {
      return text.replace(/\n/gi, '<br>');
    }
  }
});