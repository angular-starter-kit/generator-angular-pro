module app {

  'use strict';

  /**
   * Quote service: allows to get quote of the day.
   */
  export class QuoteService {

    private ROUTES = {
      randomJoke: '/jokes/random?escape=javascript&limitTo=[:category]'
    };

    private $q: ng.IQService;
    private restService: RestService;
    private contextService: ContextService;

    constructor($q: ng.IQService,
                restService: RestService,
                contextService: ContextService) {

      this.$q = $q;
      this.restService = restService;
      this.contextService = contextService;
    }

    /**
     * Get a random Chuck Norris joke.
     * Used context properties:
     * - category: the joke's category: 'nerdy', 'explicit'...
     * @param {!Object} context The context to use.
     * @return {Object} The promise.
     */
    getRandomJoke(context: any): ng.IPromise<string> {
      var self = this;
      return this.restService
        .get(this.contextService.inject(this.ROUTES.randomJoke, context), null, true)
        .then(function(response: any) {
          if (response.data && response.data.value) {
            return response.data.value.joke;
          }
          return self.$q.reject();
        })
        .catch(function() {
          return 'Error, could not load joke :-(';
        });
    }

  }

  angular
    .module('app')
    .service('quoteService', QuoteService);

}
