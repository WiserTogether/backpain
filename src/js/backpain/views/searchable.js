define(function (require) {
  'use strict';

  var Base = require("backpain/views/base"),
    _ = require('underscore'),
    Chiropractor = require('chiropractor'),
    App = require('backpain/app'),
    template = require('hbs!../templates/base'),
    SearchableCollection = require("backpain/collections/searchableCollection"),
    Searchable;

  Searchable = Base.extend({
    template: template,
    initialize: function () {
      var args = _.clone(arguments);
      Base.prototype.initialize.apply(this, arguments);
      this.listenTo(this, 'renderSelectOnDemand', this.renderSelectOnDemand);
    },
    // Generic Render of Select on Demand
    renderSelectOnDemand: function (options) {
      // Requires 3 fields set in the options
      // field - field in the model to set will always be an array for now
      // target - the jquery target selector
      // query - the type of query on the server
      // model - the model to modify
      if (options.field && options.target && options.query && options.model) {
          var field = options.field,
          target = options.target,
          query = options.query,
          model = options.model,
          mappeditems = model.get(field),
          that = this;
        if (!mappeditems) {
          model.set(field, []);
          mappeditems = [];
        }
        $(target).select2({
          placeholder: 'Search',
          multiple: true,
          allowClear: true,
          height: '50px',
          width: '350px',
          overflow: 'auto',
          minimumInputLength: 2,
          query: function (query) {
            var search = new SearchableCollection({
            });
            search.url = App.settings.API_ROOT + options.query + query.term;
            search.fetch().done(function () {
              var results = {};
              var rows = [];
              _.each(search.models, function (item) {
                var current = {
                  id: item.get('id'),
                  text: item.get('name')
                };
                rows.push(current);
              });
              results.results = rows;

              query.callback(results);
            });

          },
          initSelection: function (element, callback) {
            var selection = [];
            _.each(mappeditems, function (item) {
              selection.push({
                id: item.id,
                text: item.name
              });
            });
            callback(selection);
          },
          dropdownCssClass: "bigdrop",
          escapeMarkup: function (m) {
            return m;
          }
        });
        $(target).on("change", function (e) {
          var mappeditems = model.get(field);
          if (!mappeditems) {
            model.set(field, []);
            mappeditems = [];
          }
          if (e.added) {
            var selected = e.added;
            mappeditems.push({
              id: selected.id,
              name: selected.text
            });
            model.set(field, mappeditems);
            var options = {
                id: selected.id,
                name: selected.name
            };
            that.trigger('renderTable',options);
          }
          if (e.removed) {
            var index = -1;
            _.each(mappeditems, function (item) {
              if (item.id === e.removed.id) {
                index = mappeditems.indexOf(item);
              }
            });
            if (index !== -1) {
              mappeditems.splice(index, 1);
            }
            model.set(field, mappeditems);
          }
          var result = model.get(field);
        });
      }
    }
  });

  return Searchable;
});