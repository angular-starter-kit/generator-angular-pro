'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('../gulpfile.config');

var $ = require('gulp-load-plugins')();

gulp.task('translations:extract', ['scripts'], function() {
  return gulp.src([
      path.join(conf.paths.tmp, '**/*.js'),
      path.join(conf.paths.src, '**/*.html'),
      path.join('!' + conf.paths.bower, '**/*.js'),
      path.join('!' + conf.paths.bower, '**/*.html')
    ])
    .pipe($.angularGettext.extract('template.pot', {}))
    .pipe(gulp.dest(path.join(conf.paths.src, 'translations')));
});
