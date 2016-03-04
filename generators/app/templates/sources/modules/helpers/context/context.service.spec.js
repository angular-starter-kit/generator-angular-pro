'use strict';

/*
 * Tests for context service.
 */
describe('contextService', function() {

  var contextService;

  beforeEach(function() {
    module('app');

    inject(function(_contextService_) {
      contextService = _contextService_;
    });
  });

  it('should have an inject method', function() {
    expect(typeof (contextService.inject)).toBe('function');
  });

  describe('injectContext', function() {

    it('should not change resulting API if the input API has no parameters', function() {
      // Arrange
      var restApi = '/projects/popopo/test';
      var context = {};

      // Act
      var resultApi = contextService.inject(restApi, context);

      // Assert
      expect(resultApi).toBe(restApi);
    });

    it('should correctly inject input API parameters with the given context', function() {
      // Arrange
      var restApi = '/projects/:projectId';
      var context = {projectId: '123'};

      // Act
      var resultApi = contextService.inject(restApi, context);

      // Assert
      expect(resultApi).toBe('/projects/123');
    });

    it('should correctly escape injected input API parameters', function() {
      // Arrange
      var restApi = '/projects/:projectId';
      var context = {projectId: '123+/@'};

      // Act
      var resultApi = contextService.inject(restApi, context);

      // Assert
      expect(resultApi).toBe('/projects/123%2B%2F%40');
    });

    it('should throw an exception if an input API parameter is not present in the context', function() {
      // Arrange
      var restApi = '/projects/:projectId';
      var context = {};

      // Act
      var func = function() {
        contextService.inject(restApi, context);
      };

      // Assert
      expect(func).toThrow();
    });

    it('should throw an exception if no context is specified', function() {
      // Arrange
      var restApi = '/projects/:projectId';

      // Act
      var func = function() {
        contextService.inject(restApi, null);
      };

      // Assert
      expect(func).toThrow();
    });

  });

});
