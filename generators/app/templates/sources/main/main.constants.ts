module app {

  'use strict';

  /**
   * Defines app-level configuration.
   */
  angular
    .module('app')
    .constant('config', {

      // Do not remove the comments below, or change the values. It's the markers used by gulp build task to switch
      // debug mode to false and inject app version is from package.json automatically on production builds.
      // replace:constant
      debug: true,
      version: 'dev',
      // endreplace

      // Supported languages
      supportedLanguages: [
        'en-US',
        'fr-FR'
      ],

      // REST backend configuration, used for all web services using restService
      server: {
        restServerUrl: '',
        restUri: 'api'
      }

    });

}
