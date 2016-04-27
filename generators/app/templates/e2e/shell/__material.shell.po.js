/*
 * This file uses the Page Object pattern to define the main page for tests.
 * See docs/coding-guide/e2e-tests.md for more info.
 */

'use strict';

var Shell = function() {
  this.header = element(by.css('header'));
  this.navbar = this.header.element(by.css('.nav-container'));
  this.navbarItems = this.navbar.element(by.css('.nav-links')).all(by.css('.md-button'));
  this.languageDropdown = this.navbar.element(by.css('md-menu-content'));
  this.languageDropdownItems = this.languageDropdown.all(by.css('md-menu-item'));
};

module.exports = new Shell();
