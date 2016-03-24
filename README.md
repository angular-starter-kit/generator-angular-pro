# generator-angular-pro

Web/mobile Angular project generator for scalable, enterprise-grade applications.

Includes modern (and stable) tools and workflow, best practices, base template and an exhaustive documentation.
It's ready to get started quickly even for beginner teams, in any work environment (proxy included).

Based on experience in large web projects, with architecture choices aiming for a clean, no-brainer development
experience.

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
|- main/                main module, for entry points and global style
|  |- main.config.js    app configuration code
|  |- main.constants.js app configuration constants
|  |- main.module.js    app module definition
|  |- main.routes.js    app routes
|  |- main.run.js       app entry point
|  |- main.wrappers.js  AngularJS module wrappers for external libraries
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
- Task automation with [gulp](http://gulpjs.com)

# Libraries

- [AngularJS](https://angularjs.org)
- [Angular-gettext](https://angular-gettext.rocketeer.be)
- [AngularUI Router](https://github.com/angular-ui/ui-router)
- [Lodash](https://lodash.com)
- [ngCordova](http://ngcordova.com/) (for mobile projects)
- UI based on either Bootstrap...
  * [UI Bootsrap](https://angular-ui.github.io/bootstrap)
  * [Bootstrap](http://getbootstrap.com)
  * [Font Awesome](http://fortawesome.github.io/Font-Awesome)
- ... or Ionic
  * [Ionic](http://ionicframework.com/)

# License

This generator is based on tooling from the
[gulp-angular](https://github.com/Swiip/generator-gulp-angular) Yeoman generator.
Portions of project generator-gulp-angular are Copyright (c) 2014 Matthieu Lux & Mehdy Dara

The MIT License (MIT)

Copyright (c) 2015-2016 Yohan Lasorsa

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.