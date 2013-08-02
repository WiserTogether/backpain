/*global define*/
define(function(require) {
    'use strict';

    var browser = require('browser'),
        expect;

    // Old Versions of IE (7,8) do not support Chai (it relies on
    // Object.defineProperty) so we must fall back to using ExpectJS which is
    // MUCH slower and less featureful then Chai. We want all non-crappy
    // browsers to continue to use Chai for the performance. We can stub out
    // any API sugar that we want from Chai into ExpectJS
    if (browser.isOldIE) {
        /* ExpectJS Definitins */
        var expectjs = require('expectjs');
        expectjs.Assertion.prototype.gte = function(n) {
            this.assert(
                this.obj >= n,
                function() {
                    return 'expected ' + this.obj +
                            ' to be above or equal to ' + n;
                },
                function() {
                    return 'expected ' + this.obj +
                            ' to be below or equal to ' + n;
                }
            );
            return this;
        };

        expectjs.Assertion.prototype.closeTo = function(expected, delta) {
            this.assert(
                Math.abs(this.obj - expected) <= delta,
                function() {
                    return 'expected ' + this.obj + ' to be close to ' +
                        expected + ' +/- ' + delta;
                },
                function() {
                    return 'expected ' + this.obj + ' not to be close to ' +
                        expected + ' +/- ' + delta;
                }
            );
            return this;
        };

        expect = expectjs;
    }
    else {
        /* Chai Definitions */
        var chai = require('chai');
        chai.Assertion.prototype.throwError = chai.Assertion.prototype['throw'];

        expect = chai.expect;
    }

    return expect;
});
