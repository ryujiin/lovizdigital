/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'swig',
    '../../views/procesar/direcciones',
    '../../views/procesar/nueva_direccion',
    '../../collections/ubigeos'
], function ($, _, Backbone, swig, DireccionesViews,NuevaDireccion,Ubigeos) {
    'use strict';

    var PasoMetodoEnvioView = Backbone.View.extend({

        template: swig.compile($('#paso_metodoenvio_tlp').html()), 

        tagName: 'div',

        id: '',

        className: '',

        events: {
            'click input[type=radio]':'mostrar_formulario',
            'change #departamentos':'add_provincias',
            'change #provincias':'add_distritos',
            'click .btn-next':'siguiente_paso',
        },

        initialize: function () {
        },

        render: function () {
            this.$el.html(this.template());
            var direcciones = new DireccionesViews({
                el:this.$('.direcciones'),
                collection:this.collection,
            });
            var nueva_direccion = new NuevaDireccion({
                el:this.$('.formulario'),
                collection:this.collection,
            })
            this.$('.form_addDirec').hide();
        },
        ver_render:function () {
            var dire = this.model.toJSON().direccion_envio;
            if (dire) {
                this.render_guardado();
            }else{
                this.render();
            }
        },
        render_guardado:function () {
            this.render();
            this.$el.removeClass('is_activo').addClass('correcto');
            /*
            var direccion = this.model.toJSON().direccion_envio;
            var coincidencia = this.collection.findWhere({id:direccion});
            if (coincidencia) {
                this.$el.html(this.template_guardado(coincidencia.toJSON()));
            }else{
                this.render();
            }
            */
        },
        mostrar_formulario:function () {
            var valor = this.$('input[type=radio]:checked').val();
            if (valor === 'add_form') {
                this.$('.form_addDirec').slideDown();
            }else{                
                this.$('.form_addDirec').slideUp();
            }
        },
        siguiente_paso:function () {
            var self = this;
            var valor = this.$('input[type=radio]:checked').val();
            if (valor!==undefined && valor!=='add_form') {
                this.model.set({direccion_envio:valor})
                this.model.save().done(function () {
                    self.render_guardado();
                })
            }else{
                this.$('.error_direccion').fadeIn();
            }
        }
    });

    return PasoMetodoEnvioView;
});