/*global define*/
define(function(require) {
    'use strict';

    var _ = require('underscore'),
       $ = require('jquery'),
       Chiropractor = require('chiropractor'),
       Views = require('backpain/views'),
       Models = require('backpain/models'),
       Searchable = require('backpain/models/searchable'),
       Router;

    Router = Chiropractor.Router.extend({
        routes: {
            '': 'home',
            '#!watch': 'lessWatchRoute',
            'search': 'search',
             '*filter': 'notExistentRoute'
        },
        views: [],
        initialize: function(options) {
            this.view = new Views.Main();
            $('#page-layout').html(this.view.render().el);
            Chiropractor.Router.prototype.initialize.call(this, options);
        },
        search: function() {
            console.log('search');
            var view = new Views.Search({
                }),
            search = new Searchable(),
            options = {
                model: search,
                target: '#search',
                field: 'results',
                query: 'topics?q=type.id:condition%20AND%20'
            };
            this.navigatePage(view);
            view.trigger('renderSelectOnDemand',options);
        },
        home: function() {
            console.log('home');
            var model = new Models.Newsletter();
            var view = new Views.Home({
                model: model
            });
            this.navigatePage(view);
        },
        // Appends a page and adds the view to be removed later
        appendPage: function (elname,view) {
          this.views.push(view);
          $(elname).append(view.render().el);
        },
        // Navigates to a page and adds the view to be removed later
        navigatePage: function (view) {
          this.closeViews();
          this.views.push(view);
          $('article[role="main"]').html(view.render().el);
        },
        closeViews: function () {
          // Call remove on the views currently loaded to clean up
          if (this.views.length > 0) {
            _(this.views).each(function (view) {
              view.remove();
            });
            this.views = [];
          }
        },
        notExistentRoute: function (route) {
          console.error('No route:', route);
        }
    });

    return {
        Router : Router,
        Views: Views,
        Models: Models
    };
});
