/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'swig',
    '../app/header',
    '../../collections/pages',
    '../../models/page',
    'paginas',
    '../pages/bloque',
    '../pages/carrusel_producto',
    'productosTotal',
    '../../collections/productos',
    '../../models/menu',    
    '../app/menu',
], function ($, _, Backbone, swig,Head,PagesCollection,PaginaModel,PaginasTotal,BloqueView,CarruselProducto,ProductosTotal,Productos,MenuModel,Menu) {
    'use strict';

    var PageView = Backbone.View.extend({
        el:$('#contenido'),

        template: swig.compile($('#page_tema1_template').html()),        

        id: '',

        className: '',

        model: new PaginaModel(),

        events: {},

        initialize: function () {
            //this.listenTo(this.model, 'change', this.rellenar);
            //this.listenTo(this.model, 'change:cuerpo', this.render);
            this.paginas = PaginasTotal;
        },

        render: function (slug) {        
            this.$el.html(this.template(this.model.toJSON()));
            this.rellenar_page();
        },
        buscar_page:function (slug) {
            var coincidencia,busqueda;
            if (slug==='front') {
                busqueda = {front:true}
            }else{
                busqueda = {'slug':slug}
            }
            coincidencia = this.paginas.findWhere(busqueda)

            if (coincidencia === undefined) {
                this.buscar_server(busqueda)
            }else{
                this.model.set(coincidencia.toJSON())
                this.render();
            }
        },
        buscar_server:function (busqueda) {
            var self = this;
            var nueva_pagina = new PagesCollection();
            nueva_pagina.fetch({
                data:$.param(busqueda)
            }).done(function (data) {
                self.paginas.add(data);
                self.model.set(data[0]);
                self.render();
            });
        },
        rellenar_page:function () {
            Head.render(this.model.toJSON().titulo,this.model.toJSON().descripcion);
            var bloques = this.model.attributes.bloques;
            var menus = this.model.attributes.menus;
            bloques.forEach(this.addBloque,this);
            menus.forEach(this.addMenu,this);
            if (this.model.toJSON().front===true) {
                this.addTopSeller();
            };
            this.finalizorender()
        },
        addBloque:function (modelo) {
            var bloque = new BloqueView({
                className:modelo.estilo,
                model:modelo,
            })
        },
        addMenu:function (modelo) {
            var menu_modelo = new MenuModel();
            var vista = new Menu({
                model:menu_modelo
            });
            menu_modelo.set(modelo);
            vista.render()
        },
        addTopSeller:function () {
            var productos = new Productos();            
            var carrusel_producto = new CarruselProducto({
                collection : productos,
            });
            this.$('#middle').append(carrusel_producto.$el);
            productos.fetch({
                data:$.param({limite:10})
            }).done(function () {
                carrusel_producto.add_Carrusel();
            })
        },
        finalizorender:function () {
            //enviar pagina a google analitycs
            var dimensionValue = 'home_page';
            if (this.model.toJSON().front!==true) {
                dimensionValue = 'static_page';
            };            
            ga('set', 'dimension2', dimensionValue);
            window.prerenderReady = true;
            
        }
    });

    var vista = new PageView();

    return vista;
});