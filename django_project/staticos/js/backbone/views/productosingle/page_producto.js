/*global define*/


define([
    'jquery',
    'underscore',
    'backbone',
    'swig',
    '../../models/productos',
    '../../collections/productos',
    'productosTotal',
    '../../views/app/breadcrumb',
    '../../views/productosingle/galeria_full',
    '../../views/productosingle/galeria_mobil',
    '../../views/productosingle/add_to_cart',
    '../../models/linea',    
    'carro',    
], function ($, _, Backbone, swig,ProductoModel,ProductosCollections,ProductosTotal,BreadView,Galeria_full,Galeria_mobil,AddToCart,LineaModel,Carro) {
    'use strict';

    var ProductoSinglesView = Backbone.View.extend({
        el:$('#contenido'),
        template: swig.compile($('#productoSingles_tlp').html()),                

        tagName: 'div',

        id: '',

        className: '',

        collection: new ProductosCollections(),

        events: {
            'change .tallas_form':'cambiar_talla'
        },

        initialize: function () {
            this.listenTo(this.model, 'change', this.render);
        },

        render: function () {
            this.$el.html(this.template(this.model.toJSON()));
            this.add_bread();
            this.add_galleria();            
            this.add_button_cart();            
        },
        cambiar_producto:function (slug) {
            var productos = ProductosTotal;
            var self = this;

            var coincidencia = productos.findWhere({slug:slug})
            if (coincidencia) {
                this.model.set(coincidencia.toJSON())
            }else{
                this.collection.fetch({
                    data:$.param({slug:slug})
                }).done(function (data) {
                    productos.add(this.collection);
                    self.model.set(data[0]);
                })
            }
        },
        add_bread:function () {
            this.breadVista = new BreadView({el:$('.nav-breadcrumb')});
            this.breadVista.collection.reset();
            var modelo = this.model.toJSON();
            var bread = {nombre:'Home', link:'/'}
            this.breadVista.collection.add(bread);

            var categorias = this.model.toJSON().categorias;
            if (categorias) {
                categorias.forEach(this.agregar_bread,this);
                bread = {
                    nombre:modelo.nombre,
                    link: null,
                }
                this.breadVista.collection.add(bread);

                this.breadVista.render();
            };
        },
        agregar_bread:function (model) {
            var bread = {
                nombre : model.nombre,
                link : model.link,
            }
            this.breadVista.collection.add(bread)
        },
        add_galleria:function () {
            var galeria_full = new Galeria_full({
                model:this.model,
                el:$(this.$('#galeria_full')),
            });
            var galeria_mobil = new Galeria_mobil({
                model:this.model,
                el:$(this.$("#galeria_movil")),
            })
        },
        cambiar_talla: function (e) {
            var talla = e.target.value;
            this.$('.precios .precio_variacion.mostrar').removeClass('mostrar');
            this.$('.precios .precio_variacion.'+talla).addClass('mostrar');
            this.lineamodel.set({variacion:talla});
        },
        add_button_cart:function  () {
            this.lineamodel = new LineaModel({
                producto:this.model.id,
                carro:Carro.id
            });
            var button = new AddToCart({
                model:this.lineamodel,
                el:this.$('#addtocart'),
            })
        }
    });
    var modelo = new ProductoModel();

    return new ProductoSinglesView({model:modelo});
});


/*

define([
    'jquery',
    'underscore',
    'backbone',
    'swig',
    '../../models/productos',
    '../../views/app/breadcrumb',
    '../../views/productosingle/galeria_full',
    '../../views/productosingle/galeria_mobil',
    '../../views/productosingle/add_to_cart',
    '../../models/linea',
    'carro',
], function ($, _, Backbone, swig,ProductoModel,BreadView,Galeria_full,Galeria_mobil,AddToCart,LineaModel,Carro) {
    'use strict';

    var ProductoSinglesView = Backbone.View.extend({
        el:$('#contenido'),
        template: swig.compile($('#productoSingles_tlp').html()),                

        tagName: 'div',

        id: '',

        className: '',

        events: {
            'change .tallas_form':'cambiar_talla'
        },

        initialize: function () {
            this.listenTo(this.model, 'change', this.render);
        },

        render: function () {
            this.$el.html(this.template(this.model.toJSON()));
            this.add_galleria();
            this.add_bread();
            this.add_button_cart();
        },
        add_galleria:function () {
            var galeria_full = new Galeria_full({
                model:this.model,
                el:$(this.$('#galeria_full')),
            });
            var galeria_mobil = new Galeria_mobil({
                model:this.model,
                el:$(this.$("#galeria_movil")),
            })
        },
        add_bread:function () {
            this.breadVista = new BreadView({el:$('.nav-breadcrumb')});
            this.breadVista.collection.reset();
            var modelo = this.model.toJSON();
            var bread = {nombre:'Home', link:'/'}
            this.breadVista.collection.add(bread);

            var categorias = this.model.toJSON().categorias;
            if (categorias) {
                categorias.forEach(this.agregar_bread,this);
                bread = {
                    nombre:modelo.nombre,
                    link: null,
                }
                this.breadVista.collection.add(bread);

                this.breadVista.render();
            };
        },
        agregar_bread:function (model) {
            var bread = {
                nombre : model.nombre,
                link : model.link,
            }
            this.breadVista.collection.add(bread)
        },
        add_button_cart:function  () {
            this.lineamodel = new LineaModel({
                producto:this.model.id,
                carro:Carro.id
            });
            var button = new AddToCart({
                model:this.lineamodel,
                el:this.$('#addtocart'),
            })
        },
        cambiar_talla: function (e) {
            var talla = e.target.value;
            this.$('.precios .precio_variacion.mostrar').removeClass('mostrar');
            this.$('.precios .precio_variacion.'+talla).addClass('mostrar');
            this.lineamodel.set({variacion:talla});
        },
        cambiar_producto:function (slug) {

            debugger;
        }
    });
    var modelo = new ProductoModel();

    return new ProductoSinglesView({model:modelo});
});
*/