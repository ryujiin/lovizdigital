/*global define*/
/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'swig',
    '../../app/header',
    '../../../collections/pages',
    '../../../models/page',
    'paginas',
    '../../pages/bloque',
    '../../pages/carrusel_producto',
    'productosTotal',
    '../../../collections/productos'
], function ($, _, Backbone, swig,Head,PagesCollection,PaginaModel,PaginasTotal,BloqueView,CarruselProducto,ProductosTotal,Productos) {
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
            this.paginas = PaginasTotal;
        },

        render: function (slug) {            
            this.$el.html(this.template());
            this.buscar_datos(slug);
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
                self.buscar_datos();
            })
        },
        rellenar:function () {
            Head.render(this.model.toJSON().titulo,this.model.toJSON().descripcion);
            var bloques = this.model.attributes.bloques;
            bloques.forEach(this.addBloque,this);
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
        }
    });

    var vista = new PageView();

    return vista;
});