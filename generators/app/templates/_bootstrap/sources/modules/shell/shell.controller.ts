module app {

  'use strict';

  /**
   * Displays the SPA shell.
   * The shell contains the shared parts of the application: header, footer, navigation...
   */
  export class ShellController {

    languages: any;
    currentLocale: ng.ILocaleService;
    menuHidden: boolean;

    private $state: ng.ui.IStateService;
    private logger: ILogger;

    constructor($locale: ng.ILocaleService,
                $state: ng.ui.IStateService,
                logger: LoggerService,
                config: any) {

      this.$state = $state;
      this.currentLocale = $locale;
      this.logger = logger.getLogger('shell');
      this.languages = config.supportedLanguages;
      this.menuHidden = true;

      this.init();
    }

    /**
     * Toggles navigation menu visibility on mobile platforms.
     */
    toggleMenu() {
      this.menuHidden = !this.menuHidden;
    }

    /**
     * Checks if the specified state name is the current.
     * @param {string} name The state name to check.
     * @return {boolean} True if the specified state name is the current.
     */
    stateContains(name: string): boolean {
      return this.$state.current.name === name;
    }

    /**
     * Initializes controller.
     */
    private init() {
      this.logger.log('init', null);
    }

  }

  angular
    .module('app')
    .controller('shellController', ShellController);

}
