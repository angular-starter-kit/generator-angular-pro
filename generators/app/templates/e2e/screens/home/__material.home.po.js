/*
 * This file uses the Page Object pattern to define the main page for tests.
 * See docs/coding-guide/e2e-tests.md for more info.
 */

'use strict';

var Home = function() {
  this.jumbotron = element(by.css('.jumbotron'));
  this.title = this.jumbotron.element(by.css('h1'));
  this.image = this.jumbotron.element(by.css('img'));
};

module.exports = new Home();
