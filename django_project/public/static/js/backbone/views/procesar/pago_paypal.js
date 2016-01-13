/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'swig',
], function ($, _, Backbone, swig) {
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
                self.$('#form_paypal form').hide();
                $('.panel_seccion_final .paypal').addClass('paypal_ready');
            }).fail(function (data) {
                $('.panel_seccion_final button').removeClass('visto');
            })
        },
        pagar_paypal:function () {
            this.$('form').submit();
        }
    });

    return LineasResumenView;
});
