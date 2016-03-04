[Documentation](https://github.com/gulpjs/gulp/blob/master/docs/README.md)

## Default command

```sh
$ gulp
```

Build and optimize the current project, ready for deployment.
This includes linting as well as image, script, stylesheet and HTML optimization and minification.


## Main commands

Task       | Description
-----------|----------------------------------------------------------------------------------------------------------
serve      | Launch a web server with live reload and open app in browser.
serve:dist | Launch a web server using dist files with live reload and open app in browser.
build      | Build and optimize the current project, ready for deployment. This includes linting as well as image, script, stylesheet and HTML optimization and minification.
clean      | Delete temporary files and dist files.

## Tests

Task                 | Description
---------------------|------------------------------------------------------------------------------------------------
test                 | Launch unit tests using karma and jasmine.
test:auto            | Launch karma server and trigger unit tests after each change in project file.
protractor           | Launch e2e tests using protractor.
protractor:dist      | Launch e2e tests using protractor, using dist files.
webdriver:update     | Download/Update selenium standalone and chromedriver.
webdriver:standalone | Launch a standalone selenium server.

## Translations

Task                 | Description
---------------------|------------------------------------------------------------------------------------------------
translations         | Generate translations file in .tmp that will be used by server.
translations:extract | Extract Messages from Code and Templates to template.pot.

## TypeScript

Task        | Description
------------|---------------------------------------------------------------------------------------------------------
typescript  | Convert all *.ts found in project to js in the temporary folder.
tsd         | Download all TypeScript definitions for Bower dependencies.
tsd:clean   | Delete downloaded TypeScript definitions.

## HTML / Jade

Task     | Description
---------|------------------------------------------------------------------------------------------------------------
partials | Put all .html found in project folder + in temporary folder in a template cache file.
jade     | Convert all .jade found in project to HTML in the temporary folder.

## Build and assets

Task         | Description
-------------|--------------------------------------------------------------------------------------------------------
build:source | Build and optimize all source files, excluding assets.
styles       | Generate main CSS file using project main style file.
fonts        | Copy fonts from bower dependencies in dist folder.
images       | Compress images (using imagemin) then copy them in dist folder.
other        | Copy project fonts and other misc files in dist folder.

## Documentation

Task    | Description
--------|-------------------------------------------------------------------------------------------------------------
docs    | Generate jsdoc documentation from sources.
