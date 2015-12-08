/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'swig',
    'stripe'
], function ($, _, Backbone, swig,Stripe) {
    'use strict';

    var LineasResumenView = Backbone.View.extend({

        //template: swig.compile($('#pago_tarjeta_tlp').html()),        

        tagName: 'div',

        id: '',

        className: '',

        events: {
        },

        initialize: function () {
            this.render();
        },

        render: function () {
            this.addForm();
        },
        addForm:function () {
            var self = this;
            $.get('/pago/paypal/',{'pedido':this.model.toJSON().numero_pedido})
            .done(function(data){
                self.$('#form_paypal').html(data);
            });
        }
    });

    return LineasResumenView;
});
