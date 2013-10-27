define(function (require) {
  'use strict';

  var $ = require('jquery'),
    _ = require("underscore"),
    Table = require("backpain/views/table"),
    template = require('hbs!./../../templates/search/index'),
    View;

  View = Table.extend({
    template: template
  });

  return View;
});