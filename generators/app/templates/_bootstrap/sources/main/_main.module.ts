/// <reference path="../../typings/tsd.d.ts" />

module app {

  'use strict';

  angular.module('app', [
    'app.additions',
    'gettext',
    'ngAnimate',
    'ngSanitize',
<% if (props.target.key !== 'web') { -%>
    'ngCordova',
<% } -%>
    'ui.router',
    'ui.bootstrap'
  ]);

}
