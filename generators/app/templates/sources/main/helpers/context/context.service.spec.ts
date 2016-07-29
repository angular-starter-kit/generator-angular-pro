import {ContextService} from 'context.service';

describe('contextService', () => {

  let contextService;

  beforeEach(() => {
    angular.mock.module('app');

    inject((_contextService_: ContextService) => {
      contextService = _contextService_;
    });
  });

  it('should have an inject method', () => {
    expect(typeof (contextService.inject)).toBe('function');
  });

  describe('injectContext', () => {

    it('should not change resulting API if the input API has no parameters', () => {
      // Arrange
      let restApi = '/projects/popopo/test';
      let context = {};

      // Act
      let resultApi = contextService.inject(restApi, context);

      // Assert
      expect(resultApi).toBe(restApi);
    });

    it('should correctly inject input API parameters with the given context', () => {
      // Arrange
      let restApi = '/projects/:projectId';
      let context = {projectId: '123'};

      // Act
      let resultApi = contextService.inject(restApi, context);

      // Assert
      expect(resultApi).toBe('/projects/123');
    });

    it('should correctly escape injected input API parameters', () => {
      // Arrange
      let restApi = '/projects/:projectId';
      let context = {projectId: '123+/@'};

      // Act
      let resultApi = contextService.inject(restApi, context);

      // Assert
      expect(resultApi).toBe('/projects/123%2B%2F%40');
    });

    it('should throw an exception if an input API parameter is not present in the context', () => {
      // Arrange
      let restApi = '/projects/:projectId';
      let context = {};

      // Act
      let func = () => {
        contextService.inject(restApi, context);
      };

      // Assert
      expect(func).toThrow();
    });

    it('should throw an exception if no context is specified', () => {
      // Arrange
      let restApi = '/projects/:projectId';

      // Act
      let func = () => {
        contextService.inject(restApi, null);
      };

      // Assert
      expect(func).toThrow();
    });

  });

});
