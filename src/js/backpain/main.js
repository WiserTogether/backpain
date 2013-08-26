/*global define*/
define(function(require) {
    'use strict';

    var _ = require('underscore'),
       $ = require('jquery'),
       Chiropractor = require('chiropractor'),
       Views = require('backpain/views'),
       Models = require('backpain/models'),
       Router;

    Router = Chiropractor.Router.extend({
        routes: {
            '': 'home'
        },

        initialize: function() {
            this.view = new Views.Main();
            $('#page-layout').html(this.view.render().el);
        },

        home: function() {
            var model = new Models.Newsletter();
            var view = new Views.Home({
                model: model
            });
            $('article[role="main"]').html(view.render().el);
        }
    });

    return {
        initialize: function(options) {
            options = options || {};
            _(options).defaults({
                urlRoot: ''
            });

            var router = new Router();

            Chiropractor.history.start({
                pushState: true,
                root: options.urlRoot
            });

            return router;
        }
    };
});
