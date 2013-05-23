module.exports = function(grunt) {
  var platen_scripts = ['scripts/app.js', 'scripts/*/*.js'];

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    uglify: {
      dev: {
        options: {
          banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
          compress: false,
          mangle: false,
          beautify: true
        },
        build: {
          files: {
            'scripts/platen.js': platen_scripts
          }
        }
      },

      prod: {
        options: {
          banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
          compress: true,
          mangle: true,
          beautify: false
        },
        build: {
          files: {
            'scripts/platen.js': platen_scripts
          }
        }
      }
    },

    jshint: {
      files: {
        src: platen_scripts
      }
    },

    watch: {
      scripts: {
        files: platen_scripts,
        tasks: ['uglify:dev'],
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
          "styles/themes/gray-theme.css": "styles/themes/gray-theme.less",
          "styles/themes/dark-theme.css": "styles/themes/dark-theme.less"
        }
      },
      production: {
        options: {
          yuicompress: false
        },
        files: {
          "styles/themes/gray-theme.css": "styles/themes/gray-theme.less",
          "styles/themes/white-theme.css": "styles/themes/white-theme.less",
          "styles/themes/dark-theme.css": "styles/themes/dark-theme.less"
        }
      }
    },
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-zip');

  // Default task(s).
  grunt.registerTask('default', ['watch']);

};