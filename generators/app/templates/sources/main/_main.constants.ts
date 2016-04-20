module app {

  'use strict';

  // Do not remove the comments below, or change the values. It's the markers used by gulp build task to change the
  // value of the config constant when building the application, while removing the code below for all environments.
  // replace:environment
  let environment = {
    local: {
      debug: true,

      // REST backend configuration, used for all web services using restService
      server: {
        url: '',
        route: 'api'
      }
    },
    production: {
      debug: false,
      server: {
<% if (props.target === 'web') { -%>
        url: '',
        route: 'api'
<% } else { -%>
        url: 'http://api.icndb.com',
        route: ''
<% } -%>
      }
    }
  };
  // endreplace

  /**
   * Defines app-level configuration.
   */
  angular
    .module('app')
    .constant('config', {

      // Do not remove the comments below, or change the values. It's the markers used by gulp build task to inject app
      // version from package.json and environment values.
      // replace:constant
      version: 'dev',
      environment: environment.local,
      // endreplace

      // Supported languages
      supportedLanguages: [
        'en-US',
        'fr-FR'
      ]

    });

}
