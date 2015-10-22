// ┌─────────────┐
// │ Gruntfile   │
// └─────────────┘
// Grunt wraps several tasks to ease development
// runs middleman, deploys the site, and tags new releases

// Javascript banner
var banner = '/* <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>\n' +
                '*  <%= pkg.homepage %>\n' +
                '*  Copyright (c) <%= grunt.template.today("yyyy") %> Environmental Systems Research Institute, Inc.\n' +
                '*  Apache 2.0 License */\n';

var currentVersion = require('./package.json').version;

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    // Running a development server
    'http-server': {
      'dev': {
        root: 'docs/build',
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
      scripts: {
        files: ['lib/js/calcite-bootstrap.js'],
        tasks: [
          'concat:doc',
          'copy:doc',
          'jshint'
        ]
      },
      images: {
        files: ['lib/img/**/*'],
        tasks: [
          'newer:imagemin:doc',
          'copy:doc'
        ]
      },
      libsass: {
        files: [  
          'lib/sass/calcite/**/*', 
          'lib/sass/calcite/**/calcite*.scss',
          'docs/source/assets/css/**/*'
        ],
        tasks: [
          'sass',
          'copy:css',
          'sass:doc',
          'copy:doc'
        ]
      },
      fonts: {
        files: ['lib/fonts/**/*'],
        tasks: [
          'copy:fonts',
          'copy:fontsOpen',
          'copy:fontsDist',
          'copy:doc'
        ]
      },
      docs: {
        files: ['docs/source/**'],
        tasks: [
          'shell:acetate'
        ]
      }
    },

    // Check Javascript for errors
    'jshint': {
      all: ['lib/js/calcite-bootstrap.js']
    },

    // Build CSS files from SASS
    'sass': {

      options: {
        includePaths: ['./node_modules/bootstrap-sass/assets/stylesheets']
      },

      expanded: {
        files: {
          'dist/css/calcite-bootstrap.css': 'lib/sass/build-calcite-bootstrap.scss',
          'dist/css/calcite-bootstrap-dark.css': 'lib/sass/build-calcite-bootstrap-dark.scss',
          'dist/css/calcite-bootstrap-open.css': 'lib/sass/build-calcite-bootstrap-open.scss',
          'dist/css/calcite-bootstrap-dark-open.css': 'lib/sass/build-calcite-bootstrap-dark-open.scss'

        }
      },

      doc: {
        expand: true,
        cwd: 'docs/source/assets/css',
        src: ['**/*.scss'],
        dest: 'docs/build/assets/css',
        ext: '.css'
      },

      // homepage: {
      //   files: {
      //     'docs/build/assets/css/homepage.css': 'docs/source/assets/css/homepage.scss'
      //   }
      // }
    },

    // Create minified version of build css
    'cssmin': {
      target: {
        files: {
          'dist/css/calcite-bootstrap.min.css': ['dist/css/calcite-bootstrap.css'],
          'dist/css/calcite-bootstrap-dark.min.css': ['dist/css/calcite-bootstrap-dark.css'],
          'dist/css/calcite-bootstrap-open.min.css': ['dist/css/calcite-bootstrap-open.css'],
          'dist/css/calcite-bootstrap-dark-open.min.css': ['dist/css/calcite-bootstrap-dark-open.css']

        }
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
          'dist/js/calcite-bootstrap.min.js': ['lib/js/calcite-bootstrap.js']
        }
      }
    },

    // Copy libsass files to dist, doc assets to build
    'copy': {
      libsass: {
        expand: true,
        cwd: './lib/sass',
        src: ['calcite*.scss', 'calcite/**.*'],
        dest: 'dist/sass/'
      },
      doc: {
        expand: true,
        cwd: 'docs/source/',
        src: ['assets/img/**/*', 'assets/js/**/*'],
        dest: 'docs/build/'
      },
      fonts: {
        expand: true,
        flatten: true,
        cwd: './node_modules/bootstrap-sass/assets/',
        src: ['fonts/bootstrap/**/*'],
        dest: 'docs/build/assets/css/fonts/'
      },
      fontsOpen: {
        expand: true,
        flatten: true,
        cwd: './lib/fonts',
        src: ['**/*'],
        dest: 'dist/fonts/'
      },
      fontsDist: {
        expand: true,
        flatten: true,
        cwd: './node_modules/bootstrap-sass/assets/',
        src: ['fonts/bootstrap/**/*'],
        dest: 'dist/fonts/'
      },
      css: {
        expand: true,
        flatten: true,
        src: ['dist/css/**/*'],
        dest: 'docs/build/assets/css/'
      },
      changelog: {
        src: ['CHANGELOG.md'],
        dest: 'dist/'
      },
      bootstrapjsDist:{
        expand: true,
        flatten: true,
        cwd: './node_modules/bootstrap-sass/assets/',
        src: ['javascripts/bootstrap.min.js'],
        dest: 'dist/js/'
      },
      bootstrapjs:{
        expand: true,
        flatten: true,
        cwd: './node_modules/bootstrap-sass/assets/',
        src: ['javascripts/bootstrap.min.js'],
        dest: 'docs/build/assets/js/'
      }
    },

    // Copy Javascript to dist and doc
    // 'concat': {
    //   options: {
    //     banner: banner
    //   },
    //   dist: {
    //     files: {
    //       'dist/js/calcite-bootstrap.js': 'lib/js/calcite-bootstrap.js'
    //     }
    //   },
    //   doc: {
    //     files: {
    //       'docs/source/assets/js/libs/calcite-bootstrap.js': 'lib/js/calcite-bootstrap.js'
    //     }
    //   }
    // },

    // Optimize images and icons for dist and doc
    'imagemin': {
      dist: {
        files: [{
          expand: true,
          cwd: 'lib/',
          src: ['img/**/*.{png,jpg,svg,ico}'],
          dest: 'dist/'
        }]
      },
      doc: {
        files: [{
          expand: true,
          cwd: 'lib/',
          src: ['img/**/*.{png,jpg,svg,ico}'],
          dest: 'docs/source/assets/'
        }]
      }
    },

    // Make a zip file of the dist folder
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
          {expand: true, cwd: 'dist/', src: ['**/*.map'],  dest: 'files/calcite-bootstrap/' + currentVersion + '/', params: {ContentType: 'application/javascript'}},
          {expand: true, cwd: 'dist/', src: ['**/*.eot'],  dest: 'files/calcite-bootstrap/' + currentVersion + '/', params: {ContentType: 'application/vnd.ms-fontobject'}},
          {expand: true, cwd: 'dist/', src: ['**/*.woff'], dest: 'files/calcite-bootstrap/' + currentVersion + '/', params: {ContentType: 'application/font-woff'}},
          {expand: true, cwd: 'dist/', src: ['**/*.otf'],  dest: 'files/calcite-bootstrap/' + currentVersion + '/', params: {ContentType: 'application/font-sfnt'}},
          {expand: true, cwd: 'dist/', src: ['**/*.ttf'],  dest: 'files/calcite-bootstrap/' + currentVersion + '/', params: {ContentType: 'application/font-sfnt'}},
          {expand: true, cwd: 'dist/', src: ['**/*.json'], dest: 'files/calcite-bootstrap/', params: {ContentType: 'application/javascript'}},
          // Also upload to the 'latest' directory
          {expand: true, cwd: 'dist/', src: ['**/*.js'],   dest: 'files/calcite-bootstrap/latest/', params: {ContentType: 'application/javascript'}},
          {expand: true, cwd: 'dist/', src: ['**/*.css'],  dest: 'files/calcite-bootstrap/latest/', params: {ContentType: 'text/css'}},
          {expand: true, cwd: 'dist/', src: ['**/*.svg'],  dest: 'files/calcite-bootstrap/latest/', params: {ContentType: 'image/svg+xml'}},
          {expand: true, cwd: 'dist/', src: ['**/*.ico'],  dest: 'files/calcite-bootstrap/latest/', params: {ContentType: 'image/x-icon'}},
          {expand: true, cwd: 'dist/', src: ['**/*.jpg'],  dest: 'files/calcite-bootstrap/latest/', params: {ContentType: 'image/jpg'}},
          {expand: true, cwd: 'dist/', src: ['**/*.map'],  dest: 'files/calcite-bootstrap/latest/', params: {ContentType: 'application/javascript'}},
          {expand: true, cwd: 'dist/', src: ['**/*.eot'],  dest: 'files/calcite-bootstrap/latest/', params: {ContentType: 'application/vnd.ms-fontobject'}},
          {expand: true, cwd: 'dist/', src: ['**/*.woff'], dest: 'files/calcite-bootstrap/latest/', params: {ContentType: 'application/font-woff'}},
          {expand: true, cwd: 'dist/', src: ['**/*.otf'],  dest: 'files/calcite-bootstrap/latest/', params: {ContentType: 'application/font-sfnt'}},
          {expand: true, cwd: 'dist/', src: ['**/*.ttf'],  dest: 'files/calcite-bootstrap/latest/', params: {ContentType: 'application/font-sfnt'}},
          {expand: true, cwd: 'dist/', src: ['CHANGELOG.md'], dest: 'files/calcite-bootstrap/latest/', params: {ContentType: 'text/x-markdown'}}
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

    // bin scripts
    'shell': {
      guid: {
        command: 'bin/guid.js',    // Generate a unique id for a new section
      },
      deploy: {
        command: 'bin/deploy.js',  // Create a JSON record of current documentation
      },
      release: {
        command: 'bin/release.sh'  // Create GitHub release that includes dist
      },
      acetate: {
        command: 'npm run acetate' // build the docs site
      },
      a11y: {
        command: 'npm run a11y' // run accessibility tests
      }
    },

    // Deploy doc site to gh-pages
    'gh-pages': {
      options: {
        base: 'docs/build',
        repo: 'https://github.com/Esri/calcite-bootstrap.git'
      },
      src: ['**']
    },

    // Clean the build folder before rebuild
    clean: {
      dist: {
        src: [ 'dist/' ]
      },
    },

    // Runs tasks concurrently, speeding up Grunt
    'concurrent': {
      prepublish: [
        'scss',
        //'uglify',
        'copy',
        //'concat:dist',
        'newer:imagemin:dist'
      ]
    },


  });

  // load all grunt modules
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  // ┌─────────────┐
  // │ Grunt tasks │
  // └─────────────┘


  // Build sass
  grunt.registerTask('build:sass', [
    'clean',
    'scss',
    'copy:libsass',
    'copy:fonts',
    'copy:fontsOpen',
    'copy:bootstrapjsDist',
    'copy:bootstrapjs',
    'copy:changelog',
    'compress'

  ]);


  // Build sass
  grunt.registerTask('scss', [
    'sass',
    'cssmin'
  ]);

  // Run a development environment
  grunt.registerTask('dev', [
    'shell:acetate',
    'newer:imagemin:doc',
    //'concat:doc',
    'sass:doc',
    'copy:doc',
    'copy:fonts',
    'copy:fontsOpen',
    'copy:bootstrapjs',
    'copy:bootstrapjsDist',
    'http-server',
    'watch'
  ]);

  // Test calcite-bootstrap.js
  grunt.registerTask('test', [
    'jshint'
  ]);

  // Build a dist folder with all assets
  grunt.registerTask('prepublish', [
    'concurrent:prepublish'
  ]);

  // Upload files to s3
  grunt.registerTask('s3', [
    'prepublish',
    'shell:deploy',
    'prompt:aws',
    'aws_s3'
  ]);

  // Build and deploy doc site to github pages
  grunt.registerTask('deploy', 'Deploy documentation to github pages', function(n) {
    if (grunt.option('message')) {
      grunt.config.set('gh-pages.options.message', grunt.option('message'));
    }
    grunt.task.run([
      'shell:acetate',
      'newer:imagemin:doc',
      //'concat:doc',
      'sass:doc',
      'copy:doc',
      'copy:fonts',
      'copy:fontsOpen',
      'copy:bootstrapjs',
      'copy:bootstrapjsDist',
      'shell:deploy',
      'gh-pages'
    ]);
  });

  // Release a new version of the framework
  grunt.registerTask('release', [
    'prepublish',
    'shell:deploy',
    'compress',
    'shell:release',
    //'s3'
  ]);

  // Default task starts up a dev environment
  grunt.registerTask('default', ['prepublish', 'dev']);

};
