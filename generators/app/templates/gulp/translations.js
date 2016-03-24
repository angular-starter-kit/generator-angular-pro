'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('../gulpfile.config');
var browserSync = require('browser-sync');

var $ = require('gulp-load-plugins')();

gulp.task('translations', function() {
  return gulp.src(path.join(conf.paths.src, 'translations/*.po'))
    .pipe($.angularGettext.compile({
      module: 'app.additions'
    }))
    .pipe($.concat('translations.js'))
    .pipe(gulp.dest(path.join(conf.paths.tmp, 'translations')));
});

gulp.task('translations:extract', ['scripts'], function() {
  return gulp.src([
      path.join(conf.paths.src, '**/*.js'),
      path.join(conf.paths.tmp, '**/*.js'),
      path.join(conf.paths.src, '**/*.html'),
      path.join(conf.paths.tmp, '**/*.html'),
      path.join('!' + conf.paths.bower, '**/*.js'),
      path.join('!' + conf.paths.src, '**/*.spec.js'),
      path.join('!' + conf.paths.src, '**/*.mock.js'),
      path.join('!' + conf.paths.bower, '**/*.html'),
      path.join('!' + conf.paths.src, 'index.html')
    ])
    .pipe($.angularGettext.extract('template.pot', {}))
    .pipe(gulp.dest(path.join(conf.paths.src, 'translations')));
});

gulp.task('translations:reload', ['translations'], function() {
  browserSync.reload();
});
