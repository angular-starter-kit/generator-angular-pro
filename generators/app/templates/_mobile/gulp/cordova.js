'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('../gulpfile.config');
var gutil = require('gulp-util');
var $ = require('gulp-load-plugins')();

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
