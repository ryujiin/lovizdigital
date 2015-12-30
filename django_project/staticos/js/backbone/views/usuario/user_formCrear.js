/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'swig',
    '../../models/user',
], function ($, _, Backbone, swig,UserModel) {
    'use strict';

    var UserFormCrearView = Backbone.View.extend({

        template: swig.compile($('#user_formCrear').html()),        

        id: '',
        className: '',
        events: {
            'click .boton-crear': 'mostrar_form',
            'blur input':'get_datos',
            'submit form':'antes_enviar',
        },
        initialize: function () {
            this.render();
        },
        render: function () {
            this.$el.html(this.template());
        },
        mostrar_form:function(){
            this.$('.datos_crear').hide();
            this.$('form').slideDown();

        },
        get_datos:function (e) {
            var valor = e.target.value;
            var contenedor = '.'+e.target.dataset.contenedor;
            var validar_vacio = this.validar_vacio(valor,contenedor);
            if (validar_vacio) {
                if (contenedor==='.campo_correo') {
                    this.validar_email(valor,contenedor);
                };
                if (contenedor==='.campo_pass') {
                    this.validar_longitud(valor,contenedor);
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
        validar_longitud:function (valor,contenedor) {
            var error_contenedor = this.$(contenedor +' .error');
            error_contenedor.empty();
            if (valor.length<6) {
                this.$(contenedor).addClass('has-error').removeClass('has-success');
                error_contenedor.append('<p class="text-danger">La contraseña es muy corta, minimo son 6 caracteres *</p>');
                return false;
            }else{
                this.$(contenedor).addClass('has-success').removeClass('has-error');                
                return true;
            }
        },
        antes_enviar:function (e) {
            e.preventDefault();
            var self = this;
            var nombre,apellido,correo,pass,verificado;
            nombre=this.$('.campo_nombre input');
            apellido=this.$('.campo_apellido input');
            correo=this.$('.campo_correo input');
            pass=this.$('.campo_pass input');

            verificado = this.validar_vacio(nombre.val(),'.campo_nombre');
            if (verificado==true) {
                verificado = this.validar_vacio(apellido.val(),'.campo_apellido');
                if (verificado==true) {
                    verificado = this.validar_vacio(correo.val(),'.campo_correo');
                    if (verificado==true) {
                        verificado = this.validar_email(correo.val(),'.campo_correo');
                        if (verificado==true) {
                            verificado = this.validar_vacio(pass.val(),'.campo_pass');
                            if (verificado == true ) {
                                verificado = this.validar_longitud(pass.val(),'.campo_pass');
                                if (verificado==true) {
                                    this.crear_cuenta(correo,pass,apellido,nombre)
                                };
                            };
                        };
                    };
                };
            };
        },
        crear_cuenta:function (correo,pass,apellido,nombre) {
            var self = this;
            var correo = correo.val();
            var pass = pass.val();
            $.post('/ajax/crear/',{username:correo,password:pass,nombre:nombre.val(),apellido:apellido.val()})
            .done(function (data) {
                if (data.creado===true) {
                    var modelo = UserModel;
                    modelo.ingresar_user(correo,pass,self);
                };
            }).fail(function (data) {
                self.error_crear();
            })
            this.crear_cuenta;
        },
        error_crear:function () {
            this.$('.error_form').empty();
            var error = '<p class="bg-warning text-danger">Lo sentimos parece que ya existe un usuario usando ese correo electronico</p>';
            this.$('.error_form').append(error);
            this.$('input').each(function () {
                var contenedor = $('.'+this.dataset.contenedor);                
                $(this).val('');
                contenedor.removeClass('has-success has-error');
            })
        }
    });

    return UserFormCrearView;
});
