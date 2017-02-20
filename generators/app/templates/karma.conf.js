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
    .concat([path.join(conf.paths.tmp, '**/*.js'), {
      pattern: path.join(conf.paths.src, 'images/**/*.*'),
      included: false
    }]);
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
    frameworks: ['jasmine'],

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
      'karma-jasmine',
      'karma-coverage-istanbul-reporter',
      'karma-junit-reporter',
      'karma-sourcemap-loader'
    ],

    // A map of preprocessors to use
    preprocessors: ['sourcemap'],

    // List of reporters
    reporters: ['progress', 'junit', 'coverage-istanbul'],

    // Coverage configuration
    coverageIstanbulReporter: {
      reports: ['html', 'lcovonly', 'text-summary'],
      dir: 'reports/coverage',
      fixWebpackSourcePaths: true
    },

    junitReporter: {
      outputDir: 'reports/junit/',
      outputFile: 'TESTS-xunit.xml',
      useBrowserName: false,
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
