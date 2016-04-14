module app {

  'use strict';

  /**
   * Configures the application (before running).
   */
  function mainConfig($provide: ng.auto.IProvideService,
                      $compileProvider: ng.ICompileProvider,
                      config: any) {

    // Extend the $exceptionHandler service to output logs.
    $provide.decorator('$exceptionHandler', ($delegate: any, $injector: any) => {
      return (exception: any, cause: any) => {
        $delegate(exception, cause);

        var logger = $injector.get('logger').getLogger('exceptionHandler');
        logger.error(exception + (cause ? ' (' + cause + ')' : ''));
      };
    });

    // Disable debug logs in production version
    $provide.decorator('$log', ($delegate: any) => {
      if (!config.environment.debug) {
        $delegate.log = angular.noop;
        $delegate.debug = angular.noop;
      }
      return $delegate;
    });

    // Disable angular debug info in production version
    $compileProvider.debugInfoEnabled(config.environment.debug);

  }

  angular
    .module('app')
    .config(mainConfig);

}

