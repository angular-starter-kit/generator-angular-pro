/// <reference path="../../typings/tsd.d.ts" />

module app {

  'use strict';

  angular.module('app', [
    'app.additions',
    'gettext',
    'ngAnimate',
    'ngSanitize',
<% if (props.target !== 'web') { -%>
    'ngCordova',
<% } -%>
    'ui.router',
<% if (props.ui === 'bootstrap') { -%>
    'ui.bootstrap'
<% } else if (props.ui === 'ionic') { -%>
    'ionic'
<% } else { -%>
    'ngMaterial'
<% } -%>
  ]);

}
