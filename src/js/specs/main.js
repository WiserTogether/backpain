/*global define*/
define(function(require) {
    'use strict';

    var describe = require('mocha').describe;

    return function() {
        describe('lib', function() {
            describe('select2', function() {
                require('specs/lib/select2')();
            });
        });
    };
});
