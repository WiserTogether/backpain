define(function (require) {
  'use strict';

  var $ = require('jquery'),
    _ = require("underscore"),
    Chiropractor = require("chiropractor"),
    template = require('hbs!../templates/base'),
    Base;

  // Base View
  Base = Chiropractor.View.extend({
    template: template
  });

  return Base;
});