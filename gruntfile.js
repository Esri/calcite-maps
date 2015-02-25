/**
 * Only for Assemble.io - everything else is in gulpfile.js
 */

var fs = require('fs');
module.exports = function(grunt) {

  grunt.initConfig({
    assemble: {
      options: {
        layout: 'layout.hbs',
        layoutdir: 'site/source/layouts/',
        partials: 'site/source/partials/**/*.hbs',
        helpers: ['site/source/helpers/**/*.js' ]
      },
      dev: {
        options: {
          assets: 'site/build/'
        },
        files: [{
          cwd: 'site/source/pages',
          dest: 'site/build',
          expand: true,
          src: ['**/*.hbs', '**/*.md']
        }]
      },
      build: {
        options: {
          assets: 'calcite-bootstrap/'
        },
        files: [{
          cwd: 'site/source/pages',
          dest: 'site/build',
          expand: true,
          src: ['**/*.hbs', '**/*.md']
        }]
      }
    }
  });

  // Documentation Site Tasks
  grunt.registerTask('docs', ['assemble:dev']);

    // Require all grunt modules
  require('load-grunt-tasks')(grunt, {pattern: ['grunt-*', 'assemble']});

};