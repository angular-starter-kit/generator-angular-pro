'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('../gulpfile.config');
var webpack = require('webpack-stream-fixed');
var browserSync = require('browser-sync');

var $ = require('gulp-load-plugins')();

function buildScripts(watch, test, done) {
  var options = {
    resolve: {
      modulesDirectories: [
        '.',
        conf.paths.main,
        'libraries',
        conf.paths.src
      ],
      extensions: ['', '.ts']
    },
    debug: watch || test,
    watch: watch,
    devtool: watch || test ? 'inline-source-map' : undefined,
    module: {
      preLoaders: [
        {
          test: /\.ts$/,
          exclude: /node_modules/,
          loader: 'tslint'
        },
        {
          test: /\.html/,
          loader: 'htmlhint',
          exclude: /node_modules/
        }
      ],
      loaders: [
        {
          test: /\.ts$/,
          exclude: /node_modules/,
          loaders: ['ng-annotate', 'ts']
        },
        {
          test: /\.html$/,
          loader: 'raw!html-minify'
        },
        {
          test: /\.json/,
          loader: 'raw'
        },
        {
          test: /\.po$/,
          loader: 'angular-gettext?module=translations'
        }
      ]
    },
    output: {
      filename: 'app.ts.js',
      devtoolModuleFilenameTemplate: '[resource-path]',
      devtoolFallbackModuleFilenameTemplate: '[resource-path]'
    },
    'html-minify-loader': {
      empty: true,
      cdata: true,
      comments: true,
      conditionals: true,
      quotes: true,
      dom: {
        lowerCaseAttributeNames: false,
        lowerCaseTags: false
      }
    },
    tslint: {
      emitErrors: !watch,
      failOnHint: !watch
    },
    htmlhint: {
      configFile: '.htmlhintrc'
    }
  };

  var changeHandler = function(err, stats) {
    if (err) {
      conf.errorHandler('Webpack', true)(err);
    }

    var info = stats.toString({
      colors: $.util.colors.supportsColor,
      assets: false,
      timings: false,
      chunks: false,
      hash: false,
      version: false
    });

    if (info) {
      $.util.log(info);
    }

    browserSync.reload();

    // Finish gulp task to avoid waiting indefinitely
    if (watch) {
      watch = false;
      done();
    }
  };

  var sources = [
    path.join(conf.paths.src, '**/*.ts'),
    path.join(conf.paths.src, 'translations/*.po'),
    path.join('!' + conf.paths.bower, '/**/*.ts')
  ];

  if (!test) {
    sources.push(path.join('!' + conf.paths.src, '/**/*.spec.ts'));
    sources.push(path.join('!' + conf.paths.src, '/**/*.mock.ts'));
  } else {
    var exclusions = '';
    conf.coverageExclusions.forEach(function(exclusion) {
      exclusions += '|' + exclusion + '$';
    });
    options.module.postLoaders = [{
      test: /\.ts$/,
      exclude: new RegExp('(node_modules' + exclusions + ')'),
      loader: 'istanbul-instrumenter-loader'
    }];
  }

  return gulp.src(sources)
    .pipe(webpack(options, null, changeHandler)).on('error', conf.errorHandler('', watch))
    .pipe(gulp.dest(path.join(conf.paths.tmp)));
}

gulp.task('scripts', function() {
  return buildScripts(false, false);
});

gulp.task('scripts:watch', function(done) {
  return buildScripts(true, false, done);
});

gulp.task('scripts:test', function() {
  return buildScripts(false, true);
});

gulp.task('scripts:test-watch', function(done) {
  return buildScripts(true, true, done);
});
