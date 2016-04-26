module app {

  'use strict';

  /**
   * Entry point of the application.
   * Initializes application and root controller.
   */
  function main($window: ng.IWindowService,
                $locale: ng.ILocaleService,
                $rootScope: any,
                $state: angular.ui.IStateService,
<% if (props.target !== 'web') { -%>
                $timeout: ng.ITimeoutService,
                $cordovaKeyboard: any,
<% } -%>
<% if (props.ui === 'ionic') { -%>
                $ionicPlatform: ionic.platform.IonicPlatformService,
<% } -%>
                gettextCatalog: angular.gettext.gettextCatalog,
                _: _.LoDashStatic,
                config: IApplicationConfig,
<% if (props.target !== 'web') { -%>
                logger: LoggerService,
<% } -%>
                restService: RestService) {

    /*
     * Root view model
     */

    let vm = $rootScope;

    vm.pageTitle = '';
<% if (props.ui === 'ionic') { -%>
    vm.viewTitle = '';
<% } -%>

    /**
     * Utility method to set the language in the tools requiring it.
     * The current language is saved to the local storage.
     * If no parameter is specified, the language is loaded from local storage (if possible).
     * @param {string=} language The IETF language tag.
     */
    vm.setLanguage = function(language?: string) {
      language = language || $window.localStorage.getItem('language');
      let isSupportedLanguage = _.includes(config.supportedLanguages, language);

<% if (props.target !== 'web') { -%>
      // If no exact match is found, search without the region
      if (!isSupportedLanguage && language) {
        let languagePart = language.split('-')[0];
        language = _.find(config.supportedLanguages,
          (supportedLanguage: string) => _.startsWith(supportedLanguage, languagePart));
        isSupportedLanguage = !!language;
      }

<% } -%>
      // Fallback if language is not supported
      if (!isSupportedLanguage) {
        language = 'en-US';
      }

      // Configure translation with gettext
      gettextCatalog.setCurrentLanguage(language);
      $locale.id = language;
      $window.localStorage.setItem('language', language);
    };

    /**
     * Updates title on view change.
     */
    vm.$on('$stateChangeSuccess', (event: any, toState: angular.ui.IState) => {
      updateTitle(toState.data ? toState.data.title : null);
    });

    /**
     * Updates title on language change.
     */
    vm.$on('gettextLanguageChanged', () => {
      updateTitle($state.current.data ? $state.current.data.title : null);
    });

    init();

    /*
     * Internal
     */

    /**
     * Initializes the root controller.
     */
    function init() {
<% if (props.target !== 'web') { -%>
      let _logger: ILogger = logger.getLogger('main');
<% } -%>
      // Enable debug mode for translations
      gettextCatalog.debug = config.environment.debug;

      vm.setLanguage();

      // Set REST server configuration
      restService.setServer(config.environment.server);
<% if (props.target !== 'web') { -%>

      // Cordova platform and plugins init
<%   if (props.ui !== 'ionic') { -%>
      $window.document.addEventListener('deviceready', () => {
<%   } else { -%>
      $ionicPlatform.ready(() => {
<%   } -%>

        // Hide splash screen
        let splashScreen = $window.navigator.splashscreen;
        if (splashScreen) {
          $timeout(() => {
            splashScreen.hide();
          }, 1000);
        }

        // Detect and set default language
        let globalization = $window.navigator.globalization;
        if (globalization) {
          // Use cordova plugin to retrieve device's locale
          globalization.getPreferredLanguage((language) => {
            _logger.log('Setting device locale "' + language.value + '" as default language');
            vm.$apply(() => {
              vm.setLanguage(language.value);
            });
          }, null);
        }

        if ($window.cordova && $window.cordova.plugins.Keyboard) {
          $cordovaKeyboard.disableScroll(true);
        }

      }<% if (props.ui !== 'ionic') { %>, false<% } %>);
<% } -%>
    }

    /**
     * Updates the title.
     * @param {?string=} stateTitle Title of current state, to be translated.
     */
    function updateTitle(stateTitle?: string) {
      vm.pageTitle = gettextCatalog.getString('APP_NAME');

      if (stateTitle) {
<% if (props.ui === 'ionic') { -%>
        vm.viewTitle = gettextCatalog.getString(stateTitle);
        vm.pageTitle += ' | ' + vm.viewTitle;
<% } else { -%>
        vm.pageTitle += ' | ' + gettextCatalog.getString(stateTitle);
<% } -%>
      }
    }

  }

  angular
    .module('app')
    .run(main);

}
