'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('../gulpfile.config');
var karma = require('karma');

function runTests(singleRun, done) {
  var server = new karma.Server({
    configFile: path.join(__dirname, '/../karma.conf.js'),
    singleRun: singleRun,
    autoWatch: !singleRun
  }, done);
  server.start();
}

gulp.task('test', ['scripts:test'], function(done) {
  runTests(true, done);
});

gulp.task('test:auto', ['scripts:test-watch'], function(done) {
  runTests(false, done);
});
