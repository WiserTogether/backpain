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
            'chiropractor':    '../components/chiropractor/chiropractor',
            'handlebars':      '../components/require-handlebars-plugin/Handlebars',
            'hbs':             '../components/require-handlebars-plugin/hbs',
            'i18nprecompile':  '../components/require-handlebars-plugin/hbs/i18nprecompile',
            'json':            '../components/requirejs-plugins/src/json',
            'text':            '../components/requirejs-plugins/lib/text',
            'json2':           '../components/require-handlebars-plugin/hbs/json2',
            'json3':           '../components/json3/lib/json3',
            'underscore':      '../components/underscore/underscore',
            'jquery':          '../components/jquery/jquery',
            'select2':         '../components/select2/select2',
            'jquery.cookie':   '../components/jquery.cookie/jquery.cookie'
        },

        pragmasOnSave: {
            excludeHbsParser: true,
            excludeHbs: true,
            excludeAfterBuild: true
        },

        skipModuleInsertion: false,
        wrap: true,

        shim: {
            'underscore': {
                exports: '_'
            },
            'chiropractor': {
                deps: ['underscore']
            },
            json3: {
                exports: 'JSON'
            },
            'select2': {
                deps: ['jquery'],
                exports: 'jQuery.fn.select2'
            },
            'jquery.cookie': {
                deps: ['jquery'],
                exports: 'jQuery.cookie'
            }
        },

        deps: [
            'hbs',
            'underscore'
        ],

        enforceDefine: true
    });

    var count = 0,
        updateModuleProgress = function(context, map, depMaps) {
            count += 1;
            var fetched = Object.keys(context.urlFetched).length,
                el = root.document.getElementById('requirejs-progress'),
                percentLoaded;

            if (el && fetched > 0) {
                percentLoaded = Math.min(100, (count / fetched) * 100);
                el.style.width = percentLoaded + '%';
            }
        };

    var onError = require.onError;
    require.onError = function(requireType, requireModules) {
        var progressEl = root.document.getElementById('requirejs-progress'),
            statusEl = root.document.getElementById('requirejs-status');

        if (progressEl) {
            progressEl.parentNode.className = progressEl.parentNode.className +
                ' progress-danger';
        }

        if (statusEl) {
            statusEl.innerHTML = 'Error loading application...';
        }

        if (onError) {
            onError.apply(this, arguments);
        }
    };


    require.onResourceLoad = function(context, map, depMaps) {
        if (map.parentMap) {
            updateModuleProgress(context, map, depMaps);
        }
    };

     define(function(require) {
        var Backpain = require('backpain/init');
    });
}).call(this);
