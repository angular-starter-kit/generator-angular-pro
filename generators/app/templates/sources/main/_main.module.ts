'use strict';

// Translations are injected at build phase
angular.module('translations', []);

export default angular.module('app', [
  'translations',
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
