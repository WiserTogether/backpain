/*global define*/
define(function(require) {
    'use strict';

    var $ = require('jquery'),
        _ = require('underscore'),
        Chiropractor = require('chiropractor'),
        window = require('browser').window,
        expect = require('expect'),
        afterEach = require('mocha').afterEach,
        beforeEach = require('mocha').beforeEach,
        it = require('mocha').it,
        describe = require('mocha').describe,
        preExistingKey = 'check_pre_existing_leak',
        assert;

    assert = function(condition, message) {
        if (!condition) {
            throw new Error(message);
        }
    };

    Chiropractor.Events.on(preExistingKey, function() {});
    $(window).on(preExistingKey, function() {});

    return function() {
        var checkEventCleanup;

        checkEventCleanup = function() {
            /* Backbone Event Cleanup */
            var backboneListeners = 0,
                jQueryListeners = 0;

            _(this.backboneObjects).each(function(obj) {
                if (obj._events) {
                    _(obj._events).each(function(events, key) {
                        _(events).each(function(event) {
                            if (event.context !== obj && !event.preExisting) {
                                backboneListeners += 1;
                            }
                        }, this);
                    }, this);
                }
            }, this);

            assert(
                backboneListeners === 0,
                'There are still ' + backboneListeners +
                ' active Backbone event listeners created in: ' +
                this.currentTest.title
            );

            /* jQuery Event Cleanup */
            jQueryListeners = 0;
            _(this.jQueryEventObjects).each(function(obj) {
                var events = obj.data('events');
                if (events && _(events).size() > 0) {
                    _(events).each(function(typeEvents, type) {
                        _(typeEvents).each(function(event) {
                            var preExisting = _(this.jQueryGuids)
                                .indexOf(event.guid) === -1;

                            if (preExisting) {
                                // jQuery attaches a global unload handler
                                // for Ajax requests in IE that will never be
                                // unregistered, so we need to ignore that
                                if (obj !== window && type !== 'unload') {
                                    jQueryListeners += 1;
                                }
                            }
                        }, this);
                    }, this);
                }
            }, this);

            assert(
                jQueryListeners === 0,
                'There are still ' + jQueryListeners +
                ' active jQuery event listeners created in: ' +
                this.currentTest.title
            );
        };

        beforeEach(function() {
            var backboneObjects, backboneRegister, backboneEventSpy,
                jQueryEventObjects, fnOn, jQueryGuids;

            /* Backbone Event Spying */
            backboneObjects = this.backboneObjects = [
                Chiropractor.history,
                Chiropractor.Events
            ];

            backboneRegister = function(original) {
                return function() {
                    if (!this._eventLeakRegister) {
                        this._eventLeakRegister = true;
                        backboneObjects.push(this);
                    }
                    original.apply(this, arguments);
                };
            };

            backboneEventSpy = _(function(klass) {
                this.sandbox.stub(klass, 'on', backboneRegister(klass.on));
            }).bind(this);

            backboneEventSpy(Chiropractor.Model.prototype);
            backboneEventSpy(Chiropractor.View.prototype);
            backboneEventSpy(Chiropractor.Collection.prototype);
            backboneEventSpy(Chiropractor.Router.prototype);

            _(backboneObjects).each(function(obj) {
                _(obj._events).each(function(events, type) {
                    _(events).each(function(event) {
                        event.preExisting = true;
                    });
                });
            });

            /* jQuery Event Spying */
            jQueryEventObjects = this.jQueryEventObjects = [];

            fnOn = $.fn.on;
            jQueryGuids = this.jQueryGuids = [];
            this.sandbox.stub($.fn, 'on', function() {
                if (!this._eventLeakRegister) {
                    this._eventLeakRegister = true;
                    jQueryEventObjects.push(this);

                    var events = this.data('events');
                    if (events) {
                        _(events).each(function(typeEvents, type) {
                            _(typeEvents).each(function(event) {
                                jQueryGuids.push(event.guid);
                            });
                        });
                    }
                }

                return fnOn.apply(this, arguments);
            });
        });

        afterEach(function() {
            checkEventCleanup.call(this);
        });

        describe('setup', function() {
            describe('events', function() {
                beforeEach(function() {
                    this.check = _(function() {
                        checkEventCleanup.call(this);
                    }).bind(this);

                    this.noop = function() {};
                });

                it('should exclude pre-existing Backbone events from being ' +
                    'considered leaks', function() {
                    var noop = function() {};

                    expect(Chiropractor.Events._events[preExistingKey])
                        .to.be.an('array');

                    expect(Chiropractor.Events._events[preExistingKey].length)
                        .to.equal(1);

                    expect(this.check).to.not.throwError();

                    Chiropractor.Events.on(preExistingKey, noop);

                    try {
                        expect(Chiropractor.Events._events[preExistingKey].length)
                            .to.equal(2);

                        expect(this.check).to.throwError();

                        Chiropractor.Events.off(preExistingKey, noop);

                        expect(Chiropractor.Events._events[preExistingKey].length)
                            .to.equal(1);

                        expect(this.check).to.not.throwError();
                    }
                    finally {
                        Chiropractor.Events.off(preExistingKey, noop);
                    }
                });

                it('should exclude pre-existing jQuery events from being ' +
                    'considered leaks', function() {
                    var noop = function() {};
                    var el = $(window);

                    expect(el.data('events')[preExistingKey])
                        .to.be.an('array');

                    expect(el.data('events')[preExistingKey].length)
                        .to.equal(1);

                    expect(this.check).to.not.throwError();

                    el.on(preExistingKey, noop);

                    try {
                        expect(el.data('events')[preExistingKey].length)
                            .to.equal(2);

                        expect(this.check).to.throwError();

                        el.off(preExistingKey, noop);

                        expect(el.data('events')[preExistingKey].length)
                            .to.equal(1);

                        expect(this.check).to.not.throwError();
                    }
                    finally {
                        el.off(preExistingKey, noop);
                    }
                });

                it('should raise an exception if all Backbone.Model events ' +
                   'are not unregistered', function() {
                       this.model = new Chiropractor.Model();
                       this.model.on('change', this.noop);

                       expect(this.check).to.throwError();

                       this.model.off('change', this.noop);

                       expect(this.check).to.not.throwError();
                   });

                it('should raise an exception if all Backbone.View events ' +
                   'are not unregistered', function() {
                       this.view = new Chiropractor.View();
                       this.view.$el.off('remove', this.view.remove);

                       this.view.on('change', this.noop);

                       expect(this.check).to.throwError();

                       this.view.off('change', this.noop);

                       expect(this.check).to.not.throwError();
                   });

                it('should raise an exception if all Backbone.Collection ' +
                   'events are not unregistered', function() {
                       this.collection = new Chiropractor.Collection();
                       this.collection.on('change', this.noop);

                       expect(this.check).to.throwError();

                       this.collection.off('change', this.noop);

                       expect(this.check).to.not.throwError();
                   });

                it('should raise an exception if all Backbone.Router ' +
                   'events are not unregistered', function() {
                       this.router = new Chiropractor.Router();
                       this.router.on('change', this.noop);

                       expect(this.check).to.throwError();

                       this.router.off('change', this.noop);

                       expect(this.check).to.not.throwError();
                   });

                it('should raise an exception if all Backbone.Events ' +
                   'events are not unregistered', function() {
                       Chiropractor.Events.on('change', this.noop);

                       expect(this.check).to.throwError();

                       Chiropractor.Events.off('change', this.noop);

                       expect(this.check).to.not.throwError();
                   });

                it('should raise an exception if all Backbone.history ' +
                   'events are not unregistered', function() {
                       Chiropractor.history.on('change', this.noop);

                       expect(this.check).to.throwError();

                       Chiropractor.history.off('change', this.noop);

                       expect(this.check).to.not.throwError();
                   });

                it('should raise an exception if all jQuery ' +
                    'events registerd with $(...).on(...) are not ' +
                    'unregistered', function() {
                        $(window).on('resize', this.noop);

                        expect(this.check).to.throwError();

                        $(window).off('resize', this.noop);

                        expect(this.check).to.not.throwError();
                    });

                it('should raise an exception if all jQuery ' +
                   'events registered with $(...).ACTION(...) are not ' +
                   'unregisterd', function() {
                        $(window).click(this.noop);

                        expect(this.check).to.throwError();

                        $(window).off('click', this.noop);

                        expect(this.check).to.not.throwError();
                   });
            });
        });
    };
});
