/*global define*/
define(function (require) {
  'use strict';
  // This acts as a singleton to our App and constants
  var spf = {},
  Backpain = spf,
  _ = require('underscore'),
  API_ROOT = 'http://rodin-admin.cloud.wiser-ci.com/api/v1/';

  Backpain.settings = _.extend({
    // core settings (set from config)
    API_ROOT: API_ROOT
  });


  return Backpain;
});