/*global define*/
define(function(require) {
    'use strict';

    var _ = require('underscore'),
        Chiropractor = require('chiropractor'),
        Newsletter;

    Newsletter = Chiropractor.Model.extend({
        validation: {
            email: [{
                required: true,
                msg: 'Please enter an email address'
            }, {
                pattern: 'email',
                msg: 'Please enter a valid email'
            }],
            address: {
                required: true,
                msg: 'Please enter your mailing address'
            }
        }
    });

    return {
        Newsletter: Newsletter
    };
});
