module app {

  'use strict';

  /**
   * Displays the SPA shell.
   * The shell contains the shared parts of the application: header, footer, navigation...
   */
  export class ShellController {

    currentLocale: ng.ILocaleService;

    private logger: ILogger;

    constructor(private $state: ng.ui.IStateService,
                $locale: ng.ILocaleService,
                logger: LoggerService) {

      this.currentLocale = $locale;
      this.logger = logger.getLogger('shell');

      this.logger.log('init');
    }

    /**
     * Checks if the specified state name is the current.
     * @param {string} name The state name to check.
     * @return {boolean} True if the specified state name is the current.
     */
    stateContains(name: string): boolean {
      return this.$state.current.name === name;
    }

  }

  angular
    .module('app')
    .controller('shellController', ShellController);

}
