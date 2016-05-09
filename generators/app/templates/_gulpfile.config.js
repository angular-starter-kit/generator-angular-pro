/*
 * GULP TASKS CONFIGURATION
 * This file contains the variables used in gulp tasks.
 */

'use strict';

var path = require('path');
var gutil = require('gulp-util');
var fs = require('fs');
var bower = JSON.parse(fs.readFileSync('.bowerrc', 'utf8'));
var HttpsProxyAgent = require('https-proxy-agent');

/**
 * The main paths of your project, handle these with care.
 */
exports.paths = {
  src: 'sources',
<% if (props.target === 'web') { -%>
  dist: 'dist',
<% } else { -%>
  dist: 'www',
<% } -%>
  tmp: '.tmp',
  e2e: 'e2e',
  main: 'main',
  bower: bower.directory
};

/**
 * Sass include paths.
 */
exports.sassIncludePaths = [
  bower.directory,
  exports.paths.src,
  path.join(exports.paths.src, exports.paths.main),
<% if (props.ui === 'bootstrap') { -%>
  path.join(bower.directory, 'bootstrap-sass/assets/stylesheets/')
<% } if (props.ui === 'ionic') { -%>
  path.join(bower.directory, 'ionic/scss')
<% } -%>
];

/**
 * Default build environment, see docs/build-environments.md for more info.
 */
exports.defaultBuildEnvironment = 'production';

/**
 * API proxy configuration.
 * With the given example, HTTP request to like $http.get('/api/stuff') will be automatically proxified
 * to the specified server.
 * Multiple endpoints can be configured here.
 *
 * For more details and option, see https://github.com/chimurai/http-proxy-middleware/
 */
exports.backendProxy = [
  {
    context: '/api',
    options: {
      pathRewrite: {'^/api': ''},
      target: 'http://api.icndb.com',
      changeOrigin: true
    }
  }
];

/**
 * Wiredep is the lib which inject bower dependencies in your project.
 * Mainly used to inject script tags in the index.html but also used to inject css preprocessor
 * deps and js files in karma.
 */
exports.wiredep = {
  exclude: [],
  directory: bower.directory,
  bowerJson: require('./bower.json')
};

/**
 * Configures a corporate proxy agent for the API proxy.
 */
exports.corporateProxyAgent = function() {
  var agent = null;
  var proxyServer = process.env.http_proxy || process.env.HTTP_PROXY;

  if (proxyServer) {
    agent = new HttpsProxyAgent(proxyServer);
    gutil.log(gutil.colors.cyan('Using corporate proxy server: ' + proxyServer));
  }

  return agent;
};

/**
 * Common implementation for an error handler of a gulp plugin.
 */
exports.errorHandler = function(title) {
  return function(err) {
    gutil.log(gutil.colors.red('[' + title + ']'), err.toString());
    this.emit('end');
  };
};
