# Gulp

The build system of this project is based on [Gulp](http://gulpjs.com), to automate the development and build workflow.

The various tasks described here are defined in modules located in the `gulp/` folder. You can read more about how to
customize them and define your own tasks in the
[Gulp documentation](https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md).

## Default task
```
gulp
```

Build and optimize the current project, ready for deployment.
This includes linting as well as image, script, stylesheet and HTML optimization and minification.

## Main tasks

Task       | Description
-----------|----------------------------------------------------------------------------------------------------------
serve      | Launch a web server with live reload and open app in browser.
serve:dist | Launch a web server using dist files with live reload and open app in browser.
build      | Build and optimize the current project, ready for deployment. This includes linting as well as image, script, stylesheet and HTML optimization and minification.
clean      | Delete temporary files and dist files.

When building the application, you can specify the target environment using the flag `--environment <name>`.

The default build environment is `production`. See [this documentation](docs/build-environments.md) for more details
about multiple build environments management.

You can disable opening automatically your default browser when using the `serve` commands by using the flag
`--skip-open`.

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
scripts     | Convert all *.ts found in project to js in the temporary folder.
tsd         | Download and update all TypeScript definitions for Bower dependencies.
tsd:restore | Download TypeScript definitions according to tsd.json.
tsd:clean   | Delete downloaded TypeScript definitions.

## Build and assets

Task         | Description
-------------|--------------------------------------------------------------------------------------------------------
build:source | Build and optimize all source files, excluding assets.
partials     | Put all .html found in project folder + in temporary folder in a template cache file.
styles       | Generate main CSS file using project main style file.
fonts        | Copy fonts from bower dependencies in dist folder.
images       | Compress images (using imagemin) then copy them in dist folder.
other        | Copy project fonts and other misc files in dist folder.

<% if (props.target !== 'web') { -%>
## Cordova

Task                                  | Description
--------------------------------------|-------------------------------------------------------------------------------
cordova:build                         | Build the apps for development.
cordova:release                       | Build the apps and sign them for app store publication.
cordova:prepare                       | Restore cordova platforms and plugins if needed and prepare for build.
cordova:remove                        | Remove cordova `plaforms/` and `plugins/` folders.
cordova:resources                     | Compress resources (using imagemin) then copy in temp folder.
build:&lt;ios&#124;android>           | Build the iOS or Android app for development.
run:&lt;ios&#124;android> [--device]  | Run the iOS or Android app in emulator (or device with the `--device` option).
release:&lt;ios&#124;android>         | Build the iOS or Android app and sign it for app store publication.
cordova --command="&lt;command>"      | Executes any cordova command (see [cordova-cli](https://github.com/apache/cordova-cli)).

Note that all the cordova tasks support a `--fast` option that allows to skip the rebuild of the source folder and
the resources compression. Use it only when your know that the sources have not changed.
<% } -%>
