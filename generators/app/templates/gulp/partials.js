'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('../gulpfile.config');
var browserSync = require('browser-sync');

var $ = require('gulp-load-plugins')();

gulp.task('partials', function() {
  return gulp.src([
      path.join(conf.paths.src, '**/*.html'),
      path.join(conf.paths.tmp, '**/*.html'),
      path.join('!' + conf.paths.bower, '**/*.html'),
      path.join('!' + conf.paths.src, 'index.html'),
      path.join('!' + conf.paths.tmp, 'index.html')
    ])
    .pipe($.htmlmin({
      removeComments: true,
      collapseWhitespace: true
    }))
    .pipe($.angularTemplatecache('templateCache.js', {
      module: 'app.additions',
      standalone: true
    }))
    .pipe(gulp.dest(conf.paths.tmp + '/partials/'));
});

gulp.task('partials:reload', ['partials'], function() {
  browserSync.reload();
});
