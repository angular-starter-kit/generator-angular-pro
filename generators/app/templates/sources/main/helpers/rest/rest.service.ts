import app from 'main.module';
import {CacheService} from 'helpers/cache/cache.service';
import {ILogger, LoggerService} from 'helpers/logger/logger';

export interface IServerConfig {
  url: string;
  route: string;
}

export interface ICacheHandlerFunction {
  (cachedData: any): any;
}

export interface IRequestBuilderFunction {
  (options?: any): ng.IPromise<any>;
}

export interface IRequestHandlerFunction {
  (requestBuilder: IRequestBuilderFunction, options?: any): ng.IPromise<any>;
}

export interface IErrorHandlerFunction {
  (promise: ng.IPromise<any>, options?: any): ng.IPromise<any>;
}

/**
 * REST service: provides methods to perform REST requests.
 */
export class RestService {

  private server: IServerConfig = null;
  private baseUrl: string = '';
  private defaultConfig: ng.IRequestShortcutConfig = {
    headers: {
      'content-type': 'application/json',
      'Access-Control-Allow-Headers': 'content-type'
    }
  };

  /**
   * Defaults cache handler.
   * This handler just return the specified cache data and does nothing.
   * @type {Function}
   */
  private cacheHandler: ICacheHandlerFunction = angular.identity;
  private logger: ILogger;

  constructor(private $q: ng.IQService,
              private $http: ng.IHttpService,
              private cacheService: CacheService,
              logger: LoggerService) {

    this.logger = logger.getLogger('restService');
  }

  /**
   * Executes a GET request.
   * @param {!String} url URL of the REST service call.
   * @param {?Object.<string|Object>=} params Map of strings or objects which will be turned to ?key1=value1&key2=value2 after the url. If the value is not a string, it will be
   *   JSONified.
   * @param {?boolean|'force'} cache If set to true, the first request will be cached, and next request with cache set to true will use the cached response.
   *   If set to 'force', the request will always be made and cache will be updated.
   *   If set to false or omitted, no cache will be set or used.
   * @param {?Object=} options Additional options for request/error handlers.
   * @return {Object} The promise.
   */
  get(url: string, params?: any, cache?: boolean|string, options?: any): ng.IPromise<any> {
    let apiUrl = this.baseUrl + url;
    let promiseBuilder = () => this.$http.get(apiUrl, {params: params});

    if (!cache) {
      // Do not use cache
      return this.createRequest(promiseBuilder, options);
    } else {
      let cachedData = cache === 'force' ? null : this.cacheService.getCacheData(url, params);

      if (cachedData !== null) {
        cachedData = this.cacheHandler(cachedData);
      }

      if (cachedData === null) {
        this.logger.log('GET request: ' + url);

        // Update cache entry
        return this.createRequest(promiseBuilder, options).then((response: any) => {
          this.cacheService.setCacheData(url, params, response, null);
          return angular.copy(response);
        });
      } else {
        // Use cached version
        let deferred = this.$q.defer();
        deferred.resolve(angular.copy(cachedData));

        return this.errorHandler(deferred.promise, options);
      }
    }
  }

  /**
   * Executes a PUT request.
   * @param {!String} url URL of the REST service call.
   * @param {String|Object} data Data to be sent as the request message data.
   * @param {?Object=} options Additional options for request/error handlers.
   * @return {Object} The promise.
   */
  put(url: string, data: any, options?: any): ng.IPromise<any> {
    this.logger.log('PUT request: ' + url, null);
    let promise = () => this.$http.put(this.baseUrl + url, data, this.defaultConfig);
    return this.createRequest(promise, options);
  }

  /**
   * Executes a POST request.
   * @param {!String} url URL of the REST service call.
   * @param {String|Object} data Data to be sent as the request message data.
   * @param {?Object=} options Additional options for request/error handlers.
   * @return {Object} The promise.
   */
  post(url: string, data: any, options?: any): ng.IPromise<any> {
    this.logger.log('POST request: ' + url, null);
    let promiseBuilder = () => this.$http.post(this.baseUrl + url, data, this.defaultConfig);
    return this.createRequest(promiseBuilder, options);
  }

  /**
   * Executes a DELETE request.
   * @param {!String} url URL of the REST service call.
   * @param {?Object=} options Additional options for request/error handlers.
   * @return {Object} The promise.
   */
  delete(url: string, options?: any): ng.IPromise<any> {
    this.logger.log('DELETE request: ' + url, null);
    let promise = () => this.$http.delete(this.baseUrl + url, this.defaultConfig);
    return this.createRequest(promise, options);
  }

  /**
   * Sets the current server configuration.
   * A server parameter must contains at least these two strings:
   * - url: The base URL of the server
   * - route: The base route of the REST API
   * @param {!Object} server The server configuration.
   */
  setServer(server: IServerConfig): void {
    this.server = server;
    this.baseUrl = server.url + server.route;
  }

  /**
   * Returns the current server configuration.
   * @return {String} The server base URL.
   */
  getServer(): IServerConfig {
    return this.server;
  }

  /**
   * Returns the base URI.
   * @return {String} The computed base URI.
   */
  getBaseUrl(): string {
    return this.baseUrl;
  }

  /**
   * Sets a customized request handler function for all requests.
   * The function should have the following signature, and return a promise:
   * function requestHandler(requestBuilder, options) {
   *   return requestBuilder();
   * }
   * The requestBuilder parameter is a function that returns the request promise.
   * The options parameter is an optional object containing whatever options your handler may needs.
   * @param {!function} requestHandlerFunc The request handler.
   */
  setRequestHandler(requestHandlerFunc: IRequestHandlerFunction): void {
    this.requestHandler = requestHandlerFunc;
  }

  /**
   * Gets the current request handler function.
   * @return {function} The request handler.
   */
  getRequestHandler(): IRequestHandlerFunction {
    return this.requestHandler;
  }

  /**
   * Sets a customized default error handler function for all requests.
   * The function should have the following signature, and return a promise:
   * function errorHandler(promise, options) {
   *   return promise.catch(response, function() {
   *      ...
   *      return $q.reject(response);
   *   });
   * }
   * The promise parameter is the request promise.
   * The options parameter is an optional object containing whatever options your handler may needs.
   * @param {!function} errorHandlerFunc The error handler.
   */
  setErrorHandler(errorHandlerFunc: IErrorHandlerFunction): void {
    this.errorHandler = errorHandlerFunc;
  }

  /**
   * Gets the current error handler function.
   * @return {function} The error handler.
   */
  getErrorHandler(): IErrorHandlerFunction {
    return this.errorHandler;
  }

  /**
   * Sets a customized default cache handler function for all cached requests.
   * The function should have the following signature, and return an object:
   * function cacheHandler(cachedData) {
   *    return isValid(cachedData) ? cachedData : null;
   * }
   * This handler is only called before for requests that would return cached data otherwise.
   * @param {!function} cacheHandlerFunc The cache handler.
   */
  setCacheHandler(cacheHandlerFunc: ICacheHandlerFunction): void {
    this.cacheHandler = cacheHandlerFunc;
  }

  /**
   * Gets the current cache handler function.
   * @return {function} The cache handler.
   */
  getCacheHandler(): ICacheHandlerFunction {
    return this.cacheHandler;
  }

  /**
   * Default request handler, that just builds the promise.
   * @param {!function} requestBuilder A function that return the request's promise.
   * @param {?Object=} options Options that will be passed to the request builder function.
   * @return {Object} The promise.
   * @type {function}
   */
  private requestHandler(requestBuilder: IRequestBuilderFunction, options?: any): ng.IPromise<any> {
    // Default request handler just builds the request
    return requestBuilder(options);
  }

  /**
   * Default error handler.
   * This handler tries to extract a description of the error and logs and error with it.
   * @param {!Object} promise The promise to handle errors.
   * @param {?Object=} options Additional options: if 'skipErrors' property is set to true, errors will not be handled.
   * @return {Object} The promise.
   */
  private errorHandler(promise: ng.IPromise<any>, options?: any): ng.IPromise<any> {
    if (!options || !options.skipErrors) {
      promise.catch((response: any) => {
        let error;

        if (response.status === 404) {
          error = 'Server unavailable or URL does not exist';
        } else if (response.data) {
          let message = response.data.message ? response.data.message : null;
          let code = response.data.error ? response.data.error : null;
          error = message || code || angular.toJson(response.data);
        }

        if (error) {
          this.logger.error(error, null);
        }

        return this.$q.reject(response);
      });
    }
    return promise;
  }

  /**
   * Creates the request.
   * @param {!function} requestBuilder A function that return the request's promise.
   * @param {?Object=} options Additional options for request/error handlers.
   * @return {Object} The promise.
   */
  private createRequest(requestBuilder: IRequestBuilderFunction, options?: any): ng.IPromise<any> {
    return this.errorHandler(this.requestHandler(requestBuilder, options), options);
  }
}

app.service('restService', RestService);
