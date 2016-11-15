'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('../gulpfile.config');

gulp.task('watch', ['inject:watch'], function() {
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

});
