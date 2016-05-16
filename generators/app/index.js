'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.Base.extend({

    initializing: function () {
        this.pkg = this.fs.readJSON(this.destinationPath('package.json'), {});
    },

    prompting: function () {
        var done = this.async();

        // Have Yeoman greet the user.
        this.log(yosay(
            'Welcome to the dazzling ' + chalk.red('generator-rsx-plugin') + ' generator!'
        ));

        var prompts = [{
            type    : 'input',
            name    : 'name',
            message : 'Plugin name (For example, rsx-plugin-run)',
            default : this.appname.replace(new RegExp(/\s/g), '-') // Default to current folder name
        },{
            type    : 'input',
            name    : 'description',
            message : 'Plugin description',
            default : this.pkg.description || '',
        },{
            type    : 'input',
            name    : 'version',
            message : 'Plugin version',
            default : this.pkg.version || '',
        },{
            type    : 'input',
            name    : 'url',
            message : 'Repository URL',
            default : this.pkg.repository.url.replace(new RegExp(/^(git\+)|(\.git)/g), '') || '',
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
            // Get the name of the command
            this.props.command = this.props.name.split('-').pop();
            done();
        }.bind(this));
    },

    writing: function () {
        this.fs.copy(
            this.templatePath('.*'),
            this.destinationPath(this.destinationRoot())
        );
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
            this.templatePath('src/command.js'),
            this.destinationPath(`src/${this.props.command}.js`),
            this.props
        );
        this.fs.copyTpl(
            this.templatePath('tests/command.spec.js'),
            this.destinationPath(`tests/${this.props.command}.spec.js`),
            this.props
        );
    },

    install: function () {
        // this.installDependencies();
    }
});
