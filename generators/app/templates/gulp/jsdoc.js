'use strict';

var gulp = require('gulp');
var shell = require('gulp-shell');

gulp.task('docs', shell.task([
  'node node_modules/jsdoc/jsdoc.js ' +
  '-c node_modules/angular-jsdoc/conf.json ' +  // config file
  '-t node_modules/angular-jsdoc/template ' +   // template file
  '-d reports/docs ' +                          // output directory
  './README.md ' +                              // to include README.md as index contents
  '-r sources/modules/'                         // source code directory
]));
