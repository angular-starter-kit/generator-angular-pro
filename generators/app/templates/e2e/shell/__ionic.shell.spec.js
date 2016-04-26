'use strict';

describe('shell', function() {

  var page;

  beforeEach(function() {
    browser.get('/');
    page = require('./shell.po');
  });

  it('side menu should contain 2 items', function() {
    expect(page.sideMenuItems.count()).toBe(2);
  });

});
