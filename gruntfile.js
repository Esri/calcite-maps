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
        port: 9000,
        host: '0.0.0.0',
        cache: 0,
        showDir : true,
        autoIndex: true,
        ext: 'html',
        runInBackground: true,
        livereload: true
      }
    },

    // Watch files
    'watch': {
      options: {
        livereload: true
      },
      html: {
        files: ['app/**/*.hbs'],
        tasks: [
          'assemble:dist'
        ]
      },
      images: {
        files: ['app/images/**/*'],
        tasks: [
          'imagemin'
        ]
      },
      scripts: {
        files: ['app/scripts/**/*.js'],
        tasks: [
          'jshint',
          'uglify'
        ]
      },
      libsass: {
        files: ['app/styles/**/*.scss'],
        tasks: [
          'sass'
        ]
      },
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
        map: true,

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

    // Check Javascript for errors
    'jshint': {
      all: ['app/scripts/**/*.js']
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

    // Create zip release
    'compress': {
      main: {
        options: {
          archive: 'calcite-bootstrap.zip'
        },
        files: [
          {
            src: ['dist/**', '!dist/__MACOSX'],
            dest: './'
          },
        ]
      }
    },

     // Copy libsass files to dist, doc assets to build
    'copy': {
      extras: {
        expand: true,
        flatten: true,
        src: [ 'app/extras/*' ],
        dest: 'dist/'
      },
      scripts: {
        expand: true,
        flatten: true,
        src: [ 'app/scripts/**/*.js' ],
        dest: 'dist/scripts/'
      },
      fonts: {
        expand: true,
        flatten: true,
        cwd: './bower_components/bootstrap-sass-official/assets/',
        src: ['fonts/bootstrap/**/*'],
        dest: 'dist/styles/fonts/'
      },
      changelog: {
        src: ['CHANGELOG.md'],
        dest: 'dist/'
      }
    },

    // Upload dist folder to s3
    'aws_s3': {
      options: {
        region: 'us-west-1',
        bucket: 'patterns.esri.com',
        endpoint: 'https://s3-us-west-1.amazonaws.com',
        access: 'public-read',
        gzip: true
      },
      production: {
        files: [
          // Manually set content type (plugin was setting incorrectly).
          {expand: true, cwd: 'dist/', src: ['**/*.js'],   dest: 'files/calcite-bootstrap/' + currentVersion + '/', params: {ContentType: 'application/javascript'}},
          {expand: true, cwd: 'dist/', src: ['**/*.css'],  dest: 'files/calcite-bootstrap/' + currentVersion + '/', params: {ContentType: 'text/css'}},
          {expand: true, cwd: 'dist/', src: ['**/*.svg'],  dest: 'files/calcite-bootstrap/' + currentVersion + '/', params: {ContentType: 'image/svg+xml'}},
          {expand: true, cwd: 'dist/', src: ['**/*.ico'],  dest: 'files/calcite-bootstrap/' + currentVersion + '/', params: {ContentType: 'image/x-icon'}},
          {expand: true, cwd: 'dist/', src: ['**/*.jpg'],  dest: 'files/calcite-bootstrap/' + currentVersion + '/', params: {ContentType: 'image/jpg'}},
          {expand: true, cwd: 'dist/', src: ['**/*.eot'],  dest: 'files/calcite-bootstrap/' + currentVersion + '/', params: {ContentType: 'application/vnd.ms-fontobject'}},
          {expand: true, cwd: 'dist/', src: ['**/*.woff'], dest: 'files/calcite-bootstrap/' + currentVersion + '/', params: {ContentType: 'application/font-woff'}},
          {expand: true, cwd: 'dist/', src: ['**/*.otf'],  dest: 'files/calcite-bootstrap/' + currentVersion + '/', params: {ContentType: 'application/font-sfnt'}},
          {expand: true, cwd: 'dist/', src: ['**/*.ttf'],  dest: 'files/calcite-bootstrap/' + currentVersion + '/', params: {ContentType: 'application/font-sfnt'}},
          // Also upload to the 'latest' directory
          {expand: true, cwd: 'dist/', src: ['**/*.js'],   dest: 'files/calcite-bootstrap/latest/', params: {ContentType: 'application/javascript'}},
          {expand: true, cwd: 'dist/', src: ['**/*.css'],  dest: 'files/calcite-bootstrap/latest/', params: {ContentType: 'text/css'}},
          {expand: true, cwd: 'dist/', src: ['**/*.svg'],  dest: 'files/calcite-bootstrap/latest/', params: {ContentType: 'image/svg+xml'}},
          {expand: true, cwd: 'dist/', src: ['**/*.ico'],  dest: 'files/calcite-bootstrap/latest/', params: {ContentType: 'image/x-icon'}},
          {expand: true, cwd: 'dist/', src: ['**/*.jpg'],  dest: 'files/calcite-bootstrap/latest/', params: {ContentType: 'image/jpg'}},
          {expand: true, cwd: 'dist/', src: ['**/*.eot'],  dest: 'files/calcite-bootstrap/latest/', params: {ContentType: 'application/vnd.ms-fontobject'}},
          {expand: true, cwd: 'dist/', src: ['**/*.woff'], dest: 'files/calcite-bootstrap/latest/', params: {ContentType: 'application/font-woff'}},
          {expand: true, cwd: 'dist/', src: ['**/*.otf'],  dest: 'files/calcite-bootstrap/latest/', params: {ContentType: 'application/font-sfnt'}},
          {expand: true, cwd: 'dist/', src: ['**/*.ttf'],  dest: 'files/calcite-bootstrap/latest/', params: {ContentType: 'application/font-sfnt'}}
        ]
      }
    },

    // Ask for AWS ID and Key
    'prompt': {
      aws: {
        options: {
          questions: [
            {
              config: 'aws_s3.options.accessKeyId',
              type: 'input',
              message: 'AWS Access ID:'
            },
            {
              config: 'aws_s3.options.secretAccessKey',
              type: 'input',
              message: 'AWS Secret Access Key:'
            }
          ]
        }
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
      dist: {
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

    // Clean the build folder before rebuild
    clean: {
      dist: {
        src: [ 'dist/' ]
      },
    },

    // Concat Bower dependencies
    concat: {
      options: {
        separator: '',
      },
      plugins: {
        startFolder: 'bower_components/bootstrap-sass-official/assets',
        src: [
          '<%= concat.plugins.startFolder %>/javascripts/bootstrap/affix.js',
          '<%= concat.plugins.startFolder %>/javascripts/bootstrap/alert.js',
          '<%= concat.plugins.startFolder %>/javascripts/bootstrap/dropdown.js',
          '<%= concat.plugins.startFolder %>/javascripts/bootstrap/tooltip.js',
          '<%= concat.plugins.startFolder %>/javascripts/bootstrap/modal.js',
          '<%= concat.plugins.startFolder %>/javascripts/bootstrap/transition.js',
          '<%= concat.plugins.startFolder %>/javascripts/bootstrap/button.js',
          '<%= concat.plugins.startFolder %>/javascripts/bootstrap/popover.js',
          '<%= concat.plugins.startFolder %>/javascripts/bootstrap/carousel.js',
          '<%= concat.plugins.startFolder %>/javascripts/bootstrap/scrollspy.js',
          '<%= concat.plugins.startFolder %>/javascripts/bootstrap/collapse.js',
          '<%= concat.plugins.startFolder %>/javascripts/bootstrap/tab.js'
        ],
        dest: 'dist/scripts/plugins.js',
      },
      head: {
        startFolder: './bower_components',
        src: [
          '<%= concat.head.startFolder %>/modernizr/modernizr.js',
        ],
        dest: 'dist/scripts/head.js',
      },
      vendor: {
        startFolder: './bower_components',
        src: [
          '<%= concat.vendor.startFolder %>/jquery/dist/jquery.js',
        ],
        dest: 'dist/scripts/vendor.js',
      }
    },


    // Runs tasks concurrently, speeding up Grunt
    'concurrent': {
      prepublish: [
        'sass',
        'cssmin',
        'jshint',
        'newer:imagemin',
        'uglify',
        'concat',
        'copy'
      ]
    }

  });

  // Require all Grunt Tasks
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  // Start server and watch
  grunt.registerTask('serve', [ 'http-server', 'watch' ]);

  // Build
  grunt.registerTask('build', [ 'clean', 'assemble:dist', 'concurrent', 'postcss' ]);

  // Release
  grunt.registerTask('release', [ 'compress' ]);

  // Publish files to S3
  grunt.registerTask('publish', [
    'build',
    //'shell:deploy',
    'prompt:aws',
    'aws_s3'
  ]);

  // Default
  grunt.registerTask('default', [ 'build', 'serve' ]);

};

