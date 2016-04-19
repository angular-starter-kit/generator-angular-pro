/// <reference path="../../typings/tsd.d.ts" />

module app {

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
