/*global define*/
(function(window) {
    'use strict';

    define(function(require) {
        return {
            describe: window.describe,
            it: window.it,
            beforeEach: window.beforeEach,
            afterEach: window.afterEach,
            mocha: window.mocha
        };
    });
}(this));
