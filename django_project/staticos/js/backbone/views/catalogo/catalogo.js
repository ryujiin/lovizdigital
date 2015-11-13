/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    '../../collections/productos',
    'productosTotal',    
    '../../views/catalogo/productoLista',
    '../../views/app/bloque_ajax',

], function ($, _, Backbone,Productos,ProductosTotal,ProductoLista,Bloque_Ajax) {
    'use strict';

    var CatalogoView = Backbone.View.extend({

        id: '',

        className: '',

        collection:new Productos(),

        events: {},

        initialize: function () {
            //this.listenTo(this.collection, 'add', this.addOne);
        },

        render: function () {
            this.collection.forEach(this.addOne,this);
            var productos = ProductosTotal;
            productos.add([this.collection]);
        },
        addOne:function (modelo) {
            modelo.set({visible:true});
            var producto = new ProductoLista({model:modelo});
            this.$el.append(producto.$el);
            producto.$el.addClass('col-md-4')
        },
        buscar_productos:function (slug) {
            var self=this;
            var bloque_ajax = new Bloque_Ajax();
            this.collection.fetch({
                data:$.param({categoria:this.slug})
            }).always(function(){
                self.render();
                bloque_ajax.remove();
            });
        }
    });

    return CatalogoView;
});