/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    '../../collections/productos',
    'productosTotal',    
    '../../views/catalogo/productoLista',
    '../../views/app/bloque_ajax',
    '../../collections/catalogo/filtros',
    'facetr'
], function ($, _, Backbone,Productos,ProductosTotal,ProductoLista,Bloque_Ajax,FiltrosCollection,Facetas) {
    'use strict';

    var CatalogoView = Backbone.View.extend({

        id: '',

        className: '',

        events: {},

        initialize: function () {
            this.busqueda={}
            this.listenTo(FiltrosCollection, 'add', this.filtrar);
            this.listenTo(FiltrosCollection, 'remove', this.quitar_filtro);
        },

        render: function () {
            this.$el.empty();
            var chocolateado = this.collection.shuffle();
            chocolateado.forEach(this.addOne,this);
        },
        addOne:function (modelo) {
            modelo.set({visible:true});
            var producto = new ProductoLista({model:modelo});
            this.$el.append(producto.$el);
            producto.$el.addClass('col-md-4 col-sm-6 col-xs-6')
        },
        saber_categoria:function (slug) {
            this.busqueda.categoria = slug;
            this.buscar_productos(this.busqueda)
        },
        buscar_productos:function (busqueda) {
            this.collection = new Productos()
            this.con_facetas = Facetas(this.collection);
            var self=this;
            this.collection.fetch({
                data:$.param(busqueda)
            }).always(function(){
                if (FiltrosCollection.length>0) {
                    FiltrosCollection.reset();
                }                
                self.render();                
            });
        },
        filtrar:function (filtro) {
            var tipo_faceta
            if (filtro.toJSON().tipo==='color') {
                tipo_faceta = this.con_facetas.facet('color');
            }else if(filtro.toJSON().tipo === 'talla'){
                tipo_faceta = this.con_facetas.facet('variaciones.talla');                
            }
            tipo_faceta.value(filtro.toJSON().valor);
            this.render();
        },
        quitar_filtro:function (filtro) {
            var con_facetas = Facetas(this.collection);

            var colores = con_facetas.facet('color');

            colores.removeValue(filtro.toJSON().valor);
            this.render();
        },
    });

    return CatalogoView;
});