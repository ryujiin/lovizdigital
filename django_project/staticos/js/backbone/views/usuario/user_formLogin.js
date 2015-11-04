/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'swig',
], function ($, _, Backbone, swig) {
    'use strict';

    var UserFormLoginView = Backbone.View.extend({

        template: swig.compile($('#user_formLogin_tlp').html()),        

        id: '',
        className: '',
        events: {
            'blur .email': 'get_datos_email',
            'blur .password-input': 'get_datos_pass',
            'submit':'veriForm',
        },
        initialize: function () {
            this.render();
        },
        render: function () {
            this.$el.html(this.template());
        },
        get_datos_email:function(e){
            var longitud = e.target.value.length;
            var valor = e.target.value;
            valor = validarEmail(valor);            
            function validarEmail(valor) {
                if (/(\w+)(\.?)(\w*)(\@{1})(\w+)(\.?)(\w*)(\.{1})(\w{2,3})/.test(valor)){
                    return true;
                } else {
                    return false;
                }
            }
            this.verificar_email(valor,$(e.target));
        },
        get_datos_pass:function(e){
            var valor = e.target.value;
            this.verificar_pass(valor,$(e.target));
        },
        verificar_email:function(valor,target){
            var longitud = valor.length;
            var validado = false;
            if (longitud === 0 ) {
                $(".validador_email").empty();
                var adevertencia = '<p class="validador_email error text-danger">Porfavor ingrese su email</p>';
                target.removeClass('valid').addClass('error').after(adevertencia);
            }else if(valor===false){
                $(".validador_email").empty();
                var adevertencia = '<p class="validador_email error text-warning">Porfavor ingrese un email valido</p>';
                target.removeClass('valid').addClass('error').after(adevertencia);
            }else{
                $(".validador_email").empty()
                target.addClass('valid').removeClass('error');
                validado = true;
            }
            return validado
        },
        verificar_pass:function(valor,target){
            var validado = false
            var longitud = valor.length;
            if (longitud === 0 ) {
                $(".validador_pass").empty();
                var adevertencia = '<p class="validador_pass error text-danger">Porfavor ingrese su contraseña</p>';
                target.removeClass('valid').addClass('error').after(adevertencia);
            }else{
                $(".validador_pass").empty();
                target.addClass('valid').removeClass('error');
                validado = true
            }
            return validado
        },
        verificar_form_enviar:function(e){
            var self = this;
            e.preventDefault();
            var target_email = this.$('.email');
            var target_pass = this.$('.password-input');

            var validador_email = this.verificar_email(target_email.val(),target_email);
            var validador_pass = this.verificar_pass(target_pass.val(),target_pass);

            if (validador_email === true && validador_pass === true) {
                this.model.ingresar_user(target_email.val(),target_pass.val(),this);
            };
        },
        error_login:function(){
            var target_email = this.$('.email');
            var target_pass = this.$('.password-input');

            this.$('.error').empty();

            target_email.val('').removeClass('valid').focus();
            target_pass.val('').removeClass('valid');

            var adevertencia = '<p class="error bg-warning text-warning">El usuario o contraseña no coiciden, vuelva a intentarlo</p>';
            this.$('.error_form').html(adevertencia);
        },
        veriForm:function (e) {
            e.preventDefault();
            var self = this;
            this.$('input').each(function (e,i) {
                var dato = self.ver_campo(i);
            })
            var target_email = this.$('.email').val();
            var target_pass = this.$('.password-input').val();
            if (target_email && target_pass) {
                this.model.ingresar_user(target_email,target_pass,this);                
            };
        },
        ver_campo:function (i) {
            var conte = $('.'+i.dataset.contenedor);
            var valor = i.value;
            if (valor==='') {
                conte.addClass('error')
            }else{
                conte.removeClass('error')
            }
        },

    });

    return UserFormLoginView;
});
