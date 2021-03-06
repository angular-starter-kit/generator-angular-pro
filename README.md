# generator-angular-pro

[![NPM version](https://img.shields.io/npm/v/generator-angular-pro.svg)](https://www.npmjs.com/package/generator-angular-pro)
[![Build status](https://img.shields.io/travis/angular-starter-kit/generator-angular-pro/master.svg)](https://travis-ci.org/angular-starter-kit/generator-angular-pro)
[![Downloads](https://img.shields.io/npm/dt/generator-angular-pro.svg)](https://npmjs.org/package/generator-angular-pro)

Web/mobile Angular project generator for *scalable*, *enterprise-grade* applications.

Includes modern (and stable) tools and workflow, best practices, base template and an exhaustive documentation.
Get started quickly even with beginner teams, in any work environment (proxy included).

Built on experience with large web projects, with architecture choices aiming for a clean, no-brainer development
experience.

See generated project example [here](https://github.com/angular-starter-kit/starter-kit).

![logo](https://raw.githubusercontent.com/angular-starter-kit/starter-kit/gh-pages/assets/angular-starter-kit-256.png)

# Getting started

1. Install required tools:
  ```
  npm install -g yo gulp bower generator-angular-pro
  ```

2. Create your application:
  ```
  yo angular-pro
  ```

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
dist/                   compiled version (www/ for mobile projects)
typings/                TypeScript definitions
reports/                test and coverage reports + generated documentation
platforms/              Cordova platform-specific projects (for mobile projects)
plugins/                Cordova plugins (for mobile projects)
resources/              icon and splash screen resources (for mobile projects)
gulpfile.config.js      gulp tasks configuration
```

# Coding guides

- [JavaScript](generators/app/templates/docs/coding-guides/javascript.md)
- [TypeScript](generators/app/templates/docs/coding-guides/typescript.md)
- [CSS](generators/app/templates/docs/coding-guides/css.md)
- [HTML](generators/app/templates/docs/coding-guides/html.md)
- [Unit tests](generators/app/templates/docs/coding-guides/unit-tests.md)
- [End-to-end tests](generators/app/templates/docs/coding-guides/e2e-tests.md)

# Additional documentation

- [Cordova](generators/app/templates/_mobile/docs/cordova.md) (for mobile projects)
- [Build environments](generators/app/templates/docs/build-environments.md)
- [i18n](generators/app/templates/docs/i18n.md)
- [Proxy configuration](generators/app/templates/docs/proxy.md)
- [Updating dependencies](generators/app/templates/docs/updating.md)

# Features

- [TypeScript](http://www.typescriptlang.org), [Sass](http://sass-lang.com/), pure HTML
- [Gettext](https://angular-gettext.rocketeer.be) for translations
- [TSLint](https://github.com/palantir/tslint)
- Unit tests ([Jasmine](http://jasmine.github.io))
- End-to-end tests ([Protractor](https://github.com/angular/protractor))
- Development server with API proxy and live reload ([BrowserSync](http://www.browsersync.io))
- Automatic CSS browser support with [autoprefixer](https://github.com/sindresorhus/gulp-autoprefixer)
- Automatic Angular modules annotation ([ngAnnotate](https://github.com/Kagami/gulp-ng-annotate))
- Production code and assets optimization:
  * Bundling with [useref](https://github.com/jonkemp/gulp-useref)
  * Minification of JavaScript, CSS and HTML
  * Images optimization ([imagemin](https://github.com/sindresorhus/gulp-imagemin))
  * Asset revisionning ([rev](https://github.com/sindresorhus/gulp-rev))
- i18n workflow (https://angular-gettext.rocketeer.be)
- Multiple build environments management
- Task automation with [gulp](http://gulpjs.com)

# Libraries

- [AngularJS](https://angularjs.org)
- [Angular-gettext](https://angular-gettext.rocketeer.be)
- [AngularUI Router](https://github.com/angular-ui/ui-router)
- [Lodash](https://lodash.com)
- [ngCordova](http://ngcordova.com/) (for mobile projects)
- UI based on Bootstrap...
  * [UI Bootsrap](https://angular-ui.github.io/bootstrap)
  * [Bootstrap](http://getbootstrap.com)
  * [Font Awesome](http://fortawesome.github.io/Font-Awesome)
- ... or Ionic
  * [Ionic](http://ionicframework.com/)

# License

MIT
