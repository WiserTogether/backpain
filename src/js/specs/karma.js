require.config({
    packages: [
        "backpain"
    ],

    baseUrl: '/base/src/js',

    hbs: {
        disableI18n: true,
        disableHelpers: true
    },

    paths: {
        // Application Dependencies
        'chiropractor':          '../components/chiropractor/chiropractor',
        'handlebars':            '../components/require-handlebars-plugin/Handlebars',
        'hbs':                   '../components/require-handlebars-plugin/hbs',
        'i18nprecompile':        '../components/require-handlebars-plugin/hbs/i18nprecompile',
        'json2':                 '../components/require-handlebars-plugin/hbs/json2',
        'json3':                 '../components/json3/lib/json3',
        'underscore':            '../components/underscore/underscore',
        'backbone':              '../components/backbone/backbone',
        'jquery':                '../components/jquery/jquery',
        'jquery.cookie':         '../components/jquery.cookie/jquery.cookie',
        'backbone.subroute':     '../components/backbone.subroute/backbone.subroute',
        'select2':               '../components/select2/select2',
        // Testing Dependencies
        'sinon':                 '../components/sinonjs/sinon',
        'es5-shim':              '../components/es5-shim/es5-shim',
        'chai':                  '../components/chai/chai',
        'expectjs':              '../components/expect/expect',
        'expect':                'lib/expect',
        'mocha':                 'lib/mocha',
        'browser':               'lib/browser'
    },

    pragmasOnSave: {
        excludeHbsParser : true,
        excludeHbs: true,
        excludeAfterBuild: true
    },

    // Shims are used to set dependencies for third-party modules which
    // do not require their dependencies. first-party modules and forks
    // should not require entries in shims, as they should be able to
    // use define() or require() as appropriate to ensure all their
    // dependencies are available
    shim: {
        // Application Shims
        'backbone': {
            deps: ['jquery', 'underscore'],
            exports: 'Backbone'
        },
        'underscore': {
            exports: '_'
        },
        'select2': {
            deps: ['jquery'],
            exports: 'jQuery.fn.select2'
        },
        'jquery.cookie': {
            deps: ['jquery'],
            exports: 'jQuery.cookie'
        },
        // Testing Shims
        json3: {
            exports: 'JSON'
        },
        expectjs: {
            exports: 'expect'
        },
        'sinon': {
            exports: 'sinon',
        },
        chai: {
            deps: ['es5-shim']
        }
    },
    enforceDefine: true
});

require([
    'require',
    'specs/setup/mocha',
    'specs/main'
], function(require, mochaSetup, testSuite) {
    mochaSetup();
    testSuite();
    window.__karma__.start();
});
