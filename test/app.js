'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

describe('generator-research:app', function() {
    before(function() {
        let answers = {
            name: 'rsx-plugin-test',
            description: 'A test plugin for RSX',
            version: '0.1.0',
            url: 'http://react-native-contrib.github.io/rsx/',
            authorName: 'The React Native Contrib Community',
            authorEmail: 'contact@hassankhan.me',
        };
        return helpers.run(path.join(__dirname, '../generators/app'))
            .withPrompts(answers)
            .toPromise();
    });

    it('creates files', function() {
        assert.file([
            'package.json',
        ]);
    });
});
