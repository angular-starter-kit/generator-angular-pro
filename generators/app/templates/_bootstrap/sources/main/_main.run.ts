module app {

  'use strict';

  /**
   * Entry point of the application.
   * Initializes application and root controller.
   */
  function main($locale: ng.ILocaleService,
                $rootScope: any,
                $state: angular.ui.IStateService,
<% if (props.target.key !== 'web') { -%>
                $window: any,
                $timeout: ng.ITimeoutService,
                $cordovaKeyboard: any,
<% } -%>
                gettextCatalog: angular.gettext.gettextCatalog,
                _: _.LoDashStatic,
                config: any,
<% if (props.target.key !== 'web') { -%>
                logger: LoggerService,
<% } -%>
                restService: RestService) {

    /*
     * Root view model
     */

    var vm = $rootScope;

    vm.pageTitle = '';

    /**
     * Utility method to set the language in the tools requiring it.
     * @param {string=} language The IETF language tag.
     */
    vm.setLanguage = function(language?: string) {
      var isSupportedLanguage = _.includes(config.supportedLanguages, language);

      // Fallback if language is not supported
      if (!isSupportedLanguage) {
        language = 'en-US';
      }

      // Configure translation with gettext
      gettextCatalog.setCurrentLanguage(language);
      $locale.id = language;
    };

    /**
     * Updates page title on view change.
     */
    vm.$on('$stateChangeSuccess', function(event: any, toState: angular.ui.IState) {
      updatePageTitle(toState.data ? toState.data.title : null);
    });

    /**
     * Updates page title on language change.
     */
    vm.$on('gettextLanguageChanged', function() {
      updatePageTitle($state.current.data ? $state.current.data.title : null);
    });

    init();

    /*
     * Internal
     */

    /**
     * Initializes the root controller.
     */
    function init() {
<% if (props.target.key !== 'web') { -%>
      var _logger: ILogger = logger.getLogger('main');
<% } -%>
      // Enable debug mode for translations
      gettextCatalog.debug = config.debug;

      vm.setLanguage();

      // Set REST server configuration
<% if (props.target.key === 'web') { -%>
      restService.setServer(config.server);
<% } else { -%>
      restService.setServer(config.debug ? config.server.development : config.server.production);

      // Cordova platform and plugins init
      $window.document.addEventListener('deviceready', function() {

        // Hide splash screen
        var splashScreen = $window.navigator.splashscreen;
        if (splashScreen) {
          $timeout(function() {
            splashScreen.hide();
          }, 1000);
        }

        // Detect and set default language
        var globalization = $window.navigator.globalization;
        if (globalization !== undefined) {
          // Use cordova plugin to retrieve device's locale
          globalization.getPreferredLanguage(function(language: string) {
            _logger.log('Setting device locale "' + language + '" as default language');
            vm.$apply(function() {
              vm.setLanguage(language);
            });
          }, null);
        }

        if ($window.cordova && $window.cordova.plugins.Keyboard) {
          // Hide the accessory bar (remove this to show the accessory bar above the keyboard for form inputs)
          $cordovaKeyboard.hideAccessoryBar(true);
          $cordovaKeyboard.disableScroll(true);
        }

      }, false);;
<% } -%>
    }

    /**
     * Updates the page title.
     * @param {?string=} stateTitle Title of current state, to be translated.
     */
    function updatePageTitle(stateTitle?: string) {
      vm.pageTitle = gettextCatalog.getString('APP_NAME');

      if (stateTitle) {
        vm.pageTitle += ' | ' + gettextCatalog.getString(stateTitle);
      }
    }

  }

  angular
    .module('app')
    .run(main);

}
