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
            this.listenTo(this.model, 'change', this.rellenar);
            this.listenTo(this.model, 'change:cuerpo', this.render);
            this.paginas = PaginasTotal;
        },

        render: function (slug) {            
            this.$el.html(this.template(this.model.toJSON()));
        },
        render_front:function () {
            this.$el.html(this.template());
            if (this.model.toJSON().front===true) {
                this.rellenar()
            }else{
                this.buscar_datos();
            };
            this.addTopSeller();
        },
        buscar_datos:function (slug) {
            if (slug) {
                var coincidencia = this.paginas.findWhere({'slug':slug});
                if (coincidencia === undefined) {
                    var busqueda ={'slug':slug}
                    this.buscar_server(busqueda);
                }else{
                    this.model.set(coincidencia.toJSON())
                }
            }else{
                var coincidencia = this.paginas.findWhere({'front':true})
                if (coincidencia===undefined) {
                    var busqueda = {front:true}
                    this.buscar_server(busqueda);
                }else{
                    this.model.set(coincidencia.toJSON());
                }       
            }
        },
        buscar_server:function (busqueda) {
            var self = this;
            var paginas = new PagesCollection();
            paginas.fetch({
                data:$.param(busqueda)
            }).done(function  (data) {
                self.paginas.add(data);
                if (data[0].front===true) {
                    self.buscar_datos()
                }else{
                    self.buscar_datos(data[0].slug);
                }
            })
        },
        rellenar:function () {
            Head.render(this.model.toJSON().titulo,this.model.toJSON().descripcion);
            var bloques = this.model.attributes.bloques;
            var menus = this.model.attributes.menus;
            bloques.forEach(this.addBloque,this);
            menus.forEach(this.addMenu,this);
        },
        addBloque:function (modelo) {
            var bloque = new BloqueView({
                className:modelo.estilo,
                model:modelo,
            })
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
        addMenu:function (modelo) {
            var menu_modelo = new MenuModel();
            var vista = new Menu({
                model:menu_modelo
            });
            menu_modelo.set(modelo);
            vista.render()
        }
    });

    var vista = new PageView();

    return vista;
});