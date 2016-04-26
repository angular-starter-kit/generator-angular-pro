'use strict';

/*
 * Tests for cache service.
 */
describe('cacheService', function() {

  var cacheService;

  beforeEach(function() {
    module('app');

    // Start fresh :-)
    window.sessionStorage.removeItem('cachedData');
    window.localStorage.removeItem('cachedData');

    inject(function(_cacheService_) {
      cacheService = _cacheService_;
    });
  });

  afterEach(function() {
    cacheService.cleanCache();
  });

  it('should have a setCacheData method', function() {
    expect(typeof (cacheService.setCacheData)).toBe('function');
  });

  it('should have a getCacheData method', function() {
    expect(typeof (cacheService.getCacheData)).toBe('function');
  });

  it('should have a getCacheDate method', function() {
    expect(typeof (cacheService.getCacheDate)).toBe('function');
  });

  it('should have a clearCacheData method', function() {
    expect(typeof (cacheService.clearCacheData)).toBe('function');
  });

  it('should have a cleanCache method', function() {
    expect(typeof (cacheService.cleanCache)).toBe('function');
  });

  it('should have a setPersistence method', function() {
    expect(typeof (cacheService.setPersistence)).toBe('function');
  });

  describe('setCacheData', function() {

    it('should set cache data', function() {
      // Act
      cacheService.setCacheData('/popo', null, 'data');

      // Assert
      expect(cacheService.getCacheData('/popo')).toBe('data');
    });

    it('should replace existing data', function() {
      // Act
      cacheService.setCacheData('/popo', null, 'data');
      cacheService.setCacheData('/popo', null, 'newdata');

      // Assert
      expect(cacheService.getCacheData('/popo')).toBe('newdata');
    });

    it('should set cache date correctly', function() {
      // Act
      var date = new Date(123);
      cacheService.setCacheData('/popo', null, 'data', date);
      cacheService.setCacheData('/hoho', null, 'data');

      // Assert
      expect(cacheService.getCacheDate('/popo')).toBe(date);
      expect(cacheService.getCacheDate('/hoho')).not.toBe(date);
    });

  });

  describe('getCacheData', function() {

    it('should return null if no cache', function() {
      expect(cacheService.getCacheData('/hoho', null)).toBe(null);
    });

    it('should return cached data if exists', function() {
      // Act
      cacheService.setCacheData('/hoho', null, 'data');

      // Assert
      expect(cacheService.getCacheData('/hoho')).toBe('data');
    });

    it('should return cached data with url parameters if exists', function() {
      // Act
      cacheService.setCacheData('/hoho', {pif: 'paf'}, 'data');

      // Assert
      expect(cacheService.getCacheData('/hoho', {pif: 'paf'})).toBe('data');
    });

  });

  describe('getCacheDate', function() {

    it('should return null if no cache', function() {
      expect(cacheService.getCacheDate('/hoho', null)).toBe(null);
    });

    it('should return cached data date  if exists', function() {
      // Act
      var date = new Date(123);
      cacheService.setCacheData('/hoho', null, 'data', date);

      // Assert
      expect(cacheService.getCacheDate('/hoho')).toBe(date);
    });

  });

  describe('clearCacheData', function() {

    it('should clear existing cache data', function() {
      // Set cache
      cacheService.setCacheData('/hoho', null, 'data');
      expect(cacheService.getCacheData('/hoho')).toBe('data');

      // Clear cache
      cacheService.clearCacheData('/hoho', null);
      expect(cacheService.getCacheData('/hoho', null)).toBe(null);
    });

    it('should do nothing if no cache exists', function() {
      expect(cacheService.getCacheData('/lolo', null)).toBe(null);
      cacheService.clearCacheData('/hoho', null);
      expect(cacheService.getCacheData('/lolo', null)).toBe(null);
    });

  });

  describe('cleanCache', function() {

    it('should clear all cache if no date is specified', function() {
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

    it('should clear existing since specified date', function() {
      // Set cache
      cacheService.setCacheData('/hoho', null, 'data');
      expect(cacheService.getCacheData('/hoho')).toBe('data');

      // Clean cache
      cacheService.cleanCache(new Date());
      expect(cacheService.getCacheData('/hoho', null)).toBe(null);
    });

    it('should not affect cache entries newer than specified date', function() {
      // Set cache
      cacheService.setCacheData('/hoho', null, 'data');
      expect(cacheService.getCacheData('/hoho')).toBe('data');

      // Clean cache
      var date = new Date();
      cacheService.setCacheData('/lolo', null, 'data', new Date(date.getTime() + 10));
      cacheService.cleanCache(date);

      // Assert
      expect(cacheService.getCacheData('/hoho', null)).toBe(null);
      expect(cacheService.getCacheData('/lolo', null)).toBe('data');
    });

  });

  describe('setPersistence', function() {

    beforeEach(function() {
      cacheService.setPersistence();
      cacheService.cleanCache = jasmine.createSpy('cleanCache');
    });

    it('should clear previous cache data when persistence value change', function() {
      cacheService.setPersistence('local');
      expect(cacheService.cleanCache).toHaveBeenCalledWith();
    });

    it('should persist cache to local storage', function() {
      expect(window.localStorage.cachedData).not.toBeDefined();

      cacheService.setPersistence('local');
      cacheService.setCacheData('/hoho', null, 'data');

      expect(window.localStorage.cachedData).toBeDefined();
    });

    it('should persist cache to local storage', function() {
      expect(window.sessionStorage.cachedData).not.toBeDefined();

      cacheService.setPersistence('session');
      cacheService.setCacheData('/hoho', null, 'data');

      expect(window.sessionStorage.cachedData).toBeDefined();
    });

  });

});
