'use strict';

/*
 * Tests for rest service.
 */
describe('restService', function() {

  var $q;
  var $httpBackend;
  var restService;
  var cacheService;
  var baseUri;
  var callbacks;

  beforeEach(function() {
    module('app');

    inject(function(_$q_,
                    _$httpBackend_,
                    _restService_,
                    _cacheService_,
                    config) {
      $q = _$q_;
      $httpBackend = _$httpBackend_;
      restService = _restService_;
      cacheService = _cacheService_;

      config.debug = false;

      baseUri = 'api';
    });

    callbacks = {
      'onSuccess': function() {},
      'onError': function() {}
    };

    spyOn(callbacks, 'onSuccess');
    spyOn(callbacks, 'onError');
  });

  afterEach(function() {
    // Clean $httpBackend
    try {
      $httpBackend.flush();
    } catch (e) {
    }

    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
    $httpBackend.resetExpectations();

    // Clean cache
    cacheService.cleanCache();
  });

  it('should have a get method', function() {
    expect(typeof (restService.get)).toBe('function');
  });

  it('should have a delete method', function() {
    expect(typeof (restService.delete)).toBe('function');
  });

  it('should have a post method', function() {
    expect(typeof (restService.post)).toBe('function');
  });

  it('should have a put method', function() {
    expect(typeof (restService.put)).toBe('function');
  });

  it('should have a setServer method', function() {
    expect(typeof (restService.setServer)).toBe('function');
  });

  it('should have a getServer method', function() {
    expect(typeof (restService.getServer)).toBe('function');
  });

  it('should have a getBaseUri method', function() {
    expect(typeof (restService.getBaseUri)).toBe('function');
  });

  it('should have a setRequestHandler method', function() {
    expect(typeof (restService.setRequestHandler)).toBe('function');
  });

  it('should have a getRequestHandler method', function() {
    expect(typeof (restService.getRequestHandler)).toBe('function');
  });

  it('should have a setErrorHandler method', function() {
    expect(typeof (restService.setErrorHandler)).toBe('function');
  });

  it('should have a getErrorHandler method', function() {
    expect(typeof (restService.getErrorHandler)).toBe('function');
  });

  it('should have a setCacheHandler method', function() {
    expect(typeof (restService.setCacheHandler)).toBe('function');
  });

  it('should have a getCacheHandler method', function() {
    expect(typeof (restService.getCacheHandler)).toBe('function');
  });

  describe('get', function() {

    it('should succeed', function() {
      // Arrange
      $httpBackend.expectGET(baseUri + '/toto').respond({value: 'toto'});

      // Act
      restService.get('/toto', null).then(callbacks.onSuccess, callbacks.onError);
      $httpBackend.flush();

      // Assert
      expect(callbacks.onSuccess).toHaveBeenCalled();
    });

    it('should succeed from cache', function() {
      // Arrange
      $httpBackend.expectGET(baseUri + '/toto').respond({value: 'toto'});

      // Act
      restService.get('/toto', null, true).then(function() {
        // This second call should be resolved from cache
        return restService.get('/toto', null, true).then(callbacks.onSuccess, callbacks.onError);
      });
      $httpBackend.flush();

      // Assert
      expect(callbacks.onSuccess).toHaveBeenCalled();
    });

    it('should succeed with cache update forced', function() {
      // Arrange
      $httpBackend.expectGET(baseUri + '/toto').respond({value: 'toto'});

      // Act
      restService.get('/toto', null, true).then(function() {
        $httpBackend.expectGET(baseUri + '/toto').respond({value: 'toto'});

        // This second call should not be resolved from cache
        return restService.get('/toto', null, 'force').then(callbacks.onSuccess, callbacks.onError);
      });
      $httpBackend.flush();

      // Assert
      expect(callbacks.onSuccess).toHaveBeenCalled();
    });

    it('should succeed with cache ignored', function() {
      // Arrange
      $httpBackend.expectGET(baseUri + '/toto').respond({value: 'toto'});

      // Act
      restService.get('/toto', null, true).then(function() {
        $httpBackend.expectGET(baseUri + '/toto').respond({value: 'toto'});

        // This second call should not be resolved from cache
        return restService.get('/toto', null, false).then(callbacks.onSuccess, callbacks.onError);
      });
      $httpBackend.flush();

      // Assert
      expect(callbacks.onSuccess).toHaveBeenCalled();
    });

    it('should succeed after cache clear', function() {
      // Arrange
      $httpBackend.expectGET(baseUri + '/toto').respond({value: 'toto'});

      // Act
      restService.get('/toto', null, true).then(function() {
        $httpBackend.expectGET(baseUri + '/toto').respond({value: 'toto'});
        cacheService.clearCacheData('/toto');

        // This second call should not be resolved from cache
        return restService.get('/toto', null, true).then(callbacks.onSuccess, callbacks.onError);
      });
      $httpBackend.flush();

      // Assert
      expect(callbacks.onSuccess).toHaveBeenCalled();
    });

    it('should fail', function() {
      // Arrange
      $httpBackend.expectGET(baseUri + '/toto').respond(400, {data: 'fail'});

      // Act
      restService.get('/toto', null).then(callbacks.onSuccess, callbacks.onError);
      $httpBackend.flush();

      // Assert
      expect(callbacks.onError).toHaveBeenCalled();
    });

  });

  describe('post', function() {

    it('should succeed', function() {
      // Arrange
      $httpBackend.expectPOST(baseUri + '/toto', 'value').respond(200, '');

      // Act
      restService.post('/toto', 'value').then(callbacks.onSuccess, callbacks.onError);
      $httpBackend.flush();

      // Assert
      expect(callbacks.onSuccess).toHaveBeenCalled();
    });

    it('should fail', function() {
      // Arrange
      $httpBackend.expectPOST(baseUri + '/toto', 'value').respond(404, '');

      // Act
      restService.post('/toto', 'value').then(callbacks.onSuccess, callbacks.onError);
      $httpBackend.flush();

      // Assert
      expect(callbacks.onError).toHaveBeenCalled();
    });

    it('should fail and skip default error handler', function() {
      // Arrange
      var $log = {};

      inject(function(_$log_) {
        $log = _$log_;
      });

      spyOn($log, 'error');
      $httpBackend.expectPOST(baseUri + '/toto', 'value').respond(404, '');

      // Act
      restService.post('/toto', 'value', {skipErrors: true}).then(callbacks.onSuccess, callbacks.onError);
      $httpBackend.flush();

      // Assert
      expect(callbacks.onError).toHaveBeenCalled();
      expect($log.error).not.toHaveBeenCalled();
    });

    it('should fail and log message via default error handler', function() {
      // Arrange
      var $log = {};

      inject(function(_$log_) {
        $log = _$log_;
      });

      spyOn($log, 'error');
      $httpBackend.expectPOST(baseUri + '/toto', 'value').respond(403, {message: 'toto'});

      // Act
      restService.post('/toto', 'value').then(callbacks.onSuccess, callbacks.onError);
      $httpBackend.flush();

      // Assert
      expect(callbacks.onError).toHaveBeenCalled();
      expect($log.error).toHaveBeenCalledWith('[restService]', 'toto', '');
    });

    it('should fail and log error code via default error handler', function() {
      // Arrange
      var $log = {};

      inject(function(_$log_) {
        $log = _$log_;
      });

      spyOn($log, 'error');
      $httpBackend.expectPOST(baseUri + '/toto', 'value').respond(403, {error: 'ZX42'});

      // Act
      restService.post('/toto', 'value').then(callbacks.onSuccess, callbacks.onError);
      $httpBackend.flush();

      // Assert
      expect(callbacks.onError).toHaveBeenCalled();
      expect($log.error).toHaveBeenCalledWith('[restService]', 'ZX42', '');
    });

    it('should fail and log reponse code via default error handler', function() {
      // Arrange
      var $log = {};

      inject(function(_$log_) {
        $log = _$log_;
      });

      spyOn($log, 'error');
      $httpBackend.expectPOST(baseUri + '/toto', 'value').respond(403, {prout: 'plouf'});

      // Act
      restService.post('/toto', 'value').then(callbacks.onSuccess, callbacks.onError);
      $httpBackend.flush();

      // Assert
      expect(callbacks.onError).toHaveBeenCalled();
      expect($log.error).toHaveBeenCalledWith('[restService]', angular.toJson({prout: 'plouf'}), '');
    });

  });

  describe('put', function() {

    it('should succeed', function() {
      // Arrange
      $httpBackend.expectPUT(baseUri + '/toto', 'value').respond(200, '');

      // Act
      restService.put('/toto', 'value').then(callbacks.onSuccess, callbacks.onError);
      $httpBackend.flush();

      // Assert
      expect(callbacks.onSuccess).toHaveBeenCalled();
    });

    it('should fail', function() {
      // Arrange
      $httpBackend.expectPUT(baseUri + '/toto', 'value').respond(400, '');

      // Act
      restService.put('/toto', 'value').then(callbacks.onSuccess, callbacks.onError);
      $httpBackend.flush();

      // Assert
      expect(callbacks.onError).toHaveBeenCalled();
    });

  });

  describe('delete', function() {

    it('should succeed', function() {
      // Arrange
      $httpBackend.expectDELETE(baseUri + '/toto').respond(200, '');

      // Act
      restService.delete('/toto').then(callbacks.onSuccess, callbacks.onError);
      $httpBackend.flush();

      // Assert
      expect(callbacks.onSuccess).toHaveBeenCalled();
    });

    it('should fail', function() {
      // Arrange
      $httpBackend.expectDELETE(baseUri + '/toto').respond(400, '');

      // Act
      restService.delete('/toto').then(callbacks.onSuccess, callbacks.onError);
      $httpBackend.flush();

      // Assert
      expect(callbacks.onError).toHaveBeenCalled();
    });

  });

  describe('setServer', function() {

    it('should set the base uri from the server config object', function() {
      // Prepare
      var server = {
        label: 'Europe',
        location: 'europe',
        restServerUrl: 'https://toto.com:443',
        restUri: '/api/smartphone',
        active: true
      };

      // Act
      restService.setServer(server);

      // Assert
      expect(restService.getBaseUri()).toBe('https://toto.com:443/api/smartphone');
    });

  });

  describe('getServer', function() {

    it('should get the base Url from the server config object', function() {
      // Prepare
      var server = {
        label: 'Europe',
        location: 'europe',
        restServerUrl: 'https://toto.com:443',
        restUri: '/api/smartphone',
        active: true
      };
      restService.setServer(server);

      // Act
      var result = restService.getServer();

      // Assert
      expect(result.restServerUrl).toBe('https://toto.com:443');
    });

  });

  describe('getBaseUri', function() {

    it('should return the computed base uri', function() {
      // Act
      var result = restService.getBaseUri();

      // Assert
      expect(result).toBe(baseUri);
    });
  });

  describe('setRequestHandler', function() {

    it('should set a customized request handler', function() {
      // Act
      var myFunction = function() {
      };
      restService.setRequestHandler(myFunction);

      // Assert
      expect(restService.getRequestHandler()).toBe(myFunction);
    });

    it('should set a customized request handler, called for every request', function() {
      // Prepare
      var counterSpy = jasmine.createSpy('counterSpy');
      var myHandler = function(requestBuilder) {
        counterSpy();
        return requestBuilder();
      };
      restService.setRequestHandler(myHandler);

      // Act
      $httpBackend.expectGET(baseUri + '/toto').respond({value: 'toto'});
      restService.get('/toto', null);
      $httpBackend.flush();

      $httpBackend.expectPOST(baseUri + '/toto', 'value').respond(200, '');
      restService.post('/toto', 'value');
      $httpBackend.flush();

      $httpBackend.expectPUT(baseUri + '/toto', 'value').respond(200, '');
      restService.put('/toto', 'value');
      $httpBackend.flush();

      $httpBackend.expectDELETE(baseUri + '/toto').respond(200, '');
      restService.delete('/toto');
      $httpBackend.flush();

      // Assert
      expect(counterSpy).toHaveBeenCalled();
      expect(counterSpy.calls.count()).toBe(4);
    });

  });

  describe('setErrorHandler', function() {

    it('should set a customized error handler', function() {
      // Act
      var myFunction = function() {
      };
      restService.setErrorHandler(myFunction);

      // Assert
      expect(restService.getErrorHandler()).toBe(myFunction);
    });

    it('should set a customized error handler, called for every request', function() {
      // Prepare
      var counterSpy = jasmine.createSpy('counterSpy');
      var errorSpy = jasmine.createSpy('errorSpy');
      var myHandler = function(promise) {
        counterSpy();
        return promise.catch(function(response) {
          errorSpy();
          $q.reject(response);
        });
      };
      restService.setErrorHandler(myHandler);

      // Act
      $httpBackend.expectGET(baseUri + '/toto').respond({value: 'toto'});
      restService.get('/toto', null);
      $httpBackend.flush();

      $httpBackend.expectPOST(baseUri + '/toto', 'value').respond(400, '');
      restService.post('/toto', 'value');
      $httpBackend.flush();

      $httpBackend.expectPUT(baseUri + '/toto', 'value').respond(200, '');
      restService.put('/toto', 'value');
      $httpBackend.flush();

      $httpBackend.expectDELETE(baseUri + '/toto').respond(200, '');
      restService.delete('/toto');
      $httpBackend.flush();

      // Assert
      expect(counterSpy).toHaveBeenCalled();
      expect(counterSpy.calls.count()).toBe(4);
      expect(errorSpy).toHaveBeenCalled();
      expect(errorSpy.calls.count()).toBe(1);
    });

  });

  describe('setCacheHandler', function() {

    it('should set a customized cache handler', function() {
      // Act
      var myFunction = function() {
      };
      restService.setCacheHandler(myFunction);

      // Assert
      expect(restService.getCacheHandler()).toBe(myFunction);
    });

    it('should use cache data from the custom handler', function() {
      // Prepare
      var counterSpy = jasmine.createSpy('counterSpy');
      var cacheHandler = function(cachedData) {
        counterSpy();
        // Alter data
        cachedData.data = {value: 'tata'};
        return cachedData;
      };
      restService.setCacheHandler(cacheHandler);

      // Act
      $httpBackend.expectGET(baseUri + '/toto').respond({value: 'toto'});
      restService.get('/toto', null, true).then(function() {
        // This second call should be resolved from cache
        restService.get('/toto', null, true).then(callbacks.onSuccess, callbacks.onError);
      });
      $httpBackend.flush();

      // Assert
      expect(counterSpy).toHaveBeenCalled();
      expect(counterSpy.calls.count()).toBe(1);
      expect(callbacks.onSuccess).toHaveBeenCalled();
      expect(callbacks.onSuccess.calls.mostRecent().args[0].data).toEqual({value: 'tata'});
    });

    it('should ignore cache data from the custom handler', function() {
      // Prepare
      var counterSpy = jasmine.createSpy('counterSpy');

      $httpBackend.expectGET(baseUri + '/toto').respond({value: 'toto'});
      restService.get('/toto', null, true);
      $httpBackend.flush();

      var cacheHandler = function() {
        counterSpy();
        return null;
      };
      restService.setCacheHandler(cacheHandler);

      // Act
      $httpBackend.expectGET(baseUri + '/toto').respond({value: 'toto2'});
      restService.get('/toto', null, true).then(callbacks.onSuccess, callbacks.onError);
      $httpBackend.flush();

      // Assert
      expect(counterSpy).toHaveBeenCalled();
      expect(counterSpy.calls.count()).toBe(1);
      expect(callbacks.onSuccess).toHaveBeenCalled();
      expect(callbacks.onSuccess.calls.mostRecent().args[0].data).toEqual({value: 'toto2'});
    });

  });

});
