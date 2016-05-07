'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.Base.extend({

  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the dazzling ' + chalk.red('generator-rsx-plugin') + ' generator!'
    ));

    var prompts = [{
      type    : 'input',
      name    : 'name',
      message : 'Plugin name',
      default : this.appname // Default to current folder name
    },{
      type    : 'input',
      name    : 'description',
      message : 'Plugin description',
      default : '',
    },{
      type    : 'input',
      name    : 'url',
      message : 'Repository URL',
      default : '' // Default to current folder name
    },{
      type    : 'input',
      name    : 'authorName',
      message : 'Author name',
      default: this.user.git.name(),
    },{
      type    : 'input',
      name    : 'authorEmail',
      message : 'Author email',
      default: this.user.git.email(),
    }];

    this.prompt(prompts, function (props) {
      this.props = props;
      done();
    }.bind(this));
  },

  writing: function () {
    this.fs.copyTpl(
      this.templatePath('**/!(*.js|*.map|*.src)'),
      this.destinationPath(this.destinationRoot()),
      this.props
    );
    this.fs.copyTpl(
      this.templatePath('index.js'),
      this.destinationPath('index.js'),
      this.props
    );
    this.fs.copyTpl(
      this.templatePath('src/plugin.js'),
      this.destinationPath(`src/${this.props.name}.js`),
      this.props
    );
  },

  install: function () {
    this.installDependencies();
  }
});
