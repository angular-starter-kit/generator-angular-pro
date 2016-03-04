'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('../gulpfile.config');

var $ = require('gulp-load-plugins')();

gulp.task('partials', ['jade'], function() {
  return gulp.src([
      path.join(conf.paths.src, '**/*.html'),
      path.join('!' + conf.paths.bower, '**/*.html'),
      path.join(conf.paths.tmp, '**/*.html'),
      path.join('!' + conf.paths.tmp, 'index.html')
    ])
    .pipe($.minifyHtml({
      empty: true,
      spare: true,
      quotes: true,
      loose: true
    }))
    .pipe($.angularTemplatecache('templateCache.js', {
      module: 'app.additions',
      standalone: true
    }))
    .pipe(gulp.dest(conf.paths.tmp + '/partials/'));
});
