'use strict';

describe('home screen', function() {

  var page;

  beforeEach(function() {
    browser.get('/');
    page = require('./home.po');
  });

  it('should include card with correct data', function() {
    expect(page.title.getText()).toMatch('Hello');
    expect(page.image.getAttribute('src')).toMatch('angularjs');
  });

});
