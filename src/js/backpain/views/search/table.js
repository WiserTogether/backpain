define(function (require) {
  'use strict';

  var $ = require('jquery'),
    _ = require("underscore"),
    Base = require("backpain/views/base"),
    template = require('hbs!./../../templates/search/table'),
    View;

  View = Base.extend({
    template: template
  });

  return View;
});