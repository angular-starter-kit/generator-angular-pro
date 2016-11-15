'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('../gulpfile.config');
var wiredep = require('wiredep').stream;
var _ = require('lodash');
var browserSync = require('browser-sync');

var $ = require('gulp-load-plugins')();

function inject() {
  var injectStyles = gulp.src([
    path.join(conf.paths.tmp, '/**/*.css'),
    path.join('!' + conf.paths.tmp, '/vendor.css')
  ], {read: false});

  var injectOptions = {
    ignorePath: [conf.paths.src, conf.paths.tmp],
    addRootSlash: false
  };

  return gulp.src(path.join(conf.paths.src, 'index.html'))
    .pipe($.inject(injectStyles, injectOptions))
    .pipe(wiredep(_.extend({}, conf.wiredep)))
    .pipe(gulp.dest(conf.paths.tmp));
}

gulp.task('inject', ['scripts', 'styles', 'fonts'], inject);

gulp.task('inject:watch', ['scripts:watch', 'styles', 'fonts'], inject);

gulp.task('inject:reload', ['inject:watch'], function() {
  browserSync.reload();
});
