/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'swig'
], function ($, _, Backbone, swig) {
    'use strict';

    var PageCarroBotonCheckoutView = Backbone.View.extend({
        
        template: swig.compile($('#boton_checkout_tlp').html()),        

        tagName: 'div',

        id: '',

        className: '',

        events: {},

        initialize: function () {
            this.listenTo(this.model, 'change', this.render);
            this.render();
        },

        render: function () {            
            this.$el.html(this.template(this.model.toJSON()));
        }
    });

    return PageCarroBotonCheckoutView;
});
