import app from 'main.module';
import {IServerConfig} from 'helpers/rest/rest.service';

export interface IApplicationConfig {
  version: string;
  environment: IApplicationEnvironment;
  supportedLanguages: Array<string>;
  analyticsAccount: string;
}

export interface IApplicationEnvironment {
  debug: boolean;
  server: IServerConfig;
}

// Do not remove the comments below, or change the values. It's the markers used by gulp build task to change the
// value of the config constant when building the application, while removing the code below for all environments.
// replace:environment
let environment = {
  local: {
    debug: true,

    // REST backend configuration, used for all web services using restService
    server: {
      url: '',
      route: 'api'
    }
  },
  production: {
    debug: false,
    server: {
<% if (props.target === 'web') { -%>
      url: '',
      route: 'api'
<% } else { -%>
      url: 'http://api.icndb.com',
      route: ''
<% } -%>
    }
  }
};
// endreplace

/**
 * Defines app-level configuration.
 */
let config: IApplicationConfig = {

  // Do not remove the comments below, or change the values. It's the markers used by gulp build task to inject app
  // version from package.json and environment values.
  // replace:constant
  version: 'dev',
  environment: environment.local,
  // endreplace

  // Supported languages
  supportedLanguages: [
    'en-US',
    'fr-FR'
  ],

  // Google Analytics account. Leave null to not have any analytics active.
  // Typical values take the form 'UA-########-1'.
  analyticsAccount: null

};

app.constant('config', config);
