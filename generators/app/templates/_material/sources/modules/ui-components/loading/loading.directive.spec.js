'use strict';

/*
 * Tests for loading directive.
 */
describe('loading directive', function() {

  var $rootScope;
  var $compile;
  var element;

  beforeEach(function() {
    module('templateCache');
    module('app');

    inject(function(_$rootScope_,
                    _$compile_) {

      $rootScope = _$rootScope_;
      $compile = _$compile_;
    });

    element = $('<div ui-loading="isLoading"></div>');
    element = $compile(element)($rootScope);
    $rootScope.$digest();
  });

  it('should be visible only when loading is in progress', function() {

    var div = element.children().eq(0);

    $rootScope.isLoading = true;
    $rootScope.$digest();

    expect(div).not.toHaveClass('ng-hide');

    $rootScope.isLoading = false;
    $rootScope.$digest();

    expect(div).toHaveClass('ng-hide');

  });

});
