module app {

  'use strict';

  /**
   * Displays the about screen.
   */
  export class AboutController {

    version: string;

    private logger: ILogger;

    constructor(logger: LoggerService,
                config: IApplicationConfig) {

      this.logger = logger.getLogger('about');
      this.version = config.version;

      this.logger.log('init');
    }

  }

  angular
    .module('app')
    .controller('aboutController', AboutController);

}
