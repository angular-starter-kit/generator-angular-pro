module app {

  'use strict';

  /**
   * Wraps external global libraries into AngularJS injection system.
   * global window: false
   */
  angular
    .module('app')
    .constant('_', _); // Lodash

}
