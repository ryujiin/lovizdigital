/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'swig',
], function ($, _, Backbone, swig) {
    'use strict';

    var LineasResumenView = Backbone.View.extend({

        template: swig.compile($('#pago_tarjeta_tlp').html()),

        tagName: 'div',

        id: '',

        className: '',

        events: {
            'keypress #telefono_contacto':'verificar_num',
            'keyup #telefono_contacto':'verificar',
        },

        initialize: function () {
            this.verificar();
        },

        render: function () {
            
        },
        verificar_num:function (e) {
            var key = e.keyCode;
            if(key>=48 && key>=57){
                e.preventDefault();                
            }
        },
        verificar:function () {
            var valor = this.$("#telefono_contacto").val();
            if (valor.length>5) {
                $('.btn.contraentrega').removeClass('btn-disban').addClass('contra_ready')
            }else{
                $('.btn.contraentrega').addClass('btn-disban')                
            }
        },
        enviar_pago:function () {
            this.model
            var id_trans = make_idtrna();          

            $.post('/pago_contraentrega/',{
                id_pago : this.model.toJSON().numero_pedido,
                descripccion :'Pago contraentrega, aun no pagado',
                transaccion : id_trans,
            }).done(function (data) {
                if (data.status ==='ok') {
                    window.location.href='/felicidades/'
                };
            })
            function make_idtrna(){
                var text = "";
                var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
                for( var i=0; i < 20; i++ )
                    text += possible.charAt(Math.floor(Math.random() * possible.length));
                return text;
            }
        }
    });

    return LineasResumenView;
});
