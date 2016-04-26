/*
 * This file uses the Page Object pattern to define the main page for tests.
 * See docs/coding-guide/e2e-tests.md for more info.
 */

'use strict';

var Shell = function() {
  this.navbar = element(by.css('.navbar'));
  this.navbarItems = this.navbar.element(by.css('.navbar-nav')).all(by.css('li'));
  this.languageDropdown = this.navbar.element(by.css('.dropdown'));
  this.languageDropdownItems = this.languageDropdown.all(by.css('li'));
};

module.exports = new Shell();
