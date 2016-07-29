import app from 'main.module';
import {RestService} from 'helpers/rest/rest.service';
import {ContextService} from 'helpers/context/context.service';

/**
 * Quote service: allows to get quote of the day.
 */
export class QuoteService {

  private ROUTES = {
    randomJoke: '/jokes/random?escape=javascript&limitTo=[:category]'
  };

  constructor(private $q: ng.IQService,
              private restService: RestService,
              private contextService: ContextService) {
  }

  /**
   * Get a random Chuck Norris joke.
   * Used context properties:
   * - category: the joke's category: 'nerdy', 'explicit'...
   * @param {!Object} context The context to use.
   * @return {Object} The promise.
   */
  getRandomJoke(context: any): ng.IPromise<string> {
    return this.restService
      .get(this.contextService.inject(this.ROUTES.randomJoke, context), null, true)
      .then((response: any) => {
        if (response.data && response.data.value) {
          return response.data.value.joke;
        }
        return this.$q.reject();
      })
      .catch(() => {
        return 'Error, could not load joke :-(';
      });
  }

}

app.service('quoteService', QuoteService);
