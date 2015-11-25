/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'swig',
    '../../views/procesar/pago_tarjeta',
    'bootstrap',
], function ($, _, Backbone, swig,PagoTarjeta) {
    'use strict';

    var PasoPagoView = Backbone.View.extend({

        template: swig.compile($('#paso_pago_tlp').html()), 

        tagName: 'div',

        id: '',

        className: '',

        events: {
            'click .nav-tabs li a':'mostrar_boton',
            'click button.tarjeta':'verificar_card',
        },

        initialize: function () {
            this.$el.addClass('is-activo');
        },

        render: function () {
            this.$el.html(this.template());
            this.addTarjeta();
        },
        siguiente_paso:function () {
            var valor = this.$('input[type=radio]:checked').val();
            if (valor!==undefined && valor!=='add_form') {
            }else{
                this.$('.error_direccion').fadeIn();
            }
        },
        mostrar_boton:function (e) {
            var button = $('.'+e.currentTarget.dataset.selector);
            $('.panel_seccion_final button').removeClass('visto');
            button.addClass('visto');
        },
        addTarjeta:function () {
            this.vistaTarjeta = new PagoTarjeta({
                el:this.$('#tarjeta'),
                model:this.model,
            });
        },
        verificar_card:function () {
            this.vistaTarjeta.verificar();
        }
    });

    return PasoPagoView;
});