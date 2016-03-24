'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('../gulpfile.config');

gulp.task('watch', ['inject'], function() {
  var options = {
    debounceDelay: 500
  };

  gulp.watch(['bower.json', path.join(conf.paths.src, '/index.html')], options, ['inject:reload']);

  gulp.watch([
    path.join(conf.paths.src, '/**/*.css'),
    path.join(conf.paths.src, '/**/*.scss')
  ], options, function(event) {
    if (event.type === 'changed') {
      gulp.start('styles:reload');
    } else {
      gulp.start('inject:reload');
    }
  });

  gulp.watch([
    path.join(conf.paths.src, '/**/*.html'),
    path.join('!' + conf.paths.src, '/index.html')
  ], options, ['partials:reload']);

  gulp.watch(path.join(conf.paths.src, '/**/*.po'), options, ['translations:reload']);

  gulp.watch(path.join(conf.paths.src, '/**/*.ts'), options, ['scripts:reload']);

});
