'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('../gulpfile.config');
var wiredep = require('wiredep').stream;
var _ = require('lodash');
var browserSync = require('browser-sync');

var $ = require('gulp-load-plugins')();

function buildStyles() {
  var mainFolder = path.join(conf.paths.src, conf.paths.main);

  var sassOptions = {
    outputStyle: 'expanded',
    precision: 10,
    includePaths: conf.sassIncludePaths
  };

  var injectFiles = gulp.src([
    path.join(mainFolder, '/**/*.scss'),
    path.join('!' + mainFolder, '/*.scss'),
    path.join('!' + mainFolder, '/theme/*.scss')
  ], {read: false});

  var injectOptions = {
    transform: function(filePath) {
      filePath = filePath.replace(mainFolder, '');
      return '@import "' + filePath + '";';
    },
    starttag: '// inject:styles',
    endtag: '// endinject',
    relative: true,
    addRootSlash: false
  };

  return gulp.src(path.join(mainFolder, 'main.scss'))
    .pipe($.inject(injectFiles, injectOptions))
    .pipe(wiredep(_.extend({}, conf.wiredep)))
    .pipe($.sourcemaps.init())
    .pipe($.sass(sassOptions)).on('error', conf.errorHandler('Sass'))
    .pipe($.autoprefixer()).on('error', conf.errorHandler('Autoprefixer'))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest(path.join(conf.paths.tmp, '/css/')));
}

gulp.task('styles', function() {
  return buildStyles();
});

gulp.task('styles:reload', ['styles'], function() {
  return buildStyles().pipe(browserSync.stream());
});
