'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('../gulpfile.config');

var packageConfig = require('../package.json');

var $ = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'main-bower-files', 'uglify-save-license', 'del']
});

function replaceConstant(string, replacement) {
  // Make sure we replace only the string located inside markers
  var constantRegExp = new RegExp('(// replace:constant[\\s\\S]*?)' + string + '([\\s\\S]*?endreplace)', 'gm');
  return $.replace(constantRegExp, '$1' + replacement + '$2')
}

gulp.task('build:sources', ['inject'], function() {
  var htmlFilter = $.filter('*.html', {restore: true});
  var jsFilter = $.filter('**/*.js', {restore: true});
  var cssFilter = $.filter('**/*.css', {restore: true});
  var assets;

  return gulp.src(path.join(conf.paths.tmp, 'index.html'))
    .pipe($.replace(/<html/g, '<html ng-strict-di'))
    .pipe(assets = $.useref.assets())
    .pipe($.if('**/app*.js', replaceConstant('debug: true', 'debug: false')))
    .pipe($.if('**/app*.js', replaceConstant('version: \'dev\'', 'version: \'' + packageConfig.version + '\'')))
    .pipe($.rev())
    .pipe(jsFilter)
    .pipe($.ngAnnotate())
    .pipe($.uglify({preserveComments: $.uglifySaveLicense})).on('error', conf.errorHandler('Uglify'))
    .pipe(jsFilter.restore)
    .pipe(cssFilter)
    .pipe($.cleanCss({processImport: false}))
    .pipe(cssFilter.restore)
    .pipe(assets.restore())
    .pipe($.useref())
    .pipe($.revReplace())
    .pipe(htmlFilter)
    .pipe($.htmlmin({
      removeComments: true,
      collapseWhitespace: true
    }))
    .pipe(htmlFilter.restore)
    .pipe(gulp.dest(path.join(conf.paths.dist, '/')))
    .pipe($.size({title: path.join(conf.paths.dist, '/'), showFiles: true}));
});

// Only applies for fonts from bower dependencies
// Custom fonts are handled by the "other" task
gulp.task('fonts', function() {
  return gulp.src($.mainBowerFiles())
    .pipe($.filter('**/*.{eot,svg,ttf,woff,woff2}'))
    .pipe($.flatten())
    .pipe(gulp.dest(path.join(conf.paths.tmp, '/fonts/')));
});

gulp.task('other', ['fonts'], function() {
  var fileFilter = $.filter(function(file) {
    return file.stat.isFile();
  });

  return gulp.src([
      path.join(conf.paths.src, '/**/*'),
      path.join(conf.paths.tmp, '/**/*.{eot,svg,ttf,woff,woff2}'),
      path.join('!' + conf.paths.src, '/**/*.{html,css,js,ts,scss}'),
      path.join('!' + conf.paths.bower, '/**/*'),
      path.join('!' + conf.paths.src, '/translations/*'),
      path.join('!' + conf.paths.src, '/images/*')
    ])
    .pipe(fileFilter)
    .pipe(gulp.dest(path.join(conf.paths.dist, '/')));
});

gulp.task('build', ['build:sources', 'other', 'images']);

gulp.task('clean', ['images:clean-cache'], function() {
  return $.del([conf.paths.dist, conf.paths.tmp]);
});
