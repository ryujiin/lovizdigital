/*global define*/


define([
    'jquery',
    'underscore',
    'backbone',
    'swig',
    '../../models/productos',
    '../../collections/productos',
    '../../collections/comentarios',
    'productosTotal',
    '../../views/app/breadcrumb',
    '../../views/productosingle/galeria_full',
    '../../views/productosingle/galeria_mobil',
    '../../views/productosingle/add_to_cart',
    '../../models/linea',
    '../../views/productosingle/relacionados',
    '../../views/productosingle/estrellas',
    '../../views/productosingle/seccion_comentarios',
    '../../views/productosingle/nuevo_comentario',
    '../../views/app/header',
    '../../models/comentario',
    'carro',
], function ($, _, Backbone, swig,ProductoModel,ProductosCollections,ComentariosCollection,ProductosTotal,BreadView,Galeria_full,Galeria_mobil,AddToCart,LineaModel,Relacionados,Estrellas,Comentarios,NuevoComentario,Head,ComentarioModel,Carro) {
    'use strict';

    var ProductoSinglesView = Backbone.View.extend({
        el:$('#contenido'),
        template: swig.compile($('#productoSingles_tlp').html()),                

        tagName: 'div',

        id: '',

        className: '',

        collection: new ProductosCollections(),

        events: {
            'click .tallas_elegibles .en_stock':'cambiar_talla',
            'click #agregar_alCarro':'comprar_producto',
        },

        initialize: function () {
            this.listenTo(this.model, 'change', this.render);
        },

        render: function () {
            this.$el.html(this.template(this.model.toJSON()));
            this.change_header();
            this.add_bread();
            this.add_galleria();            
            this.add_button_cart();
            this.add_relacionados();
            this.add_estrellas();
            this.add_lista_comentarios();
        },
        change_header:function () {
            var titulo = this.model.toJSON().full_name + ' | Loviz DelCarpio® :: lovizdc.com'
            var descripcion = this.model.toJSON().descripcion;
            var header = Head;
            header.render(titulo,descripcion);
        },
        cambiar_producto:function (slug) {
            var productos = ProductosTotal;
            var self = this;
            if (slug !== this.model.toJSON().slug) {
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
            }else{
                this.render();
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
            this.$('.tallas_elegibles .talla_seleccion').removeClass('seleccionado');
            var talla = e.target.dataset.valor;
            this.$('.precios .precio_variacion.mostrar').removeClass('mostrar');
            this.$('.precios .precio_variacion.'+talla).addClass('mostrar');
            $(e.target).addClass('seleccionado');
            this.lineamodel.set({variacion:talla});
        },
        add_button_cart:function  () {
            this.lineamodel = new LineaModel({
                producto:this.model.id,
                carro:Carro.id
            });

            this.buttonAddCart = new AddToCart({
                model:this.lineamodel,
                el:this.$('#addtocart'),
            });

        },
        add_relacionados:function () {
            var relacionados = new Relacionados({
                el:this.$('#producto-asociado .lista-productos')
            })
            var cates = this.model.toJSON().categorias
            var slug;
            cates.forEach(function (e) {
                if (e.seccion ==='categoria') {
                    slug = e.slug;
                };
            })
            relacionados.buscar_productos(slug);
        },
        add_estrellas:function () {
            var estrellas = new Estrellas({
                el:this.$('.estrellas'),
                model:this.model
            });
            estrellas.render(this.model.toJSON().valoracion)
        },
        add_lista_comentarios:function () {
            var comentarios_collection = new ComentariosCollection()
            var comentarios = new Comentarios({
                el:this.$('#recomendation-producto'),
                model:this.model,
                collection:comentarios_collection
            })
            var new_comentario = new NuevoComentario({
                el:this.$('#nuevo_comentario'),
                model:new ComentarioModel(),
                collection:comentarios_collection,
            })
        },
        comprar_producto:function () {            
            this.buttonAddCart.verificar_compra(this)
        }
    });
    var modelo = new ProductoModel();

    return new ProductoSinglesView({model:modelo});
});