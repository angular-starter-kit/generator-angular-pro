'use strict';

const _ = require('lodash');
const yosay = require('yosay');
const chalk = require('chalk');
const dir = require('node-dir');
const path = require('path');
const Generator = require('yeoman-generator');

const options = require('./options.json');
const prompts = require('./prompts.json');
const pkg = require('../../package.json');

const excludeFiles = [
  '.DS_Store',
  'Thumbs.db'
];

const nameRules = {
  _mobile:    (props) => props.target !== 'web',
  _web:       (props) => props.target !== 'mobile',
  _bootstrap: (props) => props.ui === 'bootstrap',
  _material:  (props) => props.ui === 'material',
  _ionic:     (props) => props.ui === 'ionic'
};

module.exports = class extends Generator {

  constructor(args, opts) {
    super(args, opts);

    this.argument('appName', {
      desc: 'Name of the application to scaffold',
      type: String,
      required: false
    });

    this.version = pkg.version;

    // Use options from json
    options.forEach((option) => {
      this.option(option.name, {
        type: global[option.type],
        required: option.required,
        desc: option.desc,
        defaults: option.defaults
      });
    });
  }

  info() {
    this.log(yosay(
      chalk.red('Welcome!\n') +
      chalk.yellow('You\'re about to scaffold an awesome application based on Angular!')
    ));
  }

  ask() {
    let processProps = (props) => {
      props.appName = props.appName || this.options.appName;
      props.projectName = _.kebabCase(props.appName);

      this.props = props;
    };

    if (this.options.automate) {
      // Do no prompt, use json file instead
      let props = require(path.resolve(this.options.automate));
      processProps(props);
    } else {
      let namePrompt = _.find(prompts, {name: 'appName'});
      namePrompt.default = path.basename(process.cwd());
      namePrompt.when = () => {
        return !this.options.appName;
      };

      // Use prompts from json
      return this.prompt(prompts).then((props) => {
        processProps(props);
      });
    }
  }

  prepare() {
    return new Promise((resolve) => {
      let filesPath = path.join(__dirname, 'templates');

      dir.files(filesPath, (err, files) => {
        if (err) throw err;

        // Removes excluded files
        _.remove(files, (file) => {
          return !_.every(excludeFiles, (excludeFile) => {
            return !_.includes(file, excludeFile);
          });
        });

        this.files = _.map(files, (file) => {
          let src = path.relative(filesPath, file);
          let isTemplate = _.startsWith(path.basename(src), '_');
          let hasFileCondition = _.startsWith(path.basename(src), '__');
          let hasFolderCondition = _.startsWith(path.dirname(src), '_');
          let dest = path.relative(hasFolderCondition ? path.dirname(src).split(path.sep)[0] : '.', src);

          if (hasFileCondition) {
            let fileName = path.basename(src).replace(/__.*?[.]/, '_');
            dest = path.join(path.dirname(src), fileName);
          }

          if (isTemplate) {
            dest = path.join(path.dirname(dest), path.basename(dest).slice(1));
          }

          return {
            src: src,
            dest: dest,
            template: isTemplate,
            hasFileCondition: hasFileCondition,
            hasFolderCondition: hasFolderCondition
          };
        });

        resolve();
      });
    });
  }

  config() {
    // Generate .yo-rc.json
    this.config.set('version', this.version);
    this.config.set('props', this.props);
    this.config.save();
  }

  write() {
    this.files.forEach((file) => {
      let write = !file.hasFolderCondition || _.every(nameRules, (rule, folder) => {
        return !_.startsWith(path.dirname(file.src), folder) || rule(this.props);
      });

      write = write && (!file.hasFileCondition || _.every(nameRules, (rule, prefix) => {
        return !_.startsWith(path.basename(file.src), '_' + prefix) || rule(this.props);
      }));

      if (write) {
        try {
          if (file.template) {
            this.fs.copyTpl(this.templatePath(file.src), this.destinationPath(file.dest), this);
          } else {
            this.fs.copy(this.templatePath(file.src), this.destinationPath(file.dest));
          }
        } catch (error) {
          console.error('Template processing error on file', file.src);
          throw error;
        }
      }
    });
  }

  install() {
    // Launch npm, bower and tsd installs if not skipped
    this.installDependencies({
      skipInstall: this.options['skip-install'],
      skipMessage: this.options['skip-message'],
      callback: () => {
        if (!this.options['skip-install']) {
          this.spawnCommandSync('gulp', ['tsd:restore']);

          // Prepare Cordova platforms
          if (this.props.target !== 'web') {
            this.spawnCommandSync('gulp', ['cordova:prepare']);
          }
        }
      }
    });
  }

  end() {
    this.log('\nAll done! Get started with these gulp tasks:');
    this.log('- `$ ' + chalk.green('gulp') + '` to build an optimized version of your application');
    this.log('- `$ ' + chalk.green('gulp serve') + '` to start dev server on your source files with live reload');
    this.log('- `$ ' + chalk.green('gulp serve:dist') + '` to start dev server on your optimized application without live reload');
    this.log('- `$ ' + chalk.green('gulp test') + '` to run your unit tests');
    this.log('- `$ ' + chalk.green('gulp test:auto') + '` to run your unit tests with in watch mode');
    this.log('- `$ ' + chalk.green('gulp protractor') + '` to launch your e2e tests');
    this.log('- `$ ' + chalk.green('gulp protractor:dist') + '` to launch your e2e tests on your optimized application');
    this.log('\nSee more in docs and coding guides:');

    if (this.props.target !== 'web') {
      this.log(chalk.underline('https://github.com/angular-starter-kit/starter-kit/tree/mobile\n'));
    } else {
      this.log(chalk.underline('https://github.com/angular-starter-kit/starter-kit\n'));
    }
  }

};
