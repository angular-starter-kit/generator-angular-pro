# Starter kit

[![Join the chat at https://gitter.im/thales-poles-ra/starter-kit](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/thales-poles-ra/starter-kit?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

Web project starter kit including tooling, best practices and project seed.

It is based on experience in large web projects, with architecture choices aiming for a clean, no-brainer development
experience even for beginner teams.

# Getting started

1. Install required tools `gulp` and `bower`:
```
npm install -g gulp bower
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
dist/                   compiled version
typings/                TypeScript definitions
reports/                test and coverage reports + generated documentation
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
tsd         | Download all TypeScript definitions for Bower dependencies.
docs        | Generate jsdoc documentation from sources.

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
- [Jade](http://jade-lang.com), HTML
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
- [JSDoc](http://usejsdoc.org) generation with angular support

#### Build
- JS+CSS+HTML bundling and minification ([useref](https://github.com/jonkemp/gulp-useref), 
  [uglify](https://github.com/terinjokes/gulp-uglify), 
  [minify-html](https://github.com/murphydanger/gulp-minify-html), 
  [clean-css](https://github.com/ben-eb/gulp-minify-css)) 
- CSS browser support ([autoprefixer](https://github.com/sindresorhus/gulp-autoprefixer))
- Images optimization ([imagemin](https://github.com/sindresorhus/gulp-imagemin))
- Automatic angular module annotation ([ngAnnotate](https://github.com/Kagami/gulp-ng-annotate))
- Asset revisionning ([rev](https://github.com/sindresorhus/gulp-rev))

#### Libraries
- [AngularJS](https://angularjs.org)
- [Angular-gettext](https://angular-gettext.rocketeer.be)
- [AngularUI Router](https://github.com/angular-ui/ui-router)
- [UI Bootsrap](https://angular-ui.github.io/bootstrap)
- [Bootstrap](http://getbootstrap.com)
- [Font Awesome](http://fortawesome.github.io/Font-Awesome)
- [Lodash](https://lodash.com)

# Roadmap

See the [wiki](https://github.com/thales-poles-ra/starter-kit/wiki).

# License

This starter kit is based on tooling from the
[gulp-angular](https://github.com/Swiip/generator-gulp-angular) Yeoman generator.
Portions of project generator-gulp-angular are Copyright (c) 2014 Matthieu Lux & Mehdy Dara

The MIT License (MIT)

Copyright (c) 2015 Yohan Lasorsa

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


