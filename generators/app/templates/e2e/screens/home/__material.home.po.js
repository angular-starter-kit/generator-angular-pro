/*
 * This file uses the Page Object pattern to define the main page for tests.
 * See docs/coding-guide/e2e-tests.md for more info.
 */

'use strict';

var Home = function() {
  this.cardTitle = element(by.css('md-card-title-text'));
  this.title = this.cardTitle.element(by.css('.md-headline'));

  this.cardMedia = element(by.css('md-card-title-media'));
  this.image = this.cardMedia.element(by.css('img'));
};

module.exports = new Home();
