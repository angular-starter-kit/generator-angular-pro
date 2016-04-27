'use strict';

describe('shell', function() {

  var page;

  beforeEach(function() {
    browser.get('/');
    page = require('./shell.po');
  });

  it('header should contain 3 links', function() {
    expect(page.navbarItems.count()).toBe(3);
  });

  it('dropdown should contain 2 supported languages', function() {
    expect(page.languageDropdownItems.count()).toBe(2);
  });

});
