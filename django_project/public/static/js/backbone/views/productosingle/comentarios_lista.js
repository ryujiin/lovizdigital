/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'swig',
    '../../views/productosingle/estrellas',
], function ($, _, Backbone, swig,Estrellas) {
    'use strict';

    var ComentarioListaView = Backbone.View.extend({

        template: swig.compile($('#comentario_lista').html()),                

        tagName: 'article',

        id: '',

        className: 'review row',

        events: {
            'click .opt-si':'opcion_si',
            'click .opt-no':'opcion_no',
        },

        initialize: function () {
            this.votado = false;
            this.listenTo(this.model, 'change', this.render);
            this.render();
        },
        render: function () {
            this.$el.html(this.template(this.model.toJSON()));
            this.add_estrellas();
            if (this.votado) {
                this.$('.opciones_ayuda').addClass('votado');
            };
        },
        add_estrellas:function () {
            var estrellas = new Estrellas({
                el:this.$('.estrellas'),
            });
            estrellas.render(this.model.toJSON().valoracion)            
        },
        opcion_si:function () {
            if (this.votado===false) {
                var valor = this.model.toJSON().ayuda_si;
                this.votado = true;            
                this.model.set('ayuda_si',valor+1);
                this.model.save();    
            };            
        },
        opcion_no:function () {
            if (this.votado===false) {
                var valor = this.model.toJSON().ayuda_no;
                this.votado = true;            
                this.model.set('ayuda_no',valor+1);
                this.model.save();                
            };            
        },
    });

    return ComentarioListaView;
});
