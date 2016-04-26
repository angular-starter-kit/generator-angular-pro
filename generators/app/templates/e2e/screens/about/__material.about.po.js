/*
 * This file uses the Page Object pattern to define the main page for tests.
 * See docs/coding-guide/e2e-tests.md for more info.
 */

'use strict';

var About = function() {
  this.jumbotron = element(by.css('.jumbotron'));
};

module.exports = new About();
