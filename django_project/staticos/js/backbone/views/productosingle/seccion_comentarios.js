
define([
    'jquery',
    'underscore',
    'backbone',
    'swig',
    '../../views/productosingle/comentarios_lista',    
], function ($, _, Backbone, swig,ComentarioLista) {
    'use strict';

    var ComentarioSeccionView = Backbone.View.extend({
    
        template: swig.compile($('#seccion_comentarios').html()),        

        tagName: '',

        id: '',

        className: '',

        events: {
        },

        initialize: function () {
            this.render();
            this.listenTo(this.collection, 'add', this.addOne);           
        },

        render: function () {
            this.$el.html(this.template(this.model.toJSON()));
            if (this.model.toJSON().num_comentarios>0) {

                this.collection.buscar_producto(this.model.toJSON().id)
            };
        },
        addOne:function (modelo) {
            var comentario = new ComentarioLista({
                model:modelo,
            })
            this.$('.reviews-lista').prepend(comentario.$el);
        }
    });

    return ComentarioSeccionView;
});
