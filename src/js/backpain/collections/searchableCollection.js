define(function (require) {
  'use strict';

  var Chiropractor = require('chiropractor');

  return Chiropractor.Collection.extend({
    model: require('backpain/models/searchable'),
    parse: function (response) {

      return response.results;
    }
  });
});