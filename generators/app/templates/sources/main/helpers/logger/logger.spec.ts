import {LoggerService} from 'logger';

describe('logger', () => {

  let logger;

  beforeEach(() => {
    angular.mock.module('app');

    inject((_logger_: LoggerService) => {
      logger = _logger_;
    });
  });

  describe('addObserver', () => {

    it('should add a new observer to be notified of log entry', () => {
      // Arrange
      let observerSpy = jasmine.createSpy('observerSpy');

      // Act
      logger.addObserver(observerSpy);

      let loggerInstance = logger.getLogger('unit test');
      loggerInstance.log('hoho');
      loggerInstance.info('toto');
      loggerInstance.warning('popo');
      loggerInstance.error('lolo');

      // Assert
      expect(observerSpy).toHaveBeenCalled();
      expect(observerSpy.calls.count()).toBe(4);
      expect(observerSpy).toHaveBeenCalledWith('hoho', 'unit test', 'log', undefined);
      expect(observerSpy).toHaveBeenCalledWith('toto', 'unit test', 'info', undefined);
      expect(observerSpy).toHaveBeenCalledWith('popo', 'unit test', 'warning', undefined);
      expect(observerSpy).toHaveBeenCalledWith('lolo', 'unit test', 'error', undefined);
    });

    it('should add a new observer to be notified of log entry with no source', () => {
      // Arrange
      let observerSpy = jasmine.createSpy('observerSpy');

      // Act
      logger.addObserver(observerSpy);
      let loggerInstance = logger.getLogger();
      loggerInstance.log('hoho');
      loggerInstance.info('toto');
      loggerInstance.warning('popo');
      loggerInstance.error('lolo');

      // Assert
      expect(observerSpy).toHaveBeenCalled();
      expect(observerSpy.calls.count()).toBe(4);
      expect(observerSpy).toHaveBeenCalledWith('hoho', undefined, 'log', undefined);
      expect(observerSpy).toHaveBeenCalledWith('toto', undefined, 'info', undefined);
      expect(observerSpy).toHaveBeenCalledWith('popo', undefined, 'warning', undefined);
      expect(observerSpy).toHaveBeenCalledWith('lolo', undefined, 'error', undefined);
    });

  });
});
