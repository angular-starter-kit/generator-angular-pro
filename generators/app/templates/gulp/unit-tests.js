'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('../gulpfile.config');
var karma = require('karma');

var loadCoverage = require('remap-istanbul/lib/loadCoverage');
var remap = require('remap-istanbul/lib/remap');
var writeReport = require('remap-istanbul/lib/writeReport');
var istanbul = require('istanbul');
var _ = require('lodash');

// Workaround ts-loader sourcemaps issue
var coverageInclusions = ['.ts*'];

function runTests(singleRun, done) {
  var server = new karma.Server({
    configFile: path.join(__dirname, '/../karma.conf.js'),
    singleRun: singleRun,
    autoWatch: !singleRun
  }, done);
  server.start();
}

function writeCoverageReport(done) {
  var reportPath = path.join(__dirname, '../reports/coverage/');
  var unmappedCoverage = loadCoverage(path.join(reportPath, 'unmapped.json'));
  var remappedJson = remap(unmappedCoverage, { basePath: path.join(__dirname, '..') }).getFinalCoverage();
  var collector = new istanbul.Collector();
  var keys = Object.keys(remappedJson);
  var coverage = {};

  for (var i = 0; i < keys.length; i++) {
    var filePath = keys[i];
    var exclude = _.some(conf.coverageExclusions, function(e) { return filePath.indexOf(e) !== -1; });
    var include = _.some(coverageInclusions, function(e) { return filePath.indexOf(e) !== -1; });

    if (!exclude && include) {
      // Fix ts-loader sourcemaps issue
      var fixedPath = filePath.replace('*', '');
      coverage[fixedPath] = remappedJson[filePath];
      coverage[fixedPath].path = fixedPath;
    }
  }

  collector.add(coverage);

  writeReport(collector, 'html', {}, path.join(reportPath, 'html'))
    .then(function() {
      return writeReport(collector, 'cobertura', {
        dir: 'reports/coverage'
      });
    })
    .then(function() {
      return writeReport(collector, 'text-summary');
    })
    .then(done);
}

gulp.task('test', ['scripts:test'], function(done) {
  runTests(true, done);
});

gulp.task('test:auto', ['scripts:test-watch'], function(done) {
  // Workaround karma-coverage bug with watch
  global.karmaWatch = true;
  runTests(false, done);
});

gulp.task('coverage', ['test'], function(done) {
  writeCoverageReport(done);
});

gulp.task('coverage:fast', function(done) {
  writeCoverageReport(done);
});

