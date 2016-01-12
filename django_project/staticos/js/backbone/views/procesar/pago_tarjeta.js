/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'swig',
    'carro',
    '../../views/app/loader_full'
], function ($, _, Backbone, swig,CarroModel,LoaderFull) {
    'use strict';

    var LineasResumenView = Backbone.View.extend({

        template: swig.compile($('#pago_tarjeta_tlp').html()),        

        tagName: 'div',

        id: '',

        className: '',

        events: {
            'keydown #number':'ver_numero',
            'keyup #number': 'contar_numero',
            'blur input':'get_datos',
            'blur select':'get_datos',
        },

        initialize: function () {
            this.render();
        },

        render: function () {
            var self = this;
            $.get('/get_stripe_key/').done(function (data) {
                self.stripe_key = data.key;
                self.$el.html(self.template(self.model.toJSON()));
            })
        },
        ver_numero:function (e) {
            if (e.keyCode>=48 && e.keyCode<=57 || e.keyCode ==8) {
                return true;
            }else{
                return false;
            }
        },
        get_datos:function (e) {
            var valor = e.target.value;
            var contenedor = '.'+e.target.dataset.contenedor;
            var validar_vacio = this.validar_vacio(valor,contenedor);
        },
        validar_vacio:function (valor,contenedor) {
            var error_contenedor = this.$(contenedor +' .error');
            error_contenedor.empty();
            if (valor==='') {
                this.$(contenedor).addClass('has-error').removeClass('has-success');
                error_contenedor.append('<p class="text-danger">Este campo es Requerido *</p>');
                return false;
            }else{
                this.$(contenedor).addClass('has-success').removeClass('has-error');                
                return true;
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
            this.enviar_form();
        },
        verificar_inputs:function () {
            this.$('input').each(function (e,i) {
                if (i.value.length===0) {
                    $('.'+i.dataset.contenedor).addClass('has-error');
                }else{
                    $('.'+i.dataset.contenedor).addClass('has-success').removeClass('has-error');
                }
            });
            this.$('select').each(function (e,i) {
                 if (i.value.length===0) {
                    $('.'+i.dataset.contenedor).addClass('has-error');
                }else{
                    $('.'+i.dataset.contenedor).addClass('has-success').removeClass('has-error');
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
            }
        },
        pago_Stripe:function (nombre,tarjeta,mes,year,cvc) {
            this.loader = new LoaderFull();
            var self = this;
            var public_key = self.stripe_key
            //comenzamos con stripe_key
            Stripe.setPublishableKey(public_key);

            var stripeResponseHandler = function(status, response) {
                var $form = $('#pagar_tarjeta');
                if (response.error) {
                    // Show the errors on the form
                    self.loader.remove()
                    $form.find('.payment-errors').text(response.error.message);
                    $('#pagar_tarjeta input').val('')
                } else {
                    // token contains id, last4, and card type
                    var token = response.id;
                    // Insert the token into the form so it gets submitted to the server
                    $form.append($('<input type="hidden" name="stripeToken" />').val(token));
                    // and re-submit         
                    var carro = CarroModel;
                    $.post( "/pago/stripe/", {
                        stripeToken:token,
                        carro : carro.id,
                    }).done(function (data) {            
                        if (data.status==='paid') {                        
                            window.location="/felicidades/";
                        };
                        self.loader.remove();
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
