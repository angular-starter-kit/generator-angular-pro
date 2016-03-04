'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('../gulpfile.config');
var browserSync = require('browser-sync');
var $ = require('gulp-load-plugins')();

var tsProject = $.typescript.createProject('tsconfig.json', {sortOutput: true});

gulp.task('typescript', function() {
  return gulp.src([
      path.join(conf.paths.src, '/main/main.module.ts'),
      path.join(conf.paths.src, '/modules/**/*.ts'),
      path.join(conf.paths.src, '/main/*.ts')
    ])
    .pipe($.sourcemaps.init())
    .pipe($.tslint())
    .pipe($.tslint.report('prose', {emitError: false}))
    .pipe($.typescript(tsProject)).on('error', conf.errorHandler('TypeScript'))
    .pipe($.angularFilesort()).on('error', conf.errorHandler('AngularFilesort'))
    .pipe($.concat('app.ts.js'))
    .pipe($.sourcemaps.write({
      includeContent: true,
      sourceRoot: '../'
    }))
    .pipe(gulp.dest(path.join(conf.paths.tmp)))
    .pipe(browserSync.reload({stream: true}))
    .pipe($.size());
});
