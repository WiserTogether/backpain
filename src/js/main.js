(function() {
    'use strict';

    var root = this,
    require = root.require;

    require.config({
        packages: [
            'backpain'
        ],

        hbs: {
            disableI18n: true,
            disableHelpers: true
        },

        paths: {
            'chiropractor':         '../components/chiropractor/chiropractor',
            'handlebars':           '../components/require-handlebars-plugin/Handlebars',
            'hbs':                  '../components/require-handlebars-plugin/hbs',
            'i18nprecompile':       '../components/require-handlebars-plugin/hbs/i18nprecompile',
            'json2':                '../components/require-handlebars-plugin/hbs/json2',
            'json3':                '../components/json3/lib/json3',
            'underscore':           '../components/underscore/underscore',
            'jquery':               '../components/jquery/jquery',
            'jquery.cookie':        '../components/jquery.cookie/jquery.cookie'
        },

        pragmasOnSave: {
            excludeHbsParser : true,
            excludeHbs: true,
            excludeAfterBuild: true
        },

        skipModuleInsertion: false,
        wrap: true,

        shim: {
            'underscore': {
                exports: '_'
            },
            json3: {
                exports: 'JSON'
            },
            'jquery.cookie': {
                deps: ['jquery'],
                exports: 'jQuery.cookie'
            }
        },

        deps: [
            'hbs'
        ],

        enforceDefine: true
    });

    var count = 0,
        updateModuleProgress = function(context, map, depMaps) {
        count++;
        var fetched = Object.keys(context.urlFetched).length,
        el = root.document.getElementById('requirejs-progress');

        if (fetched > 0) {
            el.style.width = Math.max(100, count / fetched) + '%';
        }
    };


    require.onResourceLoad = function(context, map, depMaps) {
        if (map.parentMap) {
            updateModuleProgress(context, map, depMaps);
        }
    };

    define(function(require) {
        var Backpain = require('backpain');
        Backpain.initialize();
    });
}).call(this);
