describe('loading directive', () => {

  let $rootScope;
  let $compile;
  let element;

  beforeEach(() => {
    angular.mock.module('app');

    inject((_$rootScope_: ng.IRootScopeService,
            _$compile_: ng.ICompileService) => {

      $rootScope = _$rootScope_;
      $compile = _$compile_;
    });

    element = $('<div ui-loading="isLoading"></div>');
    element = $compile(element)($rootScope);
    $rootScope.$digest();
  });

  it('should be visible only when loading is in progress', () => {

    let div = element.children().eq(0);

    $rootScope.isLoading = true;
    $rootScope.$digest();

    expect(div).not.toHaveClass('ng-hide');

    $rootScope.isLoading = false;
    $rootScope.$digest();

    expect(div).toHaveClass('ng-hide');

  });

});
