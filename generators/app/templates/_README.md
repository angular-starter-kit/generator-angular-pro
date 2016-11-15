# <%= props.appName || 'Awesome App' %>

An awesome project scaffolded by the [angular-pro](https://github.com/angular-starter-kit/generator-angular-pro) Yeoman generator!

# Getting started

1. Install required tools `gulp` and `bower`:
 ```
 npm install -g gulp bower
 ```

2. Install project tools, go to project folder:
 ```
 npm install
 ```
<% if (props.target !== 'web') { -%>

 - To build the iOS version, you need to install [XCode](https://itunes.apple.com/app/xcode/id497799835)
 - To build the Android version, you need to install the
   [Android SDK](http://developer.android.com/sdk/installing/index.html)
<% } -%>

3. Launch development server:
 ```
 gulp serve
 ```
<% if (props.target !== 'web') { -%>

4. Prepare Cordova platforms and plugins
 ```
 gulp cordova:prepare
 ```
 
5. Run on device
 ```
 gulp run:<ios|android> --device
 ```
<% } -%>

# Project structure
```
gulp/                   individual gulp tasks
sources/                project source code
|- data/                other project data, will be copied as-is
|- fonts/               project fonts
|- images/              project images
|- libraries/           Bower dependencies
|- main/                app components
|  |- main.config.ts    app configuration code
|  |- main.constants.ts app configuration constants
|  |- main.module.ts    app module definition
|  |- main.routes.ts    app routes
|  |- main.run.ts       app entry point
|  |- main.wrappers.ts  AngularJS module wrappers for external libraries
|  |- main.scss         style entry point
|  |- helpers/          helper services
|  |- screens/          application screens
|  |- shell/            application shell
|  |- ui-components/    shared UI components
|  |- web-services/     web services
|  +- ...               additional components
|- translations/        translations files
+- index.html           html entry point
e2e/                    end-to-end tests
<% if (props.target === 'web') { -%>
dist/                   compiled version
<% } else { -%>
www/                    compiled version
<% } -%>
typings/                TypeScript definitions
reports/                test and coverage reports
<% if (props.target !== 'web') { -%>
hooks/                  Cordova build hooks
platforms/              Cordova platform-specific projects
plugins/                Cordova plugins
resources/              icon and splash screen resources
<% } -%>
gulpfile.config.js      gulp tasks configuration
```

# Main gulp tasks

Tasks       | Description
------------|-------------------------------------------------------------------------------
default     | run `clean`, then `build`
serve       | Launch a web server with live reload and API proxy, then open app in browser.
serve:dist  | Launch a web server using dist files.
build       | Build and optimize the current project, ready for deployment. This includes linting as well as image, script, stylesheet and HTML optimization and minification.
clean       | Delete temporary files and dist files.
test        | Launch unit tests using karma and jasmine.
test:auto   | Launch karma server and launch unit tests after each change in project files.
protractor  | Launch e2e tests using protractor.
tsd         | Download and update all TypeScript definitions for Bower dependencies.

When building the application, you can specify the target environment using the flag `--environment <name>`.

The default build environment is `production`. See [this documentation](docs/build-environments.md) for more details
about multiple build environments management.

You can disable opening automatically your default browser when using the `serve` commands by using the flag
`--skip-open`.

# Coding guides

- [JavaScript](docs/coding-guides/javascript.md)
- [TypeScript](docs/coding-guides/typescript.md)
- [CSS](docs/coding-guides/css.md)
- [HTML](docs/coding-guides/html.md)
- [Unit tests](docs/coding-guides/unit-tests.md)
- [End-to-end tests](docs/coding-guides/e2e-tests.md)

# Additional documentation

<% if (props.target !== 'web') { -%>
- [Cordova](docs/cordova.md)
<% } -%>
- [Build environments](docs/build-environments.md)
- [i18n](docs/i18n.md)
- [Proxy configuration](docs/proxy.md)
- [All gulp tasks](docs/tasks.md)
- [Updating dependencies](docs/updating.md)

# Features

#### Languages
- [TypeScript](http://www.typescriptlang.org), JavaScript
- [Sass](http://sass-lang.com/), CSS
- [Gettext](https://angular-gettext.rocketeer.be) (for translations)

#### Quality
- [TSLint](https://github.com/palantir/tslint)
- [HTMLHint](http://htmlhint.com)
- Unit tests ([Jasmine](http://jasmine.github.io))
- End-to-end tests ([Protractor](https://github.com/angular/protractor))

#### Development
- Automation with [gulp](http://gulpjs.com)
- [Webpack](https://webpack.github.io) build
- Development server with API proxy and live reload ([BrowserSync](http://www.browsersync.io))

#### Build
- JS+CSS+HTML bundling and minification ([useref](https://github.com/jonkemp/gulp-useref), 
  [uglify](https://github.com/terinjokes/gulp-uglify), 
  [html-minify](https://github.com/bestander/html-minify-loader), 
  [clean-css](https://www.npmjs.com/package/gulp-clean-css) 
- CSS browser support ([autoprefixer](https://github.com/sindresorhus/gulp-autoprefixer))
- Images optimization ([imagemin](https://github.com/sindresorhus/gulp-imagemin))
- Automatic angular module annotation ([ngAnnotate](https://www.npmjs.com/package/ng-annotate-loader))
- Asset revisionning ([rev](https://github.com/sindresorhus/gulp-rev))

#### Libraries
- [AngularJS](https://angularjs.org)
- [Angular-gettext](https://angular-gettext.rocketeer.be)
- [AngularUI Router](https://github.com/angular-ui/ui-router)
<% if (props.ui === 'bootstrap') { -%>
- [UI Bootsrap](https://angular-ui.github.io/bootstrap)
- [Bootstrap](http://getbootstrap.com)
- [Font Awesome](http://fortawesome.github.io/Font-Awesome)
<% } else if (props.ui === 'ionic') { -%>
- [Ionic](http://ionicframework.com/)
<% } -%>
- [Lodash](https://lodash.com)
<% if (props.target !== 'web') { -%>
- [ngCordova](http://ngcordova.com/)

#### Cordova plugins
- [ionic-plugin-keyboard](https://github.com/driftyco/ionic-plugin-keyboard)
- [cordova-plugin-statusbar](https://github.com/apache/cordova-plugin-statusbar)
- [cordova-plugin-device](https://github.com/apache/cordova-plugin-device)
- [cordova-plugin-splashscreen](https://github.com/apache/cordova-plugin-splashscreen)
- [cordova-plugin-globalization](https://github.com/apache/cordova-plugin-globalization)
- [cordova-plugin-whitelist](https://github.com/apache/cordova-plugin-whitelist)
- [cordova-plugin-crosswalk-webview](https://github.com/crosswalk-project/cordova-plugin-crosswalk-webview)
- [cordova-plugin-wkwebview-engine](https://github.com/apache/cordova-plugin-wkwebview-engine)
<% } -%>
