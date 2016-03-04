module app {

  'use strict';

  export interface ICacheData {
    date: Date;
    data: any;
  }

  export interface ICache {
    [name: string]: ICacheData;
  }

  /**
   * Cache service: manages cached data for GET requests.
   * By default, the cache is only persisted in memory, but you can change this behavior using the setPersistence()
   * method.
   */
  export class CacheService {

    private $window: any;
    private logger: ILogger;
    private cachedData: ICache = {};
    private storage: any = null;

    /* @ngInject */
    constructor($window: ng.IWindowService,
                logger: LoggerService) {

      this.$window = $window;
      this.logger = logger.getLogger('cacheService');

      /**
       * Initializes service.
       */
      this.loadCacheData();
    }

    /**
     * Sets the cache data for the specified request.
     * @param {!string} url URL of the REST service call.
     * @param {map=} params Map of strings or objects which will be turned to ?key1=value1&key2=value2 after the url. If the value is not a string, it will be
     *   JSONified.
     * @param {Object} data The received data.
     * @param {Date=} date The cache date, now date is used if not specified.
     */
    setCacheData(url: string, params: any, data: any, date: Date): void {
      var cacheKey = this.getCacheKey(url, params);

      this.cachedData[cacheKey] = {
        date: date || new Date(),
        data: data
      };

      this.logger.log('Cache set for key: "' + cacheKey + '"', null);

      this.saveCacheData();
    }

    /**
     * Gets the cached data (if possible) for the specified request.
     * @param {!string} url URL of the REST service call.
     * @param {?map=} params Map of strings or objects which will be turned to ?key1=value1&key2=value2 after the url. If the value is not a string, it will be
     *   JSONified.
     * @return {?Object} The cached data or null if no cached data exists for this request.
     */
    getCacheData(url: string, params?: any): any {
      var cacheKey = this.getCacheKey(url, params);
      var cacheEntry = this.cachedData[cacheKey];

      if (cacheEntry) {
        this.logger.log('Cache hit for key: "' + cacheKey + '"', null);
        return cacheEntry.data;
      }

      return null;
    }

    /**
     * Gets the cached data date (if possible) for the specified request.
     * @param {!string} url URL of the REST service call.
     * @param {?map=} params Map of strings or objects which will be turned to ?key1=value1&key2=value2 after the url. If the value is not a string, it will be
     *   JSONified.
     * @return {?Object} The cached data date or null if no cached data exists for this request.
     */
    getCacheDate(url: string, params?: any): Date {
      var cacheKey = this.getCacheKey(url, params);
      var cacheEntry = this.cachedData[cacheKey];
      return cacheEntry ? cacheEntry.date : null;
    }

    /**
     * Clears the cached data (if exists) for the specified request.
     * @param {!string} url URL of the REST service call.
     * @param {?map=} params Map of strings or objects which will be turned to ?key1=value1&key2=value2 after the url. If the value is not a string, it will be
     *   JSONified.
     */
    clearCacheData(url: string, params?: any): void {
      var cacheKey = this.getCacheKey(url, params);
      this.cachedData[cacheKey] = undefined;
      this.logger.log('Cache cleared for key: "' + cacheKey + '"', null);
      this.saveCacheData();
    }

    /**
     * Cleans cache entries older than the specified date.
     * @param {date=} expirationDate The cache expiration date. If no date is specified, all cache is cleared.
     */
    cleanCache(expirationDate?: Date): void {
      var self = this;
      if (expirationDate) {
        angular.forEach(self.cachedData, function(value: any, key: string) {
          if (expirationDate >= value.date) {
            self.cachedData[key] = undefined;
          }
        });
      } else {
        self.cachedData = {};
      }
      self.saveCacheData();
    }

    /**
     * Sets the cache persistence.
     * Note that changing the cache persistence will also clear the cache from its previous storage.
     * @param {'local'|'session'=} persistence How the cache should be persisted, it can be either
     *   in the local or session storage, or if no parameters is provided it will be only in-memory (default).
     */
    setPersistence(persistence: string) {
      this.cleanCache();
      this.storage = persistence === 'local' || persistence === 'session' ?
        this.$window[persistence + 'Storage'] : null;

      this.loadCacheData();
    };

    /**
     * Gets the cache key for the specified url and parameters.
     * @param {!string} url The request URL.
     * @param {?map=} params Map of strings or objects which will be turned to ?key1=value1&key2=value2 after the url. If the value is not a string, it will be
     *   JSONified.
     * @return {string} The corresponding cache key.
     */
    private getCacheKey(url: string, params?: any): string {
      return url + (params ? angular.toJson(params) : '');
    }

    /**
     * Saves the current cached data into persisted storage.
     */
    private saveCacheData(): void {
      if (this.storage) {
        this.storage.cachedData = angular.toJson(this.cachedData);
      }
    }

    /**
     * Loads cached data from persisted storage.
     */
    private loadCacheData(): void {
      var data = this.storage ? this.storage.cachedData : null;
      this.cachedData = data ? angular.fromJson(data) : {};
    }

  }

  angular
    .module('app')
    .service('cacheService', CacheService);

}
