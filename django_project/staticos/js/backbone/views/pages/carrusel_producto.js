/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'swig',
    '../../views/catalogo/productoLista',    
], function ($, _, Backbone, swig,ProductoLista) {
    'use strict';

    var CarruselProductoView = Backbone.View.extend({

        template: swig.compile($('#Carrusel_productos_template').html()),        

        id: '',

        className: 'carrusel_producto',

        events: {},

        initialize: function () {
            this.render();
            this.listenTo(this.collection,'add',this.addOne)
        },

        render: function () {
            this.$el.html(this.template());
        },
        addOne:function (modelo) {
            var vista = new ProductoLista({
                model:modelo
            })
            this.$('.carruseles').append(vista.$el)
        },
        add_Carrusel:function () {
            this.$('.lista-productos').owlCarousel({
                items : 4,
                autoPlay:true,
                navigation:true,
            });
        }
    });

    return CarruselProductoView;
});
