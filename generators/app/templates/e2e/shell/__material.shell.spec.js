'use strict';

describe('shell', function() {

  var page;

  beforeEach(function() {
    browser.get('/');
    page = require('./shell.po');
  });

  it('header should contain 2 links', function() {
    expect(page.navbarItems.count()).toBe(2);
  });

  it('dropdown should contain 2 supported languages', function() {
    expect(page.languageDropdownItems.count()).toBe(2);
  });

});
