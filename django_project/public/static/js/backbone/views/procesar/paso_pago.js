/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'swig',
    '../../views/procesar/pago_tarjeta',
    '../../views/procesar/pago_paypal',
    '../../views/procesar/pago_contraentrega',
    '../../models/ubigeo',    
    'bootstrap',
], function ($, _, Backbone, swig,PagoTarjeta,PagoPaypal,ContraEntrega,Ubigeo) {
    'use strict';

    var PasoPagoView = Backbone.View.extend({

        template: swig.compile($('#paso_pago_tlp').html()), 

        tagName: 'div',

        id: '',

        className: '',

        events: {
            'click .nav-tabs li a':'mostrar_boton',
            'click button.tarjeta':'verificar_card',
            'click button.paypal.paypal_ready':'pagar_paypal',
            'click button.contraentrega.contra_ready':'pagar_contra_entrega',
        },

        initialize: function () {
            this.listenTo(this.model, 'change', this.render);                                    
            this.render();
        },

        render: function () {
            this.$el.html(this.template());
            this.addTarjeta();            
            this.addPaypal();
            this.addContraEntrega();
            this.ver_estado();
        },
        ver_estado:function () {
            var paso = this.model.toJSON().paso_actual;
            if (paso === 3) {
                this.$el.addClass('is-activo');
            }
            if (paso>3) {
                this.$el.addClass('is-guardado');
            };
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
        addPaypal:function () {
            this.vistaPaypal = new PagoPaypal({
                el:this.$('#paypal'),
                model:this.model,
            })
        },
        addContraEntrega:function () {
            var self = this;
            $.post('/definir_pago/',{direccion:this.model.toJSON().direccion_envio})
            .done(function (data) {
                if (data.valor == true) {
                    self.vistaContraEntrega = new ContraEntrega({
                        el:self.$('#entrega'),
                        model:self.model,
                    })
                }else{
                    $('li.link_contra_entrega').hide();
                }
            });
            
        },
        verificar_card:function () {
            this.vistaTarjeta.verificar();
        },
        pagar_paypal:function () {
            this.vistaPaypal.pagar_paypal();
        },
        pagar_contra_entrega:function () {
            this.vistaContraEntrega.enviar_pago();
        }
    });

    return PasoPagoView;
});