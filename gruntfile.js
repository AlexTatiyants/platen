  module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
        compress: false,
        beautify: true
      },
      build: {
        files: {
          'scripts/platen.js': ['scripts/app.js', 'scripts/*/*.js']
        }
      }
    },
    watch: {
      scripts: {
        files: ['scripts/**/*.js'],
        tasks: ['uglify'],
        options: {
          nospawn: true
        }
      },
      styles: {
        files: ['styles/**/*.less'],
        tasks: ['less']
      }
    },
    less: {
      development: {
        files: {
          "styles/themes/white-theme.css": "styles/themes/white-theme.less",
          "styles/themes/dark-theme.css": "styles/themes/dark-theme.less"
        }
      },
      production: {
        options: {
          yuicompress: false
        },
        files: {
          "styles/themes/white-theme.css": "styles/themes/white-theme.less",
          "styles/themes/dark-theme.css": "styles/themes/dark-theme.less"
        }
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-less');

  // Default task(s).
  grunt.registerTask('default', ['watch']);

};