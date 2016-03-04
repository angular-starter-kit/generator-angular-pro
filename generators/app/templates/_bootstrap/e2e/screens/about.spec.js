'use strict';

describe('about', function() {

  var page;

  beforeEach(function() {
    browser.get('/#/about');
    page = require('./about.po');
  });

  it('should contain version', function() {
    expect(page.jumbotron.getText()).toMatch('Version');
  });

});
