import {CacheService} from 'helpers/cache/cache.service';
import {RestService, IRequestBuilderFunction} from 'rest.service';

describe('restService', () => {

  let $q;
  let $httpBackend;
  let restService;
  let cacheService;
  let baseUrl;
  let callbacks;

  beforeEach(() => {
    angular.mock.module('app');

    inject((_$q_: ng.IQService,
            _$httpBackend_: ng.IHttpBackendService,
            _restService_: RestService,
            _cacheService_: CacheService) => {

      $q = _$q_;
      $httpBackend = _$httpBackend_;
      restService = _restService_;
      cacheService = _cacheService_;

      baseUrl = 'api';
    });

    callbacks = {
      'onSuccess': () => {},
      'onError': () => {}
    };

    spyOn(callbacks, 'onSuccess');
    spyOn(callbacks, 'onError');
  });

  afterEach(() => {
    // Clean $httpBackend
    try {
      $httpBackend.flush();
    } catch (e) {}

    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
    $httpBackend.resetExpectations();

    // Clean cache
    cacheService.cleanCache();
  });

  it('should have a get method', () => {
    expect(typeof (restService.get)).toBe('function');
  });

  it('should have a delete method', () => {
    expect(typeof (restService.delete)).toBe('function');
  });

  it('should have a post method', () => {
    expect(typeof (restService.post)).toBe('function');
  });

  it('should have a put method', () => {
    expect(typeof (restService.put)).toBe('function');
  });

  it('should have a setServer method', () => {
    expect(typeof (restService.setServer)).toBe('function');
  });

  it('should have a getServer method', () => {
    expect(typeof (restService.getServer)).toBe('function');
  });

  it('should have a getBaseUrl method', () => {
    expect(typeof (restService.getBaseUrl)).toBe('function');
  });

  it('should have a setRequestHandler method', () => {
    expect(typeof (restService.setRequestHandler)).toBe('function');
  });

  it('should have a getRequestHandler method', () => {
    expect(typeof (restService.getRequestHandler)).toBe('function');
  });

  it('should have a setErrorHandler method', () => {
    expect(typeof (restService.setErrorHandler)).toBe('function');
  });

  it('should have a getErrorHandler method', () => {
    expect(typeof (restService.getErrorHandler)).toBe('function');
  });

  it('should have a setCacheHandler method', () => {
    expect(typeof (restService.setCacheHandler)).toBe('function');
  });

  it('should have a getCacheHandler method', () => {
    expect(typeof (restService.getCacheHandler)).toBe('function');
  });

  describe('get', () => {

    it('should succeed', () => {
      // Arrange
      $httpBackend.expectGET(baseUrl + '/toto').respond({value: 'toto'});

      // Act
      restService.get('/toto', null).then(callbacks.onSuccess, callbacks.onError);
      $httpBackend.flush();

      // Assert
      expect(callbacks.onSuccess).toHaveBeenCalled();
    });

    it('should succeed from cache', () => {
      // Arrange
      $httpBackend.expectGET(baseUrl + '/toto').respond({value: 'toto'});

      // Act
      restService.get('/toto', null, true).then(() => {
        // This second call should be resolved from cache
        return restService.get('/toto', null, true).then(callbacks.onSuccess, callbacks.onError);
      });
      $httpBackend.flush();

      // Assert
      expect(callbacks.onSuccess).toHaveBeenCalled();
    });

    it('should succeed with cache update forced', () => {
      // Arrange
      $httpBackend.expectGET(baseUrl + '/toto').respond({value: 'toto'});

      // Act
      restService.get('/toto', null, true).then(() => {
        $httpBackend.expectGET(baseUrl + '/toto').respond({value: 'toto'});

        // This second call should not be resolved from cache
        return restService.get('/toto', null, 'force').then(callbacks.onSuccess, callbacks.onError);
      });
      $httpBackend.flush();

      // Assert
      expect(callbacks.onSuccess).toHaveBeenCalled();
    });

    it('should succeed with cache ignored', () => {
      // Arrange
      $httpBackend.expectGET(baseUrl + '/toto').respond({value: 'toto'});

      // Act
      restService.get('/toto', null, true).then(() => {
        $httpBackend.expectGET(baseUrl + '/toto').respond({value: 'toto'});

        // This second call should not be resolved from cache
        return restService.get('/toto', null, false).then(callbacks.onSuccess, callbacks.onError);
      });
      $httpBackend.flush();

      // Assert
      expect(callbacks.onSuccess).toHaveBeenCalled();
    });

    it('should succeed after cache clear', () => {
      // Arrange
      $httpBackend.expectGET(baseUrl + '/toto').respond({value: 'toto'});

      // Act
      restService.get('/toto', null, true).then(() => {
        $httpBackend.expectGET(baseUrl + '/toto').respond({value: 'toto'});
        cacheService.clearCacheData('/toto');

        // This second call should not be resolved from cache
        return restService.get('/toto', null, true).then(callbacks.onSuccess, callbacks.onError);
      });
      $httpBackend.flush();

      // Assert
      expect(callbacks.onSuccess).toHaveBeenCalled();
    });

    it('should fail', () => {
      // Arrange
      $httpBackend.expectGET(baseUrl + '/toto').respond(400, {data: 'fail'});

      // Act
      restService.get('/toto', null).then(callbacks.onSuccess, callbacks.onError);
      $httpBackend.flush();

      // Assert
      expect(callbacks.onError).toHaveBeenCalled();
    });

  });

  describe('post', () => {

    it('should succeed', () => {
      // Arrange
      $httpBackend.expectPOST(baseUrl + '/toto', 'value').respond(200, '');

      // Act
      restService.post('/toto', 'value').then(callbacks.onSuccess, callbacks.onError);
      $httpBackend.flush();

      // Assert
      expect(callbacks.onSuccess).toHaveBeenCalled();
    });

    it('should fail', () => {
      // Arrange
      $httpBackend.expectPOST(baseUrl + '/toto', 'value').respond(404, '');

      // Act
      restService.post('/toto', 'value').then(callbacks.onSuccess, callbacks.onError);
      $httpBackend.flush();

      // Assert
      expect(callbacks.onError).toHaveBeenCalled();
    });

    it('should fail and skip default error handler', () => {
      // Arrange
      let $log;

      inject((_$log_: ng.ILogService) => {
        $log = _$log_;
      });

      spyOn($log, 'error');
      $httpBackend.expectPOST(baseUrl + '/toto', 'value').respond(404, '');

      // Act
      restService.post('/toto', 'value', {skipErrors: true}).then(callbacks.onSuccess, callbacks.onError);
      $httpBackend.flush();

      // Assert
      expect(callbacks.onError).toHaveBeenCalled();
      expect($log.error).not.toHaveBeenCalled();
    });

    it('should fail and log message via default error handler', () => {
      // Arrange
      let $log;

      inject((_$log_: ng.ILogService) => {
        $log = _$log_;
      });

      spyOn($log, 'error');
      $httpBackend.expectPOST(baseUrl + '/toto', 'value').respond(403, {message: 'toto'});

      // Act
      restService.post('/toto', 'value').then(callbacks.onSuccess, callbacks.onError);
      $httpBackend.flush();

      // Assert
      expect(callbacks.onError).toHaveBeenCalled();
      expect($log.error).toHaveBeenCalledWith('[restService]', 'toto', '');
    });

    it('should fail and log error code via default error handler', () => {
      // Arrange
      let $log;

      inject((_$log_: ng.ILogService) => {
        $log = _$log_;
      });

      spyOn($log, 'error');
      $httpBackend.expectPOST(baseUrl + '/toto', 'value').respond(403, {error: 'ZX42'});

      // Act
      restService.post('/toto', 'value').then(callbacks.onSuccess, callbacks.onError);
      $httpBackend.flush();

      // Assert
      expect(callbacks.onError).toHaveBeenCalled();
      expect($log.error).toHaveBeenCalledWith('[restService]', 'ZX42', '');
    });

    it('should fail and log reponse code via default error handler', () => {
      // Arrange
      let $log;

      inject((_$log_: ng.ILogService) => {
        $log = _$log_;
      });

      spyOn($log, 'error');
      $httpBackend.expectPOST(baseUrl + '/toto', 'value').respond(403, {prout: 'plouf'});

      // Act
      restService.post('/toto', 'value').then(callbacks.onSuccess, callbacks.onError);
      $httpBackend.flush();

      // Assert
      expect(callbacks.onError).toHaveBeenCalled();
      expect($log.error).toHaveBeenCalledWith('[restService]', angular.toJson({prout: 'plouf'}), '');
    });

  });

  describe('put', () => {

    it('should succeed', () => {
      // Arrange
      $httpBackend.expectPUT(baseUrl + '/toto', 'value').respond(200, '');

      // Act
      restService.put('/toto', 'value').then(callbacks.onSuccess, callbacks.onError);
      $httpBackend.flush();

      // Assert
      expect(callbacks.onSuccess).toHaveBeenCalled();
    });

    it('should fail', () => {
      // Arrange
      $httpBackend.expectPUT(baseUrl + '/toto', 'value').respond(400, '');

      // Act
      restService.put('/toto', 'value').then(callbacks.onSuccess, callbacks.onError);
      $httpBackend.flush();

      // Assert
      expect(callbacks.onError).toHaveBeenCalled();
    });

  });

  describe('delete', () => {

    it('should succeed', () => {
      // Arrange
      $httpBackend.expectDELETE(baseUrl + '/toto').respond(200, '');

      // Act
      restService.delete('/toto').then(callbacks.onSuccess, callbacks.onError);
      $httpBackend.flush();

      // Assert
      expect(callbacks.onSuccess).toHaveBeenCalled();
    });

    it('should fail', () => {
      // Arrange
      $httpBackend.expectDELETE(baseUrl + '/toto').respond(400, '');

      // Act
      restService.delete('/toto').then(callbacks.onSuccess, callbacks.onError);
      $httpBackend.flush();

      // Assert
      expect(callbacks.onError).toHaveBeenCalled();
    });

  });

  describe('setServer', () => {

    it('should set the base url from the server config object', () => {
      // Prepare
      let server = {
        label: 'Europe',
        location: 'europe',
        url: 'https://toto.com:443',
        route: '/api/smartphone',
        active: true
      };

      // Act
      restService.setServer(server);

      // Assert
      expect(restService.getBaseUrl()).toBe('https://toto.com:443/api/smartphone');
    });

  });

  describe('getServer', () => {

    it('should get the base Url from the server config object', () => {
      // Prepare
      let server = {
        label: 'Europe',
        location: 'europe',
        url: 'https://toto.com:443',
        route: '/api/smartphone',
        active: true
      };
      restService.setServer(server);

      // Act
      let result = restService.getServer();

      // Assert
      expect(result.url).toBe('https://toto.com:443');
    });

  });

  describe('getBaseUrl', () => {

    it('should return the computed base url', () => {
      // Act
      let result = restService.getBaseUrl();

      // Assert
      expect(result).toBe(baseUrl);
    });
  });

  describe('setRequestHandler', () => {

    it('should set a customized request handler', () => {
      // Act
      let myFunction = () => {};
      restService.setRequestHandler(myFunction);

      // Assert
      expect(restService.getRequestHandler()).toBe(myFunction);
    });

    it('should set a customized request handler, called for every request', () => {
      // Prepare
      let counterSpy = jasmine.createSpy('counterSpy');
      let myHandler = (requestBuilder: IRequestBuilderFunction) => {
        counterSpy();
        return requestBuilder();
      };
      restService.setRequestHandler(myHandler);

      // Act
      $httpBackend.expectGET(baseUrl + '/toto').respond({value: 'toto'});
      restService.get('/toto', null);
      $httpBackend.flush();

      $httpBackend.expectPOST(baseUrl + '/toto', 'value').respond(200, '');
      restService.post('/toto', 'value');
      $httpBackend.flush();

      $httpBackend.expectPUT(baseUrl + '/toto', 'value').respond(200, '');
      restService.put('/toto', 'value');
      $httpBackend.flush();

      $httpBackend.expectDELETE(baseUrl + '/toto').respond(200, '');
      restService.delete('/toto');
      $httpBackend.flush();

      // Assert
      expect(counterSpy).toHaveBeenCalled();
      expect(counterSpy.calls.count()).toBe(4);
    });

  });

  describe('setErrorHandler', () => {

    it('should set a customized error handler', () => {
      // Act
      let myFunction = () => {};
      restService.setErrorHandler(myFunction);

      // Assert
      expect(restService.getErrorHandler()).toBe(myFunction);
    });

    it('should set a customized error handler, called for every request', () => {
      // Prepare
      let counterSpy = jasmine.createSpy('counterSpy');
      let errorSpy = jasmine.createSpy('errorSpy');
      let myHandler = (promise: ng.IPromise<any>) => {
        counterSpy();
        return promise.catch((response: any) => {
          errorSpy();
          $q.reject(response);
        });
      };
      restService.setErrorHandler(myHandler);

      // Act
      $httpBackend.expectGET(baseUrl + '/toto').respond({value: 'toto'});
      restService.get('/toto', null);
      $httpBackend.flush();

      $httpBackend.expectPOST(baseUrl + '/toto', 'value').respond(400, '');
      restService.post('/toto', 'value');
      $httpBackend.flush();

      $httpBackend.expectPUT(baseUrl + '/toto', 'value').respond(200, '');
      restService.put('/toto', 'value');
      $httpBackend.flush();

      $httpBackend.expectDELETE(baseUrl + '/toto').respond(200, '');
      restService.delete('/toto');
      $httpBackend.flush();

      // Assert
      expect(counterSpy).toHaveBeenCalled();
      expect(counterSpy.calls.count()).toBe(4);
      expect(errorSpy).toHaveBeenCalled();
      expect(errorSpy.calls.count()).toBe(1);
    });

  });

  describe('setCacheHandler', () => {

    it('should set a customized cache handler', () => {
      // Act
      let myFunction = () => {};
      restService.setCacheHandler(myFunction);

      // Assert
      expect(restService.getCacheHandler()).toBe(myFunction);
    });

    it('should use cache data from the custom handler', () => {
      // Prepare
      let counterSpy = jasmine.createSpy('counterSpy');
      let cacheHandler = (cachedData: any) => {
        counterSpy();
        // Alter data
        cachedData.data = {value: 'tata'};
        return cachedData;
      };
      restService.setCacheHandler(cacheHandler);

      // Act
      $httpBackend.expectGET(baseUrl + '/toto').respond({value: 'toto'});
      restService.get('/toto', null, true).then(() => {
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

    it('should ignore cache data from the custom handler', () => {
      // Prepare
      let counterSpy = jasmine.createSpy('counterSpy');

      $httpBackend.expectGET(baseUrl + '/toto').respond({value: 'toto'});
      restService.get('/toto', null, true);
      $httpBackend.flush();

      let cacheHandler = () => {
        counterSpy();
        return null;
      };
      restService.setCacheHandler(cacheHandler);

      // Act
      $httpBackend.expectGET(baseUrl + '/toto').respond({value: 'toto2'});
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
