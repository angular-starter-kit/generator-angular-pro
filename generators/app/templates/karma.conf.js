'use strict';

var path = require('path');
var conf = require('./gulpfile.config');
var _ = require('lodash');
var wiredep = require('wiredep');

/*
 * list all files that we want to load in the browser
 */
function listFiles() {
  var wiredepOptions = _.extend({}, conf.wiredep, {
    dependencies: true,
    devDependencies: true
  });
  return wiredep(wiredepOptions).js
    .concat([
      path.join(conf.paths.tmp, '**/*.js'),
      path.join(conf.paths.src, '/main/**/*.js'),
      path.join(conf.paths.src, '/modules/**/*.js'),
      path.join(conf.paths.src, '/**/*.mock.js'),
      path.join(conf.paths.src, '/**/*.html')
    ]);
}

module.exports = function(config) {

  var configuration = {

    // List of files/patterns to load in the browser
    files: listFiles(),

    // Continuous Integration mode
    // If true, it capture browsers, run tests and exit
    singleRun: true,

    // Enable or disable watching files and executing the tests whenever one of these files changes.
    autoWatch: false,

    // Level of logging, can be: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    logLevel: config.LOG_INFO,

    // Testing framework to use (jasmine/mocha/qunit/...)
    frameworks: [
      'jasmine', 'angular-filesort'
    ],

    angularFilesort: {
      // The whitelist config option allows you to further narrow the subset of files
      // karma-angular-filesort will sort for you
      whitelist: [
        path.join(conf.paths.tmp, '/**/!(*.html|*.spec|*.mock).js'),
        path.join(conf.paths.src, '/main/**/!(*.html|*.spec|*.mock).js'),
        path.join(conf.paths.src, '/modules/**/!(*.html|*.spec|*.mock).js')
      ]
    },

    ngHtml2JsPreprocessor: {
      stripPrefix: 'sources/',
      moduleName: 'templateCache'
    },

    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: ['PhantomJS'],

    // List of plugins to load
    plugins: [
      'karma-phantomjs-launcher',
      'karma-chrome-launcher',
      'karma-jasmine',
      'karma-coverage',
      'karma-junit-reporter',
      'karma-angular-filesort',
      'karma-ng-html2js-preprocessor'
    ],

    // A map of preprocessors to use
    preprocessors: {
      'sources/**/*.html': ['ng-html2js'],
      // Source files, that you wanna generate coverage for.
      // Do not include tests or libraries.
      'sources/modules/**/!(*.spec).js': ['coverage'],
      'sources/main/!(*.spec).js': ['coverage']
    },

    // List of reporters
    reporters: ['coverage', 'junit', 'progress'],

    // Coverage configuration
    coverageReporter: {
      type: 'lcov',
      dir: 'reports/',
      subdir: 'coverage'
    },

    junitReporter: {
      outputDir: 'reports/junit/',
      outputFile: 'TESTS-xunit.xml',
      suite: '' // suite will become the package name attribute in xml testsuite element
    },

    // Enable or disable colors in the output (reporters and logs).
    color: true
  };

  // This block is needed to execute Chrome on Travis
  // If you ever plan to use Chrome and Travis, you can keep it
  // If not, you can safely remove it
  // https://github.com/karma-runner/karma/issues/1144#issuecomment-53633076
  if (configuration.browsers[0] === 'Chrome' && process.env.TRAVIS) {
    configuration.customLaunchers = {
      'chrome-travis-ci': {
        base: 'Chrome',
        flags: ['--no-sandbox']
      }
    };
    configuration.browsers = ['chrome-travis-ci'];
  }

  config.set(configuration);

};
