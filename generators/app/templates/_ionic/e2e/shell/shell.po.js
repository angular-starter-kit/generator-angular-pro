/*
 * This file uses the Page Object pattern to define the main page for tests.
 * See docs/coding-guide/e2e-tests.md for more info.
 */

'use strict';

var Shell = function() {
  this.sideMenu = element(by.css('.menu'));
  this.sideMenuItems = this.sideMenu.element(by.css('.list')).all(by.css('.item'));
};

module.exports = new Shell();
