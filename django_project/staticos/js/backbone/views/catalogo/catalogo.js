/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    '../../collections/productos',
    'productosTotal',    
    '../../views/catalogo/productoLista',
    '../../views/app/bloque_ajax',
    '../../collections/catalogo/filtros'
], function ($, _, Backbone,Productos,ProductosTotal,ProductoLista,Bloque_Ajax,FiltrosCollection) {
    'use strict';

    var CatalogoView = Backbone.View.extend({

        id: '',

        className: '',

        collection:new Productos(),

        events: {},

        initialize: function () {
            this.listenTo(FiltrosCollection, 'add', this.filtrar);
            this.listenTo(FiltrosCollection, 'remove', this.filtrar);
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
                self.ver_filtros();
                bloque_ajax.remove();                
            });
        },
        ver_filtros:function () {
            if (FiltrosCollection.length>0) {
                this.filtrar();
            }
        },
        filtrar:function () {
            var filtros = FiltrosCollection;

            if (filtros.length>0) {
                this.collection.forEach(function (modelo) {
                    modelo.set('visible',false);
                })
                var self = this;

                filtros.forEach(function (e,i) {
                    if (e.toJSON().tipo==='color') {
                        self.filtrar_color(e.toJSON().valor);
                    };
                })
            }else{
                this.collection.forEach(function (modelo) {
                    modelo.set('visible',true);
                })
            }
        },
        filtrar_color:function (color) {
            this.collection.where({color:color}).forEach(function (e) {
                e.set('visible',true)
            })
        }
    });

    return CatalogoView;
});