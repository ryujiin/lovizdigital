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

        template: swig.compile($('#pago_tarjeta_tlp').html()),        

        tagName: 'div',

        id: '',

        className: '',

        events: {
            'keydown #number':'ver_numero',
            'keyup #number': 'contar_numero'
        },

        initialize: function () {
            this.render();
        },

        render: function () {
            this.$el.html(this.template(this.model.toJSON()));
        },
        ver_numero:function (e) {
            if (e.keyCode>=48 && e.keyCode<=57 || e.keyCode ==8) {
                return true;
            }else{
                return false;
            }
        },
        contar_numero:function (e) {
            var valor = this.$('#number').val().length;
            var contenedor = $('.'+this.$('#number').data('contenedor'));
            var aceptado = false
            if (valor>=16) {                
                contenedor.addClass('has-success');
            }else{
                contenedor.removeClass('has-success');
            }
        },
        verificar:function () {            
            this.verificar_inputs();
            this.enviar_form()
        },
        verificar_inputs:function () {
            this.$('input').each(function (e,i) {
                if (i.value.length===0) {
                    $('.'+i.dataset.contenedor).addClass('error');
                }else{
                    $('.'+i.dataset.contenedor).addClass('has-success').removeClass('error');
                }
            });
            this.$('select').each(function (e,i) {
                 if (i.value.length===0) {
                    $('.'+i.dataset.contenedor).addClass('error');
                }else{
                    $('.'+i.dataset.contenedor).addClass('has-success').removeClass('error');
                }
            });
        },
        enviar_form:function () {
            var nombre = this.$('#name').val();
            var tarjeta = this.$("#number").val();
            var mes = this.$('#mes').val();
            var year = this.$('#year').val();
            var cvc = this.$('#cvc').val();
            if (nombre && tarjeta && mes && year && cvc) {
                this.pago_Stripe(nombre,tarjeta,mes,year,cvc);
            };
        },
        pago_Stripe:function (nombre,tarjeta,mes,year,cvc) {
            var self = this;
            var public_key = 'pk_test_1dnWop5afJiTtiGPo2GsJsa4';
            //comenzamos con stripe
            Stripe.setPublishableKey(public_key);

            var stripeResponseHandler = function(status, response) {
                var $form = $('#pagar_tarjeta');
                if (response.error) {
                    // Show the errors on the form
                    $form.find('.payment-errors').text(response.error.message);
                    $form.find('button').prop('disabled', false);
                } else {
                    // token contains id, last4, and card type
                    var token = response.id;
                    // Insert the token into the form so it gets submitted to the server
                    $form.append($('<input type="hidden" name="stripeToken" />').val(token));
                    // and re-submit         
                    $.post( "/pago/stripe/", {
                        stripeToken:token,
                        carro : $('#carro_pago').val(),
                    }).done(function (data) {
                        if (data.status==='paid') {
                            window.location="/felicidades/"+data.pedido+"/";
                        };
                    });
                }
            };

            var datos_card = {
                number:tarjeta,
                cvc:cvc,
                exp_month:mes,
                exp_year:year,
            };
            //hacer el llamado a Stripe
            Stripe.card.createToken(datos_card, stripeResponseHandler);
        },
    });

    return LineasResumenView;
});
