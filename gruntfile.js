/**
 * Only for Assemble.io - everything else is in gulpfile.js
 */

var fs = require('fs');
module.exports = function(grunt) {

  grunt.initConfig({
    assemble: {
      options: {
        layout: 'layout.hbs',
        layoutdir: 'app/layouts/',
        partials: 'app/partials/**/*.hbs',
        helpers: ['app/helpers/**/*.js' ]
      },
      dev: {
        options: {
          assets: 'dist/'
        },
        files: [{
          cwd: 'app/pages',
          dest: 'dist',
          expand: true,
          src: ['**/*.hbs', '**/*.md']
        }]
      },
      build: {
        options: {
          assets: 'calcite-bootstrap/'
        },
        files: [{
          cwd: 'app/pages',
          dest: 'dist',
          expand: true,
          src: ['**/*.hbs', '**/*.md']
        }]
      }
    }
  });

  // compuile
  grunt.registerTask('compile', ['assemble:dev']);

    // Require all grunt modules
  require('load-grunt-tasks')(grunt, {pattern: ['grunt-*', 'assemble']});

};