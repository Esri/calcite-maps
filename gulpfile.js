/* jshint node:true */
'use strict';
// generated on 2015-02-10 using generator-gulp-webapp 0.2.0
var gulp = require('gulp');
var fs = require('fs');
require('gulp-grunt')(gulp);
var runs  = require('run-sequence');
var $ = require('gulp-load-plugins')();

//build the compile using assemble + grunt 
//Note: Assemble's gulp task is very alpha - easier to do this
gulp.task('compile', function(){
  gulp.run('grunt-compile');
});

gulp.task('styles', function () {
  var sassPaths = ['./bower_components/bootstrap-sass-official/assets/stylesheets'];
  return gulp.src('app/styles/calcite-bootstrap.scss')
    .pipe($.plumber())
    .pipe($.sass({
      style: 'expanded',
      includePaths: sassPaths,
      precision: 10
    }))
    .pipe($.autoprefixer({browsers: ['last 1 version']}))
    .pipe($.replace('../bower_components/bootstrap-sass-official/assets/fonts/bootstrap','../fonts'))
    .pipe(gulp.dest('dist/styles'));
});

gulp.task('jshint', function () {
  return gulp.src('app/scripts/**/*.js')
    .pipe($.jshint())
    .pipe($.jshint.reporter('jshint-stylish'))
    .pipe($.jshint.reporter('fail'));
});

gulp.task('html', ['styles'], function () {
  var lazypipe = require('lazypipe');
  var cssChannel = lazypipe()
    .pipe($.csso);
   

  var assets = $.useref.assets({searchPath: '{.tmp,app}'});

  //all the build instructions are in build.html NOT in the hbs files
  return gulp.src('app/useref/build.html')
    .pipe(assets)
    .pipe($.if('*.js', $.uglify()))
    .pipe($.if('*.css', cssChannel()))
    .pipe(assets.restore()) //do the asset replacement in the html files
    .pipe($.useref())
    .pipe(gulp.dest('dist'));
});



gulp.task('images', function () {
  return gulp.src('app/images/**/*')
    .pipe($.cache($.imagemin({
      progressive: true,
      interlaced: true
    })))
    .pipe(gulp.dest('dist/images'));
});

gulp.task('fonts', function () {
  return gulp.src(require('main-bower-files')().concat('app/fonts/**/*'))
    .pipe($.filter('**/*.{eot,svg,ttf,woff,woff2}'))
    .pipe($.flatten())
    .pipe(gulp.dest('dist/fonts'));
    
});

gulp.task('extras', function () {
  return gulp.src([
    'app/extras/*.*'
  ], {
    dot: true
  })
  .pipe(gulp.dest('dist'));
});

/**
 * clean out dist and .tmp
 */
gulp.task('clean', function (cb) {
  var del = require('del');
  del([
    './.tmp',
    './dist/*',
  ], cb);
});

gulp.task('connect', ['styles'], function () {
  var serveStatic = require('serve-static');
  var serveIndex = require('serve-index');
  var app = require('connect')()
    .use(require('connect-livereload')({port: 35729}))
    .use(serveStatic('dist'))
    .use(serveIndex('dist'));

  require('http').createServer(app)
    .listen(9000)
    .on('listening', function () {
      console.log('Started connect web server on http://localhost:9000');
    });
});


gulp.task('cdn', function(){
  var json = fs.readFileSync('gulp-aws.json');
  var aws = JSON.parse(json);
  var opts = aws.cdn;
  // create a new publisher
  var publisher = $.awspublish.create(opts);
  var sourceFolder = ['./dist/styles','./dist/fonts','./dist/images'];
  return gulp.src(sourceFolder)
    // gulp-awspublish-router defines caching and other options (see above)
    //.pipe(awspublishRouter(awsPubRouterOpts))

    // publisher will add Content-Length, Content-Type and headers specified above
    // if not specified it will set x-amz-acl to public-read by default
    // i think the parallelization was causing it to miss some files
    .pipe(publisher.publish())
    // .pipe(publisher.publish(null, { force: true }))

    // delete stuff that has been deleted locally
    // can't do this because it will kill 1.9
    //.pipe(publisher.sync())

    // create a cache file to speed up consecutive uploads
    .pipe(publisher.cache())

     // print upload updates to console
    .pipe($.awspublish.reporter());

});

gulp.task('serve',  function (done) {
  runs( ['build'], ['watch'], ['open'], done);
});

gulp.task('open', function(){
  require('opn')('http://localhost:9000');
});

gulp.task('watch', ['connect'], function () {
  $.livereload.listen();

  // watch for changes
   gulp.watch([
    'dist/**/*.html',
    '.tmp/styles/**/*.css',
    'dist/scripts/**/*.js',
    'dist/images/**/*'
  ]).on('change', $.livereload.changed);

  gulp.watch('app/styles/**/*.scss', ['styles']);
  gulp.watch('app/**/*.hbs', ['compile']);
  
});

gulp.task('reload', function(){
  $.livereload.changed();
});

gulp.task('deploy', function() {
  return gulp.src('./dist/**/*')
    .pipe($.ghPages({origin: 'upstream'}));
});


gulp.task('build-report', function () {
  return gulp.src('dist/**/*').pipe($.size({title: 'build', gzip: true}));
});

gulp.task('build', function (done) {
  runs( ['clean'], ['jshint', 'html', 'images', 'fonts', 'extras'], 'compile', 'build-report', done);
});

gulp.task('default', ['clean'], function () {
  gulp.start('build');
});
