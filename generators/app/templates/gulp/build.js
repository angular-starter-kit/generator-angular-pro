'use strict';

var path = require('path');
var gutil = require('gulp-util');
var gulp = require('gulp');
var conf = require('../gulpfile.config');
var minimist = require('minimist');

var packageConfig = require('../package.json');

var $ = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'main-bower-files', 'uglify-save-license', 'del']
});

var options = minimist(process.argv.slice(2), {
  string: 'environment',
  boolean: 'debug',
  alias: { e: 'environment' }
});

function replaceConstant(contents, string, replacement) {
  // Make sure we replace only the string located inside markers
  var constantRegExp = new RegExp('(// replace:constant[\\s\\S]*?)' + string + '([\\s\\S]*?// endreplace)', 'gm');
  return contents.replace(constantRegExp, '$1' + replacement + '$2')
}

function setEnvironment(file) {
  var contents = file.contents.toString();

  // Get the object containing all environments values
  var environmentRegExp = new RegExp('// replace:environment\\s*?([\\s\\S]*?)// endreplace', 'gm');
  var environment = eval(environmentRegExp.exec(contents)[1] + 'environment;');

  // Get the target environment value
  var name = options.environment || conf.defaultBuildEnvironment;
  var value = environment[name];

  if (!value) {
    throw new gutil.PluginError({
      plugin: 'setEnvironment',
      message: 'Cannot find configuration for environment "' + name + '".\n' +
      'Check your environment values in file `main.constants.ts`\n'
    });
  }

  gutil.log('Building for environment: ' + gutil.colors.green(name));

  // Replace constant values
  contents = replaceConstant(contents, 'environment: environment.local', 'environment: ' + JSON.stringify(value));
  contents = replaceConstant(contents, 'version: \'dev\'', 'version: \'' + packageConfig.version + '\'');

  // Remove all environment values and update file
  file.contents = new Buffer(contents.replace(environmentRegExp, ''));

  return file;
}

gulp.task('build:sources', ['inject'], function() {
  var htmlFilter = $.filter('*.html', {restore: true, dot: true});
  var jsFilter = $.filter('**/*.js', {restore: true, dot: true});
  var cssFilter = $.filter('**/*.css', {restore: true, dot: true});

  var task = gulp.src(path.join(conf.paths.tmp, 'index.html'))
    .pipe($.replace(/<html/g, '<html ng-strict-di'))
    .pipe($.useref())
    .pipe($.if('**/app*.js', $.intercept(setEnvironment)));

  if (!options.debug) {
    task = task.pipe(jsFilter)
      .pipe($.uglify({
        output: { comments: $.uglifySaveLicense }
      }))
      .on('error', conf.errorHandler('Uglify'))
      .pipe($.rev())
      .pipe(jsFilter.restore)
      .pipe(cssFilter)
      .pipe($.cleanCss({processImport: false}))
      .pipe($.rev())
      .pipe(cssFilter.restore)
      .pipe($.revReplace())
      .pipe(htmlFilter)
      .pipe($.htmlmin({
        removeComments: true,
        collapseWhitespace: true
      }))
      .pipe(htmlFilter.restore);
  }
  return task.pipe(gulp.dest(path.join(conf.paths.dist, '/')))
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

// Extra arbitrary files as configured
gulp.task('extra', function() {
  var stream = require('merge-stream')();

  conf.extraFiles.forEach(function(e) {
    var files = e.files.map(function (file) {
      return path.join(e.basePath, file);
    });
    var task = gulp.src(files, { base: e.basePath })
      .pipe(gulp.dest(path.join(conf.paths.dist, '/')));
    stream.add(task);
  });

  return stream.isEmpty() ? null : stream;
});

gulp.task('other', ['fonts', 'extra'], function() {
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

gulp.task('clean:dist', function() {
  return $.del(conf.paths.dist);
});

gulp.task('clean', ['images:clean-cache'], function() {
  return $.del([conf.paths.dist, conf.paths.tmp]);
});
