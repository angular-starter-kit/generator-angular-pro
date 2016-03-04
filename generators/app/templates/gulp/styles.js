'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('../gulpfile.config');

var browserSync = require('browser-sync');

var $ = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'main-bower-files']
});

var wiredep = require('wiredep').stream;
var _ = require('lodash');
var mainFolder = path.join(conf.paths.src, conf.paths.main);

gulp.task('styles', ['fonts'], function() {
  var sassOptions = {
    style: 'expanded',
    includePaths: conf.sassIncludePaths
  };

  var injectFiles = gulp.src([
    path.join(conf.paths.src, '/modules/**/*.scss'),
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
    .pipe(gulp.dest(path.join(conf.paths.tmp, '/css/')))
    .pipe(browserSync.reload({stream: true}));
});
