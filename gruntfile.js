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
          'scripts/platen.js': ['scripts/*/*.js', 'scripts/app.js']
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
      } 
    },
    less: {   
      development: {
        files: {
          "styles/style.css": "styles/style.less"
        }
      },
      production: {
        options: {
          yuicompress: true
        },
        files: {
          "styles/style.css": "styles/style.less"
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