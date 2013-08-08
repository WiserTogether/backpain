/*global define*/
define(function(require) {
    'use strict';

    var $ = require('jquery'),
        _ = require('underscore'),
        expect = require('expect'),
        afterEach = require('mocha').afterEach,
        beforeEach = require('mocha').beforeEach,
        describe = require('mocha').describe,
        it = require('mocha').it,
        Chiropractor = require('chiropractor');

    return function() {
        beforeEach(function() {
            this.model = new Chiropractor.Model();
        });

        afterEach(function() {
            if (this.view) {
                this.view.remove();
            }
            this.view = undefined;
            this.model = undefined;
        });

        describe('select2', function() {
            it('should accept options and provide a searchable select2 ' +
               'field', function() {
                var View = Chiropractor.View.extend({
                    template: '{{ formfield "select2" model "field1" options=data }}'
                }),
                spy = this.sandbox.spy();

                this.view = new View({
                    model: this.model,
                    context: {data: [{id: 1, text: 'One'}, {id: 2, text: 'Two'}]}
                });
                this.view.listenTo(this.model, 'change:field1', spy);

                this.dom.html(this.view.render().el);

                expect(spy.callCount).to.equal(0);
                expect(this.model.get('field1')).to.be.a('undefined');
                this.view.$('[name="field1"]').select2('val', '1', true);
                expect(this.view.$('[name="field1"]').val()).to.equal('1');
                expect(spy.callCount).to.equal(1);
                expect(this.model.get('field1')).to.equal('1');
            });
        });
    };
});
