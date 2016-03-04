'use strict';

/*
 * Tests for quote service.
 */
describe('quoteService', function() {

  // Constants
  var ERROR_JOKE = 'Error, could not load joke :-(';

  var $q;
  var $rootScope;
  var restService;
  var quoteService;

  beforeEach(function() {
    module('app');

    inject(function(_$q_,
                    _$rootScope_,
                    _quoteService_,
                    _restService_) {

      $q = _$q_;
      $rootScope = _$rootScope_;
      quoteService = _quoteService_;
      restService = _restService_;
    });

  });

  it('should have a getRandomJoke method', function() {
    expect(typeof (quoteService.getRandomJoke)).toBe('function');
  });

  describe('getRandomJoke', function() {

    it('should call rest service get method and return joke', function(done) {
      // Prepare
      spyOn(restService, 'get').and.callFake(function() {
        var deferred = $q.defer();
        deferred.resolve({
          data: {
            value: {
              joke: 'hello'
            }
          }
        });
        return deferred.promise;
      });

      // Act
      var promise = quoteService.getRandomJoke({category: 'nerdy'});

      // Assert
      promise.then(function(joke) {
        expect(restService.get).toHaveBeenCalled();
        expect(joke).toEqual('hello');
        done();
      });

      $rootScope.$apply();
    });

    it('should call rest service get method and fail when there is no joke in the response', function(done) {
      // Prepare
      spyOn(restService, 'get').and.callFake(function() {
        var deferred = $q.defer();
        deferred.resolve({});
        return deferred.promise;
      });

      // Act
      var promise = quoteService.getRandomJoke({category: 'nerdy'});

      // Assert
      promise.then(function(joke) {
        expect(restService.get).toHaveBeenCalled();
        expect(joke).toEqual(ERROR_JOKE);
        done();
      });

      $rootScope.$apply();
    });

    it('should call rest service get method and fail to get a response', function(done) {
      // Prepare
      spyOn(restService, 'get').and.callFake(function() {
        return $q.reject({});
      });

      // Act
      var promise = quoteService.getRandomJoke({category: 'nerdy'});
      $rootScope.$apply();

      // Assert
      promise.then(function(joke) {
        expect(restService.get).toHaveBeenCalled();
        expect(joke).toEqual(ERROR_JOKE);
        done();
      });

      $rootScope.$apply();
    });

  });

});
