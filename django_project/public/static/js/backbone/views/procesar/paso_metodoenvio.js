/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'swig',
    '../../views/procesar/direcciones',
    '../../views/procesar/nueva_direccion',
    '../../collections/ubigeos',
    '../../collections/metodos_envio',
    '../../views/procesar/metodos_envio'
], function ($, _, Backbone, swig, DireccionesViews,NuevaDireccion,Ubigeos,MetodosEnvioCollection,MetodosEnvio) {
    'use strict';

    var PasoMetodoEnvioView = Backbone.View.extend({

        template: swig.compile($('#paso_metodoenvio_tlp').html()), 

        tagName: 'div',

        id: '',

        className: '',

        events: {
            'change input[name=selecion_direccion]':'mostrar_formulario',
            'change #departamentos':'add_provincias',
            'change #provincias':'add_distritos',
            'click input[name=selecion_metodo]':'agregar_metodo',
            'click .btn-next':'siguiente_paso',
        },

        initialize: function () {
            this.listenTo(this.model, 'change:paso_actual', this.render);                    
            this.listenTo(this.model, 'change:direccion_envio', this.mostrar_metodo_envio);
            this.listenTo(this.model, 'change', this.verificar_next);
            this.render();
        },

        render: function () {
            this.$el.html(this.template());
            this.ver_estado();
        },
        rellenar:function () {
            var direcciones = new DireccionesViews({
                el:this.$('.direcciones'),
                collection:this.collection,
            });
            this.$('.form_addDirec').hide();
            this.$('.metodo_envio_form').hide();            
        },
        ver_estado:function () {
            var paso = this.model.toJSON().paso_actual;
            if (paso === 2) {
                this.rellenar();
                this.$el.addClass('is-activo');
                this.$('.btn-next').addClass('btn-disban')
            }
            if (paso>2) {
                this.$el.addClass('is-guardado').removeClass('is-activo');
            };
        },
        mostrar_metodo_envio:function  () {
            var metodos = new MetodosEnvio({
                el:this.$('.metodo_envio_form .lista_metodos'),
                collection:new MetodosEnvioCollection(),
            });
            this.$('.metodo_envio_form').slideDown();
        },
        mostrar_formulario:function () {
            var valor = this.$('input[type=radio]:checked').val();
            if (valor === 'add_form') {
                var nueva_direccion = new NuevaDireccion({
                    el:this.$('.formulario'),
                    model:this.model,
                    collection:this.collection,
                })
                this.$('.form_addDirec').slideDown();
            }else{
                this.$('.lista_metodos').empty();
                this.$('.form_addDirec').slideUp();
                this.model.set({'direccion_envio':valor,'metodoenvio':null});
            }
        },
        agregar_metodo:function () {

            var metodo = this.$('input[name=selecion_metodo]:checked').val();
            this.model.set({metodoenvio:metodo});
        },
        verificar_next:function () {
            var datos = this.model.toJSON();
            if (datos.direccion_envio!==null && datos.metodoenvio!==null) {
                this.$('.btn-next').removeClass('btn-disban');
            };
        },
        siguiente_paso:function () {
            var self = this;
            if (this.model.toJSON().direccion_envio!==null && this.model.toJSON().metodoenvio!==null) {
                this.model.save().done(function () {
                    self.model.set('paso_actual',3);
                })
            }else{
                if (valor===undefined) {
                    this.$('.error_direccion').fadeIn();    
                }
                if (metodo===undefined) {
                    this.$('.error_metodo').fadeIn();
                };
                
            }
        }
    });

    return PasoMetodoEnvioView;
});