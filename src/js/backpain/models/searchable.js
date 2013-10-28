/*global define*/
define(function (require) {
    'use strict';

    var Chiropractor = require('chiropractor');
    // integrates Chiropractor.Model
    return Chiropractor.Model.extend({
        url: '',
        defaults: {
            name: '',
            results: []
        }
    });
});