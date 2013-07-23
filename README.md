Platen is a Markdown Wordpress Editor, built as a Chrome Web app.

See this [blog post][blog-post] for more details.

## Building ##

You need to install [grunt][grunt] to be able to build platen.

Once grunt is installed, you can use:

    grunt uglify

to generate `platen.js` for the first time. After that, you can use:

    grunt watch

to constantly watch the js files, and then build the `platen.js` as
and when they change.

### Generating packaged ZIP file ###

To generate a fully packaged `platen.zip` file for distribution, you can run

    grunt zip

[blog-post]: http://tatiyants.com/introducing-platen-markdown-wordpress-editor-2/
[grunt]: http://gruntjs.com/
