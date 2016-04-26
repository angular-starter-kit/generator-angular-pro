'use strict';

/*
 * Tests for logger.
 */
describe('logger', function() {

  var logger;

  beforeEach(function() {
    module('app');

    inject(function(_logger_) {
      logger = _logger_;
    });
  });

  describe('addObserver', function() {

    it('should add a new observer to be notified of log entry', function() {
      // Arrange
      var observerSpy = jasmine.createSpy('observerSpy');

      // Act
      logger.addObserver(observerSpy);
      logger = logger.getLogger('unit test');
      logger.log('hoho');
      logger.info('toto');
      logger.warning('popo');
      logger.error('lolo');

      // Assert
      expect(observerSpy).toHaveBeenCalled();
      expect(observerSpy.calls.count()).toBe(4);
      expect(observerSpy).toHaveBeenCalledWith('hoho', 'unit test', 'log', undefined);
      expect(observerSpy).toHaveBeenCalledWith('toto', 'unit test', 'info', undefined);
      expect(observerSpy).toHaveBeenCalledWith('popo', 'unit test', 'warning', undefined);
      expect(observerSpy).toHaveBeenCalledWith('lolo', 'unit test', 'error', undefined);
    });

    it('should add a new observer to be notified of log entry with no source', function() {
      // Arrange
      var observerSpy = jasmine.createSpy('observerSpy');

      // Act
      logger.addObserver(observerSpy);
      logger = logger.getLogger();
      logger.log('hoho');
      logger.info('toto');
      logger.warning('popo');
      logger.error('lolo');

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
