import app from 'main.module';
import {IApplicationConfig} from 'main.constants';
import {ILogger} from 'helpers/logger/logger';

/**
 * Configures the application (before running).
 */
function mainConfig($provide: ng.auto.IProvideService,
                    $compileProvider: ng.ICompileProvider,
                    config: IApplicationConfig) {

  // Extend the $exceptionHandler service to output logs.
  $provide.decorator('$exceptionHandler', ($delegate: any, $injector: any) => {
    return (exception: any, cause: any) => {
      $delegate(exception, cause);

      let logger: ILogger = $injector.get('logger').getLogger('exceptionHandler');
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

app.config(mainConfig);

