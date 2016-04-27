import app from 'main.module';
import {ILogger, LoggerService} from 'helpers/logger/logger';

/**
 * Context service: provides URL context injection based on specified context.
 */
export class ContextService {

  private logger: ILogger;

  constructor(logger: LoggerService) {
    this.logger = logger.getLogger('contextService');
  }

  /**
   * Injects the specified context into the given REST API.
   * The REST API should be formatted like "/api/users/:userId".
   * Any fragment from the REST API starting with ":" will then be replaced by a property from the context with
   * the same name, i.e. for "/api/users/:userId" and a context object "{ userId: 123 }", the resulting URL will
   * be "/api/users/123".
   * @param {!string} restApi The REST API to fill will context values.
   * @param {Object} context The context to use.
   * @return {string} The ready-to-use REST API to call.
   */
  inject(restApi: string, context?: any): string {
    this.logger.log('Injecting context in: ' + restApi);

    if (!context) {
      throw 'inject: context must be defined';
    }

    // Search for context properties to inject
    let properties = restApi.match(/(:\w+)/g);

    angular.forEach(properties, (property: string) => {
      let contextVar = property.substring(1);
      let contextValue = context[contextVar];

      if (contextValue !== undefined) {
        contextValue = encodeURIComponent(contextValue);
        restApi = restApi.replace(property, contextValue);
        this.logger.log('Injected ' + contextValue + ' for ' + property);
      } else {
        throw 'inject: context.' + contextVar + ' expected but undefined';
      }
    });

    this.logger.log('Resulting REST API: ' + restApi);

    return restApi;
  }

}

app.service('contextService', ContextService);
