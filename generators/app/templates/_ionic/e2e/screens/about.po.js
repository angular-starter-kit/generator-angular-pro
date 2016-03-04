/*
 * This file uses the Page Object pattern to define the main page for tests.
 * See docs/coding-guide/e2e-tests.md for more info.
 */

'use strict';

var About = function() {
  this.card = element(by.css('.card'));
};

module.exports = new About();
