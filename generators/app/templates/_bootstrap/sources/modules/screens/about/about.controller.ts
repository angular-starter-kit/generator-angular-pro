module app {

  'use strict';

  /**
   * Displays the about screen.
   */
  export class AboutController {

    version: string;

    private logger: ILogger;
    private config: any;

    constructor(logger: LoggerService,
                config: any) {

      this.logger = logger.getLogger('about');
      this.config = config;

      this.init();
    }

    /**
     * Initializes controller.
     */
    private init() {
      this.version = this.config.version;
      this.logger.log('init', null);
    }

  }

  angular
    .module('app')
    .controller('aboutController', AboutController);

}
