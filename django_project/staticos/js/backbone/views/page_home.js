/*global define*/
/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'swig',
    '../views/app/header'
], function ($, _, Backbone, swig,Head) {
    'use strict';

    var PageHomeView = Backbone.View.extend({
        el:$('#contenido'),

        template: swig.compile($('#page_home_template').html()),        

        id: '',

        className: '',

        events: {},

        initialize: function () {
        },

        render: function () {            
            this.$el.html(this.template());
            this.cambiar_header();
        },
        cambiar_header:function () {
            var titulo = 'Loviz DelCarpio® | Donde encontras los mejores pantuflas, sandalias y calzado.';
            var descripcion = 'Loviz DelCarpio® Boutique , Encontraras lo mejor en pantuflas, sandalias, botas, flats y demas. Envio Gratis para todo el peru por compras mayores a S/.50.00';
            var header = Head;
            header.render(titulo,descripcion);
        }

    });

    var vista = new PageHomeView();

    return vista;
});


/*
define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'collections/carousel-home',
    'productosTotal',
    'views/carousels'
], function ($, _, Backbone, JST,CarouselHomeCollection,ProductosCollection,VistaCarousels) {
    'use strict';

    var PageHomeView = Backbone.View.extend({
        el:$('#contenido'),
        template: JST['app/scripts/templates/page_home.hbs'],

        id: '',

        className: '',

        events: {},

        initialize: function () {
            this.collectionHomeCarrusel = new CarouselHomeCollection();
            this.productosTotal = ProductosCollection;         
        },

        render: function () {            
            this.$el.html(this.template());
            this.$el.removeClass();
            this.llenar_carruselHome();
            this.productos_carrusel();
        },
        buscar_carouselHome:function(vista){
            var self = this
            if (this.collectionHomeCarrusel.length==0) {
                this.collectionHomeCarrusel.fetch().done(function () {
                    vista.render('single');
                })
            }else{
                vista.render('single');
            }
        },
        llenar_carruselHome:function (modelo) {
            var vista = new VistaCarousels({
                collection:this.collectionHomeCarrusel
            });
            this.$('#homepage-carousel').append(vista.$el);
            this.buscar_carouselHome(vista);
        },
        productos_carrusel:function () {
            var ofertas = this.productosTotal.where({'en_oferta':true})
            var vistaOfertas = new VistaCarousels({
                collection:ofertas
            })
            var vistaBestSellers = new VistaCarousels({
                collection:this.productosTotal
            })
            this.$('#home_ofertas .lista-productos').append(vistaOfertas.$el);
            this.$('#home_best_seller .lista-productos').append(vistaBestSellers.$el);
            vistaOfertas.render_productos(3)
            vistaBestSellers.render_productos(3)
        }
    });

    return PageHomeView;
});
*/