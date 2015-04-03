var mozjpeg = require('imagemin-mozjpeg');
module.exports = function(grunt) {
  require('jit-grunt')(grunt);

  grunt.initConfig({
    less: {
      development: {
        options: {
          compress: false,
          yuicompress: false,
          optimization: 2
        },
        files: {
          "style.css": "style.less" // destination file and source file
        }
      }
    },
    imagemin: {                          // Task
      dynamic: {                         // Another target
        files: [{
          expand: true,                  // Enable dynamic expansion
          cwd: 'images/',                   // Src matches are relative to this path
          src: ['**/*.{png,jpg,gif}'],   // Actual patterns to match
          dest: 'images/'                  // Destination path prefix
        }]
      }
    },
    watch: {
      styles: {
        files: [
          'less/**/*.less',
          'style.less',
          'index.html'  
        ], // which files to watch
        tasks: ['less'],
        options: {
          nospawn: true
        }
      },
      images: {
        files: ['images/*.{png,jpg,gif}'],
        tasks: ['imagemin:single'],
        options: {
          spawn: false,
        }
      }
    }
  });

  grunt.registerTask('default', ['less', 'imagemin', 'watch']);
};