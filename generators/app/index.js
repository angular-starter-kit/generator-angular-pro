'use strict';

var _ = require('lodash');
var yosay = require('yosay');
var chalk = require('chalk');
var dir = require('node-dir');
var path = require('path');
var generators = require('yeoman-generator');

var options = require('./options.json');
var prompts = require('./prompts.json');
var pkg = require('../../package.json');

var excludeFiles = [
  '.DS_Store',
  'Thumbs.db'
];

var folderRules = {
  _mobile:    function(props) { return props.target.key !== 'web'; },
  _web:       function(props) { return props.target.key !== 'mobile'; },
  _bootstrap: function(props) { return props.ui.key === 'bootstrap'; },
  _ionic:     function(props) { return props.ui.key === 'ionic'; }
};

var Generator = generators.Base.extend({

  constructor: function() {
    generators.Base.apply(this, arguments);

    this.argument('appName', {
      desc: 'Name of the application to scaffold',
      type: String,
      required: false
    });

    this.version = pkg.version;

    // Use options from json
    options.forEach(function(option) {
      this.option(option.name, {
        type: global[option.type],
        required: option.required,
        desc: option.desc,
        defaults: option.defaults
      });
    }, this);
  },

  info: function() {
    this.log(yosay(
      chalk.red('Welcome!\n') +
      chalk.yellow('You\'re about to scaffold an awesome application based on Angular!')
    ));
  },

  ask: function() {
    var self = this;
    var done = this.async();

    var namePrompt = _.find(prompts, {name: 'appName'});
    namePrompt.default = path.basename(process.cwd());
    namePrompt.when = function() {
      return !self.appName;
    };

    // Conditional prompts
    _.find(prompts, {name: 'ui'}).when = function(props) {
      return props.target.key === 'both';
    };

    // Use prompts from json
    this.prompt(prompts, function(props) {
      if (props.target.key === 'web') {
        props.ui = {key: 'bootstrap'};
      } else if (props.target.key === 'mobile') {
        props.ui = {key: 'ionic'};
      }

      props.appName = props.appName || this.appName;
      props.projectName = {key: _.kebabCase(props.appName)};

      console.log('name: ' + props.appName);
      console.log('pname:' + props.projectName.key);

      this.props = props;

      done();
    }.bind(this));
  },

  prepare: function() {
    var done = this.async();
    var filesPath = path.join(__dirname, 'templates');
    var self = this;

    dir.files(filesPath, function(err, files) {
      if (err) throw err;

      // Removes excluded files
      _.remove(files, function(file) {
        return !_.every(excludeFiles, function(excludeFile) {
          return !_.includes(file, excludeFile);
        });
      });

      self.files = _.map(files, function(file) {
        var src = path.relative(filesPath, file);
        var isTemplate = _.startsWith(path.basename(src), '_');
        var hasCondition = _.startsWith(path.dirname(src), '_');
        var dest = path.relative(hasCondition ? path.dirname(src).split(path.sep)[0] : '.', src);

        if (isTemplate) {
          dest = path.join(path.dirname(dest), path.basename(dest).slice(1));
        }

        return {
          src: src,
          dest: dest,
          template: isTemplate,
          hasCondition: hasCondition
        };
      });

      done();
    });
  },

  config: function() {
    // Generate .yo-rc.json
    this.config.set('version', this.version);
    this.config.set('props', this.props);
    this.config.save();
  },

  write: function() {
    var self = this;
    this.files.forEach(function(file) {
      var write = !file.hasCondition || _.every(folderRules, function(rule, folder) {
          return !_.startsWith(path.dirname(file.src), folder) || rule(self.props);
      });

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
    }, this);
  },

  install: function() {
    var self = this;

    // Launch npm, bower and tsd installs if not skipped
    this.installDependencies({
      skipInstall: this.options['skip-install'],
      skipMessage: this.options['skip-message'],
      callback: function() {
        if (!self.options['skip-install']) {
          self.spawnCommandSync('gulp', ['tsd:restore']);

          // Prepare Cordova platforms
          if (self.props.target.key !== 'web') {
            self.spawnCommandSync('gulp', ['cordova:prepare']);
          }
        }
      }
    });
  },

  end: function() {
    this.log('\nAll done! Get started with these gulp tasks:');
    this.log('- `$ ' + chalk.green('gulp') + '` to build an optimized version of your application');
    this.log('- `$ ' + chalk.green('gulp serve') + '` to start dev server on your source files with live reload');
    this.log('- `$ ' + chalk.green('gulp serve:dist') + '` to start dev server on your optimized application without live reload');
    this.log('- `$ ' + chalk.green('gulp test') + '` to run your unit tests');
    this.log('- `$ ' + chalk.green('gulp test:auto') + '` to run your unit tests with in watch mode');
    this.log('- `$ ' + chalk.green('gulp protractor') + '` to launch your e2e tests');
    this.log('- `$ ' + chalk.green('gulp protractor:dist') + '` to launch your e2e tests on your optimized application');
    this.log('\nSee more in docs and coding guides:');

    if (this.props.target.key !== 'web') {
      this.log(chalk.underline('https://github.com/sinedied/starter-kit/tree/mobile\n'));
    } else {
      this.log(chalk.underline('https://github.com/sinedied/starter-kit\n'));
    }
  }

});

module.exports = Generator;
