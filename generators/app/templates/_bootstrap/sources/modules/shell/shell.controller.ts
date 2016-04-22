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

    private logger: ILogger;

    constructor(private $state: ng.ui.IStateService,
                $locale: ng.ILocaleService,
                private _: _.LoDashStatic,
                logger: LoggerService,
                config: IApplicationConfig) {

      this.currentLocale = $locale;
      this.logger = logger.getLogger('shell');
      this.languages = config.supportedLanguages;
      this.menuHidden = true;

      this.logger.log('init');
    }

    /**
     * Toggles navigation menu visibility on mobile platforms.
     */
    toggleMenu() {
      this.menuHidden = !this.menuHidden;
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
