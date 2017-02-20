'use strict';

var gulp = require('gulp');
var process = require('child_process');
var gutil = require('gulp-util');
var typings = require('../typings.json');

var $ = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'del']
});

gulp.task('typings', ['typings:restore'], function(done) {
  // Adapted from https://gist.github.com/ibratoev/0caca1b3b7a122595523f790e2620301
  process.exec('typings ls', function(error, _, stderr) {
    if (error) {
      done(new gutil.PluginError('typings', 'Error: ' + error));
      return;
    }
    if (stderr) {
      var lines = stderr.match(/[^\r\n]+/g);
      lines.forEach(function(line) {
        var re = /registry:(\S*)\/(\S*)(#|$)/;
        var m = re.exec(line);
        if (m !== null) {
          var source = m[1];
          var name = m[2];
          var isGlobal = typings.globalDependencies && typings.globalDependencies[name];
          var isLocal = typings.dependencies && typings.dependencies[name];
          if (isGlobal === isLocal) {
            gutil.log('Error searching for typings: ' + name);
            return;
          }
          gutil.log('Updating typings for ' + name);
          process.execSync('typings i ' + source + '~' + name + ' -S ' + (isGlobal ? '-G' : ''));
        }
      });
      done();
    }
    else {
      gutil.log('Typings are up to date.');
      done();
    }
  });
});

gulp.task('typings:restore', $.shell.task('typings install'));

gulp.task('typings:clean', function() {
  return $.del(['typings']);
});
