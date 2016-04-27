import {CacheService} from 'cache.service';

describe('cacheService', () => {

  let cacheService: CacheService;

  beforeEach(() => {
    angular.mock.module('app');

    // Start fresh :-)
    window.sessionStorage.removeItem('cachedData');
    window.localStorage.removeItem('cachedData');

    inject((_cacheService_: CacheService) => {
      cacheService = _cacheService_;
    });
  });

  afterEach(() => {
    cacheService.cleanCache();
  });

  it('should have a setCacheData method', () => {
    expect(typeof (cacheService.setCacheData)).toBe('function');
  });

  it('should have a getCacheData method', () => {
    expect(typeof (cacheService.getCacheData)).toBe('function');
  });

  it('should have a getCacheDate method', () => {
    expect(typeof (cacheService.getCacheDate)).toBe('function');
  });

  it('should have a clearCacheData method', () => {
    expect(typeof (cacheService.clearCacheData)).toBe('function');
  });

  it('should have a cleanCache method', () => {
    expect(typeof (cacheService.cleanCache)).toBe('function');
  });

  it('should have a setPersistence method', () => {
    expect(typeof (cacheService.setPersistence)).toBe('function');
  });

  describe('setCacheData', () => {

    it('should set cache data', () => {
      // Act
      cacheService.setCacheData('/popo', null, 'data');

      // Assert
      expect(cacheService.getCacheData('/popo')).toBe('data');
    });

    it('should replace existing data', () => {
      // Act
      cacheService.setCacheData('/popo', null, 'data');
      cacheService.setCacheData('/popo', null, 'newdata');

      // Assert
      expect(cacheService.getCacheData('/popo')).toBe('newdata');
    });

    it('should set cache date correctly', () => {
      // Act
      let date = new Date(123);
      cacheService.setCacheData('/popo', null, 'data', date);
      cacheService.setCacheData('/hoho', null, 'data');

      // Assert
      expect(cacheService.getCacheDate('/popo')).toBe(date);
      expect(cacheService.getCacheDate('/hoho')).not.toBe(date);
    });

  });

  describe('getCacheData', () => {

    it('should return null if no cache', () => {
      expect(cacheService.getCacheData('/hoho', null)).toBe(null);
    });

    it('should return cached data if exists', () => {
      // Act
      cacheService.setCacheData('/hoho', null, 'data');

      // Assert
      expect(cacheService.getCacheData('/hoho')).toBe('data');
    });

    it('should return cached data with url parameters if exists', () => {
      // Act
      cacheService.setCacheData('/hoho', {pif: 'paf'}, 'data');

      // Assert
      expect(cacheService.getCacheData('/hoho', {pif: 'paf'})).toBe('data');
    });

  });

  describe('getCacheDate', () => {

    it('should return null if no cache', () => {
      expect(cacheService.getCacheDate('/hoho', null)).toBe(null);
    });

    it('should return cached data date  if exists', () => {
      // Act
      let date = new Date(123);
      cacheService.setCacheData('/hoho', null, 'data', date);

      // Assert
      expect(cacheService.getCacheDate('/hoho')).toBe(date);
    });

  });

  describe('clearCacheData', () => {

    it('should clear existing cache data', () => {
      // Set cache
      cacheService.setCacheData('/hoho', null, 'data');
      expect(cacheService.getCacheData('/hoho')).toBe('data');

      // Clear cache
      cacheService.clearCacheData('/hoho', null);
      expect(cacheService.getCacheData('/hoho', null)).toBe(null);
    });

    it('should do nothing if no cache exists', () => {
      expect(cacheService.getCacheData('/lolo', null)).toBe(null);
      cacheService.clearCacheData('/hoho', null);
      expect(cacheService.getCacheData('/lolo', null)).toBe(null);
    });

  });

  describe('cleanCache', () => {

    it('should clear all cache if no date is specified', () => {
      // Set cache
      cacheService.setCacheData('/hoho', null, 'data');
      cacheService.setCacheData('/popo', null, 'data');
      expect(cacheService.getCacheData('/hoho')).toBe('data');
      expect(cacheService.getCacheData('/popo')).toBe('data');

      // Clean cache
      cacheService.cleanCache();
      expect(cacheService.getCacheData('/hoho', null)).toBe(null);
      expect(cacheService.getCacheData('/popo', null)).toBe(null);
    });

    it('should clear existing since specified date', () => {
      // Set cache
      cacheService.setCacheData('/hoho', null, 'data');
      expect(cacheService.getCacheData('/hoho')).toBe('data');

      // Clean cache
      cacheService.cleanCache(new Date());
      expect(cacheService.getCacheData('/hoho', null)).toBe(null);
    });

    it('should not affect cache entries newer than specified date', () => {
      // Set cache
      cacheService.setCacheData('/hoho', null, 'data');
      expect(cacheService.getCacheData('/hoho')).toBe('data');

      // Clean cache
      let date = new Date();
      cacheService.setCacheData('/lolo', null, 'data', new Date(date.getTime() + 10));
      cacheService.cleanCache(date);

      // Assert
      expect(cacheService.getCacheData('/hoho', null)).toBe(null);
      expect(cacheService.getCacheData('/lolo', null)).toBe('data');
    });

  });

  describe('setPersistence', () => {

    beforeEach(() => {
      cacheService.setPersistence();
      cacheService.cleanCache = jasmine.createSpy('cleanCache');
    });

    it('should clear previous cache data when persistence value change', () => {
      cacheService.setPersistence('local');
      expect(cacheService.cleanCache).toHaveBeenCalledWith();
    });

    it('should persist cache to local storage', () => {
      expect(window.localStorage.getItem('cachedData')).toBeNull();

      cacheService.setPersistence('local');
      cacheService.setCacheData('/hoho', null, 'data');

      expect(window.localStorage.getItem('cachedData')).not.toBeNull();
    });

    it('should persist cache to session storage', () => {
      expect(window.sessionStorage.getItem('cachedData')).toBeNull();

      cacheService.setPersistence('session');
      cacheService.setCacheData('/hoho', null, 'data');

      expect(window.sessionStorage.getItem('cachedData')).not.toBeNull();
    });

  });

});
