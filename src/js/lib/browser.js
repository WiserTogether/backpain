/*global define*/
(function(window) {
    'use strict';
    define(function(require) {
        var ieVersion = function() {
            var rv = -1; // Return value assumes failure.
            if (window.navigator.appName == 'Microsoft Internet Explorer') {
                var ua = window.navigator.userAgent;
                var re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
                if (re.exec(ua) != null)
                    rv = parseFloat(RegExp.$1);
            }
            return rv;
        }();
        return {
            isOldIE: ieVersion !== -1 && ieVersion < 9,
            window: window,
            navigator: window.navigator,
            document: window.document
        };
    });
}(this));
