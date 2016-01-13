/*global define*/

/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'swig',
    '../../views/catalogo/titulo_catalogo',
    '../../views/app/breadcrumb',
    '../../views/catalogo/bloque_categorias',
    '../../views/catalogo/catalogo',
    '../../views/catalogo/bloque_colores',
    '../../views/catalogo/imagen_catalogo',
    '../../views/app/header'
], function ($, _, Backbone, swig,TituloCatalogo,Breadcrumb,CetegoriaBloque,Catalogo,ColoresBloque,ImagenCatalogo,Head) {
    'use strict';

    var PageCatalogoView = Backbone.View.extend({
        el:$('#contenido'),
        template: swig.compile($('#page_catalogo_template').html()),        

        tagName: 'div',

        id: '',

        className: '',

        events: {},

        initialize: function () {
        },
        render:function (modelo,Categorias) {
            this.$el.html(this.template());

            this.slug = modelo.toJSON().slug;

            this.crear_titulo(modelo,Categorias);            
            this.crear_bloque_busqueda(modelo);            

            this.addBread(modelo,Categorias);
            this.crear_bloque_Categoria(modelo,Categorias);
            this.crear_bloque_colores();
            this.efectos();
        },
        crear_bloque_busqueda:function (modelo) {
            var bloque_productos = new Catalogo({
                el:this.$('.resultados'),
            });
            bloque_productos.buscar_productos(modelo.toJSON().slug);
        },
        crear_titulo:function (modelo,Categorias) {
            var datos_titulo = this.get_titulo(modelo,Categorias);

            var titulo = new TituloCatalogo({
                model:datos_titulo,
                el:this.$('.titulo-categoria'),
            });
            var imagen = new ImagenCatalogo({
                model:datos_titulo,
                el:this.$('.imagen_categoria'),
            });

            var header = Head;
            if (datos_titulo.toJSON().titulo_seo===null) {
                var titulo = datos_titulo.toJSON().nombre+ ' | Loviz DelCarpio® :: lovizdc.com. encontraras desde sandalias , pantuflas, alpargatas. todo con un estilo moderno.';
            }else{
                var titulo = datos_titulo.toJSON().titulo_seo + ' | Loviz DelCarpio® :: lovizdc.com.';
            }
            header.render(titulo,datos_titulo.toJSON().descripcion)
        },
        get_titulo:function (modelo,Categorias) {
            if (modelo.toJSON().padre) {
                var modelo1 = Categorias.findWhere({slug:modelo.toJSON().padre})
                modelo.set({nombre1:modelo1.toJSON().nombre})
                if (modelo1.toJSON().padre) {
                    var modelo2 = Categorias.findWhere({slug:modelo1.toJSON().padre})
                    modelo.set({nombre2:modelo2.toJSON().nombre})
                };
            };
            return modelo;
        },
        addBread:function (modelo,Categorias) {
            
            var breadVista = new Breadcrumb({el:$('.nav-breadcrumb')});

            breadVista.collection.add([{nombre:'Home', link:'/'}]);
            if (modelo.toJSON().padre) {
                var cate1 = Categorias.findWhere({slug:modelo.toJSON().padre})
                if (cate1.toJSON().padre) {
                    var cate2 = Categorias.findWhere({slug:cate1.toJSON().padre})
                };
            };
            if (cate2) {
                breadVista.collection.add([{nombre:cate2.toJSON().nombre, link:cate2.toJSON().link}]);
            };
            if (cate1) {
                breadVista.collection.add([{nombre:cate1.toJSON().nombre, link:cate1.toJSON().link}]);
            };
            breadVista.collection.add([{nombre:modelo.toJSON().nombre}])
            breadVista.render();
        },
        crear_bloque_Categoria:function (modelo,Categorias) {            
            var categoria = new CetegoriaBloque({
                el:$('#refinamientoCategoria'),
                model:modelo,
                collection:Categorias,
            });
        },
        crear_bloque_colores:function () {
            var bloque_color = new ColoresBloque({
                el:this.$('.refinement.Color'),
            });
        },
        efecto_estatico:function () {
            console.log(this.altura);
            if ($(window).scrollTop()> this.altura) {
                this.$('.js-panel.from-right').addClass('siguiendo');
            }else{
                this.$('.js-panel.from-right').removeClass('siguiendo');
            };
        },
        efectos:function() {     
            var altura = this.$('.js-panel.from-right').offset().top;
            altura = altura -110
            $(window).scroll(function () {
                console.log($(window).scrollTop());
                if ($(window).scrollTop()> altura) {
                    this.$('.js-panel.from-right').addClass('siguiendo');
                }else{             
                    this.$('.js-panel.from-right').removeClass('siguiendo');
                };
            });
        }
    });

    var vista = new PageCatalogoView();

    return vista;
});
