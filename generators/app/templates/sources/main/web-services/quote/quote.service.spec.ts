import {RestService} from 'helpers/rest/rest.service';
import {QuoteService} from 'quote.service';

describe('quoteService', () => {

  // Constants
  let ERROR_JOKE = 'Error, could not load joke :-(';

  let $q;
  let $rootScope;
  let restService;
  let quoteService;

  beforeEach(() => {
    angular.mock.module('app');

    inject((_$q_: ng.IQService,
            _$rootScope_: ng.IRootScopeService,
            _quoteService_: QuoteService,
            _restService_: RestService) => {

      $q = _$q_;
      $rootScope = _$rootScope_;
      quoteService = _quoteService_;
      restService = _restService_;
    });

  });

  it('should have a getRandomJoke method', () => {
    expect(typeof (quoteService.getRandomJoke)).toBe('function');
  });

  describe('getRandomJoke', () => {

    it('should call rest service get method and return joke', (done) => {
      // Prepare
      spyOn(restService, 'get').and.callFake(() => {
        let deferred = $q.defer();
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
      let promise = quoteService.getRandomJoke({category: 'nerdy'});

      // Assert
      promise.then((joke) => {
        expect(restService.get).toHaveBeenCalled();
        expect(joke).toEqual('hello');
        done();
      });

      $rootScope.$apply();
    });

    it('should call rest service get method and fail when there is no joke in the response', (done) => {
      // Prepare
      spyOn(restService, 'get').and.callFake(() => {
        let deferred = $q.defer();
        deferred.resolve({});
        return deferred.promise;
      });

      // Act
      let promise = quoteService.getRandomJoke({category: 'nerdy'});

      // Assert
      promise.then((joke) => {
        expect(restService.get).toHaveBeenCalled();
        expect(joke).toEqual(ERROR_JOKE);
        done();
      });

      $rootScope.$apply();
    });

    it('should call rest service get method and fail to get a response', (done) => {
      // Prepare
      spyOn(restService, 'get').and.callFake(() => {
        return $q.reject({});
      });

      // Act
      let promise = quoteService.getRandomJoke({category: 'nerdy'});
      $rootScope.$apply();

      // Assert
      promise.then((joke) => {
        expect(restService.get).toHaveBeenCalled();
        expect(joke).toEqual(ERROR_JOKE);
        done();
      });

      $rootScope.$apply();
    });

  });

});
