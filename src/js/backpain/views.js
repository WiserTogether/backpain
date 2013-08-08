/*global define*/
define(function(require) {
    'use strict';

    var $ = require('jquery'),
        _ = require('underscore'),
        Chiropractor = require('chiropractor'),
        mainTemplate = require('hbs!./templates/main'),
        headerTemplate = require('hbs!./templates/header'),
        homeTemplate = require('hbs!./templates/home'),
        footerTemplate = require('hbs!./templates/footer'),
        Main, Header, Home, Footer;

    require('lib/select2');

    Main = Chiropractor.View.extend({
        template: mainTemplate
    });

    Header = Chiropractor.View.extend({
        template: headerTemplate
    });

    Home = Chiropractor.Views.Form.extend({
        template: homeTemplate
    });

    Footer = Chiropractor.View.extend({
        template: footerTemplate
    });

    return {
        Main: Main,
        Home: Home,
        Header: Header,
        Footer: Footer
    };
});
