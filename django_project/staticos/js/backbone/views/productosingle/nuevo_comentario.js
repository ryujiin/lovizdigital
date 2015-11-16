/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'swig',
    '../../models/comentario',
    '../../models/user',
    '../../views/productosingle/nueva_imagen_coment'
], function ($, _, Backbone, swig,ComentarioModel,UserModel,NuevaImagen) {
    'use strict';

    var NuevoComentarioView = Backbone.View.extend({

        tagName: 'div',

        id: '',

        className: '',

        model:new ComentarioModel(),

        events: {
            'mouseenter .estrellas_form button':'encima_estrellas',
            'mouseleave .estrellas_form button':'salir_estrellas',
            'click .estrellas_form button': 'click_estrella',
            'blur #titulo_coment':'verificar_titulo',
            'blur #coment_content':'verificar_cant_content',
            'keypress #coment_content':'contando_num',
            'click .recomendacion':'recomendacion_valor',
            'click .enviar_comentario':'enviar_comentario',
            'change #foto_comentario':'subio_imagen',
        },

        initialize: function () {
            this.render();
        },

        render: function () {
            this.ver_user();
        },
        ver_user:function () {
            var user = UserModel;
            if (user.toJSON().id !== undefined) {
                this.$('.autenticar_user').hide();
                this.model.set('usuario',user.id)
            }else{
                this.model.set('usuario',null)
            }
        },
        encima_estrellas:function (e) {
            var valor = e.target.dataset.valor;
            var texto = e.target.dataset.texto;
            
            for (var i = 1; i <= 5; i++) {
                if (valor>=i) {
                    this.$('.estrellas_form button.'+i).addClass('hover');
                }else{
                    this.$('.estrellas_form button.'+i).removeClass('hover');
                }
            };
            this.$('.form_estrellas .texto').html(texto);
        },
        salir_estrellas:function () {
            this.$('.estrellas_form button').removeClass('hover')
        },
        click_estrella:function (e) {
            var valor = e.target.dataset.valor;

            for (var i = 1; i <= 5; i++) {
                if (valor>=i) {
                    this.$('.estrellas_form button.'+i).addClass('activo');
                }else{
                    this.$('.estrellas_form button.'+i).removeClass('activo');
                }
            };
            this.$('.form_estrellas').addClass('valido');

            this.model.set('valoracion',valor);
        },
        verificar_titulo:function () {
            var valor = this.$('#titulo_coment').val();
            var contenedor = $('.'+this.$('#titulo_coment').data('contenedor'))

            if (valor) {
                contenedor.addClass('valido').removeClass('error')
                this.model.set('titulo_comentario',valor)              
            }else{
                contenedor.addClass('error').removeClass('valido')
            }
        },
        verificar_cant_content:function () {
            var valor = this.$('#coment_content').val();
            if (valor.length<50) {
                this.$('.content_coment').addClass('error').removeClass('valido')
                this.$('.content_coment .requerido').html('Requerido '+valor.length+'/50')
            }else{
                this.$('.content_coment').addClass('valido').removeClass('error')
            }
        },
        contando_num:function () {
            var valor = this.$('#coment_content').val();
            if (valor.length<50) {             
                this.$('.content_coment .requerido').html('Requerido '+valor.length+'/50')
            }else{
                this.$('.content_coment .requerido').html('<span class="glyphicon glyphicon-ok"></span>')                
                this.model.set('comentario',valor);
            }
        },
        recomendacion_valor:function (e) {
            this.$('.recomendaciones button').removeClass('activo')            
            this.$('.recomendaciones').addClass('valido')        
            $(e.target).addClass('activo');
            this.model.set('recomendacion',e.target.dataset.valor)
        },
        enviar_comentario:function () {
            var self = this;
            var producto = this.$('#producto_id_coment').val();
            this.model.set('producto',producto);
            var datos = this.model.toJSON();
            if (datos.valoracion && datos.titulo_comentario && datos.comentario.length>50 && datos.producto && datos.recomendacion) {
                this.model.save().done(function () {
                    self.$el.modal('hide');
                });
            }else{
                this.$('.error-form').show();
            }
        },
        subio_imagen:function (e) {
            var nueva_imagen = new NuevaImagen();
            nueva_imagen.render();
            this.$('.imagenes_subidas').append(nueva_imagen.$el);

            var imagen = $(e.target).val();
            var ext = $(e.target).val().split('.').pop().toLowerCase();
            if (ext ==='jpg' || ext ==='png' || ext === 'jpeg') {
                
                var dataform = new FormData();
                dataform.append('foto',e.target.files[0])
                $.ajax({
                    url:'/api/comentarioimgs/',
                    type:'POST',
                    data:dataform,
                    enctype:'multipart/form-data',
                    cache: false,
                    contentType: false,
                    processData: false,
                }).done(function (data) {
                    var modelo = nueva_imagen.model;
                    debugger;
                })
            };
        }
    });

    return NuevoComentarioView;
});
