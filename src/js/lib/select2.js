/*global define*/
define(function(require) {
    var _ = require('underscore'),
        View = require('chiropractor').Views.FormField;

    require('select2');

    View.register('select2', {
        template: require('hbs!./templates/formfield/select2'),
        initialize: function(options) {
            View.prototype.initialize.call(this, options);
            this.select2 = {
                width: this.config.width || 'resolve',
                allowClear: this.config.blank,
                dropdownAutoWidth: true
            };

            if (!_(this.config.options).isEmpty()) {
                this.select2.data = this.config.options;
            }
            else if (this.config.url && this.config.optName && this.config.optValue) {
                var url = this.config.url,
                    optRoot = this.config.optRoot,
                    optName = this.config.optName,
                    optValue = this.config.optValue,
                    getNestedAttr = function(obj, attrs) {
                        if (!_(attrs).isEmpty()) {
                            _(attrs.split('.')).each(function(attr) {
                                if (obj && obj[attr]) {
                                    obj = obj[attr];
                                }
                                else {
                                    return undefined;
                                }
                            });
                        }
                        return obj;
                    };

                _(this.select2).defaults({
                    minimumInputLength: 1,
                    query: function(query) {
                        require([url + query.term], function(data) {
                            var results = getNestedAttr(data, optRoot);
                            results = _(results).map(function(record) {
                                return {
                                    id: getNestedAttr(record, optName),
                                    text: getNestedAttr(record, optValue)
                                };
                            }, this);

                            query.callback({
                                results: results,
                                more: false
                            });
                        });
                    }
                });
            }
            else {
                throw new Error('Invalid formfield options for select2');
            }
        },

        render: function() {
            View.prototype.render.apply(this, arguments);
            this.$('[name=' + this.field + ']').select2(this.select2);

            return this;
        }
    });
});
