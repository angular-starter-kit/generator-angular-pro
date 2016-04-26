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
                private _: _.LoDashStatic,
                logger: LoggerService) {

      this.currentLocale = $locale;
      this.logger = logger.getLogger('shell');

      this.logger.log('init');
    }

    /**
     * Checks if the specified name is contained in the current navigation state.
     * @param {string} name The state name to check.
     * @return {boolean} True if the specified name is contained in the current navigation state.
     */
    stateContains(name: string): boolean {
      return this._.startsWith(this.$state.current.name, name);
    }

  }

  angular
    .module('app')
    .controller('shellController', ShellController);

}
