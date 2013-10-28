/*global define*/
define(function (require) {
  'use strict';

  var App = require('backpain/app'),
    Chiropractor = require('chiropractor'),
    Router = require('backpain/router');

  // Start the router
  var router = new Router.Router();
  Chiropractor.history.stop();
  Chiropractor.history.start();
  App.router = router;
  // Store a ref to the views
  App.Views = Router.Views;

  return App;
});