// ┌─────────────┐
// │ Gruntfile   │
// └─────────────┘
// Grunt wraps several tasks to ease development

// Javascript banner
var banner = '/* <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>\n' +
				'*  <%= pkg.homepage %>\n' +
				'*  Copyright (c) <%= grunt.template.today("yyyy") %> Environmental Systems Research Institute, Inc.\n' +
				'*  Apache 2.0 License */\n';

module.exports = function (grunt) {  
	require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);  
	// Project configuration.  
	grunt.initConfig({  
		pkg: grunt.file.readJSON('package.json'), 

		// Build CSS from SASS
		'sass': {
			options: {
				includePaths: ['./node_modules/bootstrap-sass/assets/stylesheets', 
												'./node_modules/calcite-bootstrap/dist/sass']
			},
			expanded: {
				files: {
					'dist/css/calcite-maps.css': 'lib/sass/build.scss',
					'dist/css/layouts/inline-zoom.css': 'lib/sass/layouts/inline-zoom.scss',
					'dist/css/layouts/jumbo-title.css': 'lib/sass/layouts/jumbo-title.scss',
					'dist/css/support/arcgis-3.x.css': 'lib/sass/support/arcgis-3.x.scss',
					'dist/css/support/arcgis-4.x.css': 'lib/sass/support/arcgis-4.x.scss',
					'dist/css/support/esri-leaflet.css': 'lib/sass/support/esri-leaflet.scss'
				}
			}
		}, 

		// Minify CSS
		cssmin: {  
			target: {
				options: {
					banner: banner
				},
				files: {
					'dist/css/calcite-maps.min.css': ['dist/css/calcite-maps.css'],
					'dist/css/calcite-maps-arcgis-3.x.min.css': ['dist/css/calcite-maps.css', 'dist/css/layouts/inline-zoom.css', 'dist/css/layouts/jumbo-title.css', 'dist/css/support/arcgis-3.x.css'],
					'dist/css/calcite-maps-arcgis-4.x.min.css': ['dist/css/calcite-maps.css', 'dist/css/layouts/inline-zoom.css', 'dist/css/layouts/jumbo-title.css','dist/css/support/arcgis-4.x.css'],
					'dist/css/calcite-maps-esri-leaflet.min.css': ['dist/css/calcite-maps.css', 'dist/css/layouts/inline-zoom.css', 'dist/css/layouts/jumbo-title.css','dist/css/support/esri-leaflet.css']
				}
			}
		},

		// Uglify JS
		'uglify': {
			options: {
					mangle: false,
					banner: banner
			},
			dist: {
				files: {
					'dist/js/dojo/calcitemaps.js': ['lib/js/dojo/calcitemaps.js'],
					'dist/js/jquery/calcitemaps.js': ['lib/js/jquery/calcitemaps.js']
				}
			}
		},

		// Copy to dist
		'copy': {
			bootstrapfonts: {
				expand: true,
				flatten: true,
				src: ['./node_modules/bootstrap-sass/assets/fonts/bootstrap/*'],
				dest: './dist/fonts/bootstrap/'
			},
			calcitefonts: {
				expand: true,
				flatten: true,
				src: ['./lib/fonts/calcite/*'],
				dest: './dist/fonts/calcite/'
			},
			vendor: {
				expand: true,
				flatten: false,
				cwd: './bower_components/dojo-bootstrap',
				src: '**',
				dest: './dist/vendor/dojo-bootstrap/'
			}
		},

		// Deploy doc site to gh-pages
    // 'gh-pages': {
    //   options: {
    //     base: 'docs/build',
    //     repo: 'https://github.com/Esri/calcite-maps.git'
    //   },
    //   src: ['**']
    // }

	});  
	// Default task.  
	grunt.registerTask('default', ['sass', 'cssmin', 'uglify', 'copy:bootstrapfonts', 'copy:calcitefonts', 'copy:vendor']);  
};