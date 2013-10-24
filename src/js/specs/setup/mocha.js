/*global define*/
define(function(require) {
    'use strict';

    var $ = require('jquery'),
        _ = require('underscore'),
        sinon = require('sinon'),
        Chiropractor = require('chiropractor'),
        window = require('browser').window,
        navigator = require('browser').navigator,
        mocha = require('mocha').mocha,
        afterEach = require('mocha').afterEach,
        beforeEach = require('mocha').beforeEach,
        describe = require('mocha').describe;

    require('jquery.cookie');

    return function() {
        window.debug = typeof(window.debug) !== 'undefined' ?
            window.debug : !!window.location.pathname.match(/debug/);

        /* https://github.com/visionmedia/mocha/wiki/Detecting-global-leaks
         *
        Object.defineProperty(window, "name_of_leaking_property", {
            set : function(value) {
                throw new Error("Leak Detected!");
            }
        });
        */

        // Leak detection really slows down PhantomJS test runs, so we will
        // leave it disabled for now (all developers should be testing in
        // normal browsers that are much faster with this enabled.
        var ignoreLeaks = /PhantomJS/.test(navigator.userAgent);

        // We need to setup Mocha to ignore jquery jsonp callbacks from
        // being memory leaks
        mocha.setup({
            ignoreLeaks: ignoreLeaks,
            globals: [
                'jQuery*', 'XMLHttpRequest'
            ]
        });

        beforeEach(function() {
            var id = _.uniqueId('Test');

            this.domContainer = $(
                '<div class="testsuiteSandboxContainer testsuiteTest' +
                id + '">' +
                '<h2>' + this.currentTest.title + '</h2>' +
                '</div>'
                );
            this.dom = $('<div class="testsuiteSandbox"></div>');
            this.dom.attr('id', 'testsuiteSandbox' + id);
            this.domEl = this.dom[0];
            this.domId = '#' + this.dom.attr('id');
            this.domContainer.append(this.dom);
            $('body').append(this.domContainer);

            this.sandbox = sinon.sandbox.create();
            this.server = sinon.fakeServer.create();
        });

        afterEach(function() {
            if (!window.debug) {
                this.domContainer.remove();
            }
            else if (this.dom.html() === '') {
                this.domContainer.remove();
            }
            else if (this.currentTest.state === 'failed') {
                this.domContainer.css('background-color', '#F0443C');
            }

            _(_($.cookie()).keys()).each(function(key) {
                if (key.length > 0) {
                    $.removeCookie(key);
                }
            });

            this.sandbox.restore();
            this.server.restore();
        });

        require('specs/setup/events')();
    };
});
