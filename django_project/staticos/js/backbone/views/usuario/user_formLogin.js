/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'swig',
    '../../models/user',
    '../../views/app/loader_full'
], function ($, _, Backbone, swig,UserModel,LoaderFull) {
    'use strict';

    var UserFormLoginView = Backbone.View.extend({

        template: swig.compile($('#user_formLogin_tlp').html()),        

        id: '',
        className: '',
        events: {
            'blur input':'get_datos',
            'submit form':'antes_enviar',
        },
        initialize: function () {
            this.render();
        },
        render: function () {
            this.$el.html(this.template());
        },
        get_datos:function (e) {            
            var valor = e.target.value;
            var contenedor = '.'+e.target.dataset.contenedor;
            var validar_vacio = this.validar_vacio(valor,contenedor);
            if (validar_vacio) {
                if (contenedor==='.campo_correo') {
                    this.validar_email(valor,contenedor);
                };
            };
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
        validar_email:function (valor,contenedor) {
            var error_contenedor = this.$(contenedor +' .error');
            error_contenedor.empty();
            function validarEmail(valor) {
                if (/(\w+)(\.?)(\w*)(\@{1})(\w+)(\.?)(\w*)(\.{1})(\w{2,3})/.test(valor)){
                    return true;
                } else {
                    return false;
                }
            }
            valor = validarEmail(valor);
            if (valor===false) {
                this.$(contenedor).addClass('has-error').removeClass('has-success');
                error_contenedor.append('<p class="text-danger">Este no es un correo valido *</p>');
                return false
            }else{
                this.$(contenedor).addClass('has-success').removeClass('has-error');
                return true;
            }
        },
        antes_enviar:function (e) {
            e.preventDefault();
            var self = this;
            var nombre,apellido,correo,pass,verificado;            
            correo=this.$('.campo_correo input');
            pass=this.$('.campo_pass input');

            verificado = this.validar_email(correo.val(),'.campo_correo');
            if (verificado==true) {
                verificado = this.validar_vacio(pass.val(),'.campo_pass');
                if (verificado == true ) {
                    this.loader = new LoaderFull();
                    UserModel.ingresar_user(correo.val(),pass.val(),this);                
                };
            };
        },
        error_login:function(){
            this.loader.remove();
            this.$('.error_form').empty();
            var error = '<p class="bg-warning text-danger">El usuario o contraseña no coiciden, vuelva a intentarlo</p>';
            this.$('.error_form').append(error);
            this.$('input').each(function () {
                var contenedor = $('.'+this.dataset.contenedor);
                $(this).val('');
                contenedor.removeClass('has-success has-error');
            })
        },
    });

    return UserFormLoginView;
});
