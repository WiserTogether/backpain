define(function (require) {
  'use strict';

  var Searchable = require("backpain/views/searchable"),
    Table = require('backpain/views/search/table'),
    _ = require('underscore'),
    Chiropractor = require('chiropractor'),
    App = require('backpain/app'),
    template = require('hbs!../templates/base'),
    SearchableCollection = require("backpain/collections/searchableCollection"),
    Search = require("backpain/models/searchable"),
    TableView;

  TableView = Searchable.extend({
    template: template,
    initialize: function () {
      var args = _.clone(arguments);
      Searchable.prototype.initialize.apply(this, arguments);
      this.listenTo(this, 'renderTable', this.renderTable);
    },
    // Generic Render of Select on Demand
    renderTable: function (options) {
      var model = new Search();
      model.url = App.settings.API_ROOT + 'topics/topic/' + options.id;

      model.fetch().done(function() {
        var treatments = model.get('relations.condition-treatment.topics');
        var collection = new SearchableCollection();
        _.each(treatments,function(treatment) {
          var treatment = new Search({ name: treatment.name });
          collection.add(treatment);
        });
        var table = new Table({ collection: collection });

        $('#table-container').append(table.render().el);
        console.log(collection);

      });
    }
  });

  return TableView;
});