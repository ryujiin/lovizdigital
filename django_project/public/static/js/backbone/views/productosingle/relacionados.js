
define([
    'jquery',
    'underscore',
    'backbone',
    '../../collections/productos',
    'productosTotal',    
    '../../views/catalogo/productoLista',
], function ($, _, Backbone,Productos,ProductosTotal,ProductoLista) {
    'use strict';

    var RelacionadosView = Backbone.View.extend({

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
            producto.$el.addClass('col-xs-6 col-sm-3 col-md-3');            
            this.$el.append(producto.$el);
        },
        buscar_productos:function (slug) {
            var self=this;
            this.collection.fetch({
                data:$.param({categoria:this.slug,limite:4})
            }).always(function(){
                self.render();
            });
        }
    });

    return RelacionadosView;
});