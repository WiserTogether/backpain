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

define(function(require) {
    var Backpain = require('backpain');
    Backpain.initialize();
});
