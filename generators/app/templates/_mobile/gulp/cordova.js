'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('../gulpfile.config');
var gutil = require('gulp-util');
var minimist = require('minimist');

var $ = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'del']
});

var options = minimist(process.argv.slice(2), {
  string: 'command',
  boolean: ['fast', 'device'],
  alias: {
    c: 'command',
    f: 'fast',
    d: 'device'
  }
});

var dependencies = options['fast'] ? [] : ['build', 'cordova:resources'];

function cordova(command) {
  return $.shell.task('cordova ' + command, {verbose: true})
}

gulp.task('patch:ios-https', function() {
  // Allow self-signed HTTPS certificate, use only for development!
  var patch =
    '\n' +
    '#ifdef DEBUG\n' +
    '@implementation NSURLRequest(DataController)\n' +
    '+ (BOOL)allowsAnyHTTPSCertificateForHost:(NSString *)host { return YES; }\n' +
    '@end\n' +
    '#endif';

  var file = 'platforms/ios/App/Classes/AppDelegate.m';

  gutil.log(gutil.colors.yellow('Patching iOS app to allow requests from servers using self-signed HTTPS ' +
    'certificates.'));
  gutil.log(gutil.colors.yellow('DO NOT USE THIS FOR PRODUCTION BUILDS, it may result in your app being rejected ' +
    'by Apple.'));

  return gulp.src(file)
    .pipe($.insert.append(patch))
    .pipe(gulp.dest(path.dirname(file)));
});

gulp.task('cordova:resources', function() {
  return gulp.src('resources/**/*.{gif,jpg,png,svg}')
    .pipe($.cache($.imagemin({
      optimizationLevel: 3,
      progressive: true,
      interlaced: true
    })))
    .pipe(gulp.dest(path.join(conf.paths.tmp, 'resources')))
    .pipe($.size());
});

gulp.task('release:ios', dependencies, cordova('build ios --release --device'));

gulp.task('release:android', dependencies, cordova('build android --release'));

gulp.task('build:ios', dependencies, cordova('build ios ' + (options.device ? '--device' : '--emulate')));

gulp.task('build:android', dependencies, cordova('build android ' + (options.device ? '--device' : '--emulate')));

gulp.task('run:ios', dependencies, cordova('run ios ' + (options.device ? '--device' : '--emulate')));

gulp.task('run:android', dependencies, cordova('run android ' + (options.device ? '--device' : '--emulate')));

gulp.task('cordova:remove', function() {
  return $.del(['platforms', 'plugins']);
});

gulp.task('cordova:build', dependencies, cordova('build ' + (options.device ? '--device' : '--emulate')));

gulp.task('cordova:release', ['release:ios', 'release:android']);

gulp.task('cordova:prepare', dependencies, cordova('prepare'));

gulp.task('cordova', cordova(options.command));
