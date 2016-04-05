# <%= props.appName || 'Awesome App' %>

An awesome project scaffolded by the [angular-pro](https://github.com/angular-starter-kit/generator-angular-pro) Yeoman generator!

# Getting started

1. Install required tool `gulp`:
 ```
 npm install -g gulp
 ```

2. Install project tools, go to project folder:
 ```
 npm install
 ```
  
3. Launch development server:
 ```
 gulp serve
 ```

# Project structure
```
gulp/                   individual gulp tasks
sources/                project source code
|- data/                other project data, will be copied as-is
|- fonts/               project fonts
|- images/              project images
|- libraries/           Bower dependencies
|- main/                main module, for entry points and global style
|  |- main.config.ts    app configuration code
|  |- main.constants.ts app configuration constants
|  |- main.module.ts    app module definition
|  |- main.routes.ts    app routes
|  |- main.run.ts       app entry point
|  |- main.wrappers.ts  AngularJS module wrappers for external libraries
|  +- main.scss         style entry point
|- modules/             project components and modules
|  |- helpers/          helper services
|  |- screens/          application screens
|  |- shell/            application shell
|  |- ui-components/    shared UI components
|  |- web-services/     web services
|  +- ...               additional project modules
|- translations/        translations files
+- index.html           html entry point
e2e/                    end-to-end tests
dist/                   compiled version
typings/                TypeScript definitions
reports/                test and coverage reports
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

# Coding guides

- [JavaScript](docs/coding-guides/javascript.md)
- [TypeScript](docs/coding-guides/typescript.md)
- [CSS](docs/coding-guides/css.md)
- [HTML](docs/coding-guides/html.md)
- [Unit tests](docs/coding-guides/unit-tests.md)
- [End-to-end tests](docs/coding-guides/e2e-tests.md)

# Additional documentation

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
- [JSHint](http://jshint.com)
- [JSCS](http://jscs.info)
- Unit tests ([Jasmine](http://jasmine.github.io))
- End-to-end tests ([Protractor](https://github.com/angular/protractor))

#### Development
- Automation with [gulp](http://gulpjs.com)
- Development server with API proxy and live reload ([BrowserSync](http://www.browsersync.io))

#### Build
- JS+CSS+HTML bundling and minification ([useref](https://github.com/jonkemp/gulp-useref), 
  [uglify](https://github.com/terinjokes/gulp-uglify), 
  [htmlmin](https://github.com/jonschlinkert/gulp-htmlmin), 
  [clean-css](https://www.npmjs.com/package/gulp-clean-css) 
- CSS browser support ([autoprefixer](https://github.com/sindresorhus/gulp-autoprefixer))
- Images optimization ([imagemin](https://github.com/sindresorhus/gulp-imagemin))
- Automatic angular module annotation ([ngAnnotate](https://github.com/Kagami/gulp-ng-annotate))
- Asset revisionning ([rev](https://github.com/sindresorhus/gulp-rev))

#### Libraries
- [UI Bootsrap](https://angular-ui.github.io/bootstrap)
- [Bootstrap](http://getbootstrap.com)
- [Font Awesome](http://fortawesome.github.io/Font-Awesome)
- [AngularJS](https://angularjs.org)
- [Angular-gettext](https://angular-gettext.rocketeer.be)
- [AngularUI Router](https://github.com/angular-ui/ui-router)
- [Lodash](https://lodash.com)
