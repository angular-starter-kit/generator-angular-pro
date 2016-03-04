module app {

  'use strict';

  /**
   * Displays the home screen.
   */
  export class HomeController {

    isLoading: boolean = true;
    quote: string = null;

    private logger: ILogger;
    private quoteService: QuoteService;

    constructor(logger: LoggerService,
                quoteService: QuoteService) {

      this.logger = logger.getLogger('home');
      this.quoteService = quoteService;

      this.init();
    }

    /**
     * Initializes controller.
     */
    private init() {
      this.logger.log('init', null);

      var vm = this;

      this.quoteService
        .getRandomJoke({category: 'nerdy'})
        .then(function(quote: string) {
          vm.quote = quote;
        })
        .finally(function() {
          vm.isLoading = false;
        });
    }

  }

  angular
    .module('app')
    .controller('homeController', HomeController);

}
