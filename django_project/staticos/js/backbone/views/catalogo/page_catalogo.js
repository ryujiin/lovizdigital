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
], function ($, _, Backbone, swig,TituloCatalogo,Breadcrumb,CetegoriaBloque,Catalogo,ColoresBloque) {
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
        }
    });

    var vista = new PageCatalogoView();

    return vista;
});

/*
define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'views/categoria_bloque',
    'views/catalogo',
    'collections/productos',
    'collections/filtro',
    'views/catalogo_bloque_color',
    'models/filtro',
], function ($, _, Backbone, JST,CetegoriaBloque,Catalogo,ProductosCollection,Filtros,ColorBloque,FiltroModel) {
    'use strict';

    var PageCatalogoView = Backbone.View.extend({
        el:$('#contenido'),

        template: JST['app/scripts/templates/page_catalogo.hbs'],

        tagName: 'div',

        id: '',

        className: '',

        events: {},

        initialize: function () {
            this.busquedas=[];
            this.filtros = new Filtros();
            this.listenTo(this.filtros, 'add', this.add_filtro);
            this.listenTo(this.filtros, 'remove', this.add_filtro);
        },
        render:function (modelo) {
            this.slug = modelo.toJSON().slug;
            var datos = this.get_titulo(modelo);
            this.$el.html(this.template(datos));

            this.crear_bloque_busqueda();            
            this.crear_bloque_Categoria(modelo);
            this.crear_bloque_colores();
        },
        get_titulo:function (modelo) {
            if (modelo.toJSON().padre) {
                var modelo1 = this.collection.findWhere({slug:modelo.toJSON().padre})
                modelo.set({nombre1:modelo1.toJSON().nombre})
                if (modelo1.toJSON().padre) {
                    var modelo2 = this.collection.findWhere({slug:modelo1.toJSON().padre})
                    modelo.set({nombre2:modelo2.toJSON().nombre})
                };
            };
            return modelo.toJSON();
        },
        crear_bloque_Categoria:function (modelo) {            
            var categoria = new CetegoriaBloque({
                el:$('#refinamientoCategoria'),
                model:modelo,
                collection:this.collection,
            });
        },
        crear_bloque_colores:function () {
            var bloque_color = new ColorBloque({
                el:this.$('.refinement.Color'),
                collection:this.filtros,
                
            });
        },
        crear_bloque_busqueda:function () {
            var collection = this.get_productos();
            this.bloque_productos = new Catalogo({
                el:this.$('.resultados'),
                collection: collection,
            });

            if (collection.length===0) {
                collection.fetch({
                    data:$.param({categoria:this.slug})
                })
            }else{
                this.bloque_productos.render();
            }
        },
        get_productos:function () {
            var productos_categorias = this.by_categoria();
            return productos_categorias;
        },
        by_categoria:function () {
            var self = this;
            var encontrado = false;
            this.busquedas.forEach(function(data){
                if (self.slug===data.buscado) {
                    encontrado = data.productos;
                }
            })
            if (encontrado) {
                return encontrado
            }else{
                var productos_categoria = new ProductosCollection();
                var busqueda = {
                    buscado : this.slug,
                    productos : productos_categoria
                }
                this.busquedas.push(busqueda);
                return productos_categoria
            }
        },
        add_filtro:function (modelo) {
            debugger;
            var self = this;
            //invisible todos los productos
            this.bloque_productos.collection.forEach(function(data){
                data.set({visible:false});
            });
            //recorrer los filtros
            if (this.filtros.length!==0) {
                this.filtros.forEach(function(data){
                    var valor = data.toJSON().valor;
                    if (data.toJSON().tipo==='color') {
                        self.bloque_productos.collection.forEach(function(data){
                            if (data.toJSON().color===valor) {
                                data.set({visible:true});
                            };
                        });
                    };
                })
            }else{
                this.bloque_productos.collection.forEach(function(data){
                    data.set({visible:true});
                }); 
            }
        },
    });


    return PageCatalogoView;
});
*/