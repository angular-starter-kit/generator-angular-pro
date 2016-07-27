'use strict';

var gulp = require('gulp');
var path = require('path');
var conf = require('../gulpfile.config');

var $ = require('gulp-load-plugins')();

gulp.task('images', function() {
  return gulp.src(path.join(conf.paths.src, 'images/**/*.{gif,jpg,png,svg}'))
    .pipe($.cache($.imagemin([
      $.imagemin.gifsicle({interlaced: true}),
      $.imagemin.jpegtran({progressive: true}),
      $.imagemin.optipng({optimizationLevel: 3}),
      $.imagemin.svgo()
    ])))
    .pipe(gulp.dest(path.join(conf.paths.dist, 'images')))
    .pipe($.size({title: 'images'}));
});

gulp.task('images:clean-cache', function(done) {
  return $.cache.clearAll(done);
});
