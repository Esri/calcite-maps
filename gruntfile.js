// ┌─────────────┐
// │ Gruntfile   │
// └─────────────┘
// Grunt wraps several tasks to ease development
// runs middleman, deploys the site, and tags new releases


// Javascript banner
var banner = '/* <%= pkg.title %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>\n' +
                '*  <%= pkg.homepage %>\n' +
                '*  Copyright (c) <%= grunt.template.today("yyyy") %> Environmental Systems Research Institute, Inc.\n' +
                '*  Apache 2.0 License */\n';

var currentVersion = require('./package.json').version;
var fs = require('fs');

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('./package.json'),

    // Running a development server
    'http-server': {
      'dev': {
        root: 'dist',
        port: 8888,
        host: '0.0.0.0',
        cache: 0,
        showDir : true,
        autoIndex: true,
        ext: 'html',
        runInBackground: true
      }
    },

    // Watch files
    'watch': {
      images: {
        files: ['app/images/**/*'],
        tasks: [
          'newer:imagemin',
          'copy'
        ]
      },
      libsass: {
        files: ['app/styles/**/*.scss'],
        tasks: [
          'sass'
        ]
      },
    },

    // Check Javascript for errors
    'jshint': {
      all: ['app/scripts/**/*.js']
    },

    // SCSS to CSS conversion
    'sass': {
      options: {
        includePaths: [
          './bower_components/bootstrap-sass-official/assets/stylesheets'
        ]
      },
      expanded: {
        files: {
          'dist/styles/calcite-bootstrap.css': 'app/styles/calcite-bootstrap.scss',
          'dist/styles/calcite-bootstrap-dark.css': 'app/styles/calcite-bootstrap-dark.scss',
          'dist/styles/calcite-patterns-bootstrap.css': 'app/styles/calcite-patterns-bootstrap.scss'
        }
      }

    },

    // Prefix CSS with browser specifics [last 2 browser versions]
    postcss: {
      options: {
        map: false,

        processors: [
          require('autoprefixer-core')({ browsers: 'last 2 versions' }),
        ]
      },
      dist: {
        src: 'dist/styles/*.css'
      }
    },

    // Minify CSS after construction
    'cssmin': {
      dist: {
        files: [{
          expand: true,
          cwd: 'dist/styles',
          src: ['*.css', '!*.min.css'],
          dest: 'dist/styles',
          ext: '.min.css'
        }]
      }
    },

    // Build minified Javascript file to dist
    'uglify': {
      options: {
        mangle: false,
        banner: banner
      },
      dist: {
        files: {
          'dist/scripts/main.min.js': ['app/scripts/main.js']
        }
      }
    },

    // Optimize images
    'imagemin': {
      dist: {
        files: [{
          expand: true,
          cwd: 'app/',
          src: ['images/**/*.{png,jpg,svg,ico}'],
          dest: 'dist/'
        }]
      }
    },




    // Build docs
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
    },



  });

  // Require all Grunt Tasks
  require('load-grunt-tasks')(grunt);
  grunt.loadNpmTasks('grunt-http-server');

  // Start server and watch
  grunt.registerTask('serve', [ 'http-server', 'watch' ]);

  // Build
  grunt.registerTask('build', [ 'assemble:dev', 'jshint', 'sass', 'postcss', 'cssmin' ]);

  // Default
  grunt.registerTask('default', [ 'build', 'serve' ]);

};

