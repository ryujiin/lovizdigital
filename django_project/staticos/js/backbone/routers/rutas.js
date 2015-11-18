/*global define*/

define([
    'jquery',
    'backbone',
    '../views/carro/page_carro',
    '../views/page_home',
    '../views/catalogo/page_catalogo',
    '../views/productosingle/page_producto',
    '../collections/categoria',
    '../views/procesar/page_procesar',
    '../views/usuario/page_user',
    '../views/app/page_error'
], function ($, Backbone,CarroPage,HomePage,CatalogoPage,ProductoSingle,Categorias,PageProcesar,PageUser,PageError) {
    'use strict';

    var AppRouter = Backbone.Router.extend({
        routes: {
            "":"root",
            "usuario/perfil/":"perfil",
            "producto/:slug/":'productoSingle',
            'carro/':'carro_page',
            'catalogo/:categoria/':'catalogo',
            'ingresar/':'ingresar',
            'procesar-compra/':'procesar_compra',
            'felicidades/:pedido/':'pedido',
            '*notFound': 'notFound',
        },

        initialize:function(){
        },
        root:function(){
            $('body').removeClass();            

            HomePage.render();
            console.log('root')
        },
        perfil:function(){
            $('body').removeClass();            
            PageUser.render();
        },
        productoSingle:function (slug) {
            $('body').removeClass();   

            ProductoSingle.cambiar_producto(slug);

            console.log(slug)            
        },
        carro_page:function(){
            $('body').removeClass();            

            console.log('carro');
            CarroPage.render();
        },
        catalogo:function (slug) {
            $('body').removeClass();            
            $('body').addClass('catalogo');
            console.log(slug);
            var coincidencia = Categorias.findWhere({slug:slug});
            if (coincidencia) {
                CatalogoPage.render(coincidencia,Categorias);
            }else{
                this.notFound();
            }
        },
        ingresar:function () {
            $('body').removeClass();            
            PageUser.render();
        },
        procesar_compra:function () {
            $('body').removeClass();              
            PageProcesar.verificar_render();
        },
        pedido:function (pedido) {
            if (pedido) {

            }else{
                this.notFound();
            }
        },
        notFound:function () {
            $('body').removeClass();            

            PageError.render();
        },
    });

    var rutas = new AppRouter();

    return rutas;
});


/*
define([
    'jquery',
    'backbone',
    'carro',
    'models/user',
    'views/page_home',
    'views/page_user',
    'views/error_404',
    'views/page_carro',
    'views/page_catalogo',
    'views/productoSingles',
    'collections/productos',
    'collections/productoSingles',
    'collections/categoria',
    'views/page_procesar_compra',
    'views/page_ingresar',
], function ($, Backbone,CarroModel,UserModel,PageHome,PageUser,PageError,PageCarro,PageCatalogo,VistaProductoSingle,ProductosCollection,ProductoSingleCollection,CategoriasCollection,Pedidos,PageProcesar,PageIngresar) {
    'use strict';

    var AppRouter = Backbone.Router.extend({
        routes: {
        	"":"root",
            "usuario/perfil/":"perfil",
            "producto/:slug/":'productoSingle',
            'carro/':'carro_page',
            'catalogo/:categoria/':'catalogo',
            'ingresar/':'ingresar',
            'procesar-compra/':'procesar_compra',
            '*notFound': 'notFound',
        },

        initialize:function(){
            this.page_home = new PageHome();
            this.page_user = new PageUser({
                model:UserModel
            });
            this.page_carro = new PageCarro({
                model:CarroModel
            });
            this.page_catalogo = new PageCatalogo({
                collection: CategoriasCollection
            });
            this.procesar_compra = new PageProcesar({
                model:CarroModel
            });
            this.page_ingresar = new PageIngresar({
                model:UserModel
            });
        },
        root:function(){
            $('body').removeClass();

            this.page_home.render()
        },
        perfil:function(){
            $('body').removeClass();            
            this.page_user.render();
        },
        productoSingle:function (slug) {
            $('body').removeClass();            
            var coleccion = ProductoSingleCollection;
            var productoModel = coleccion.findWhere({slug:slug});
            var self=this;

            if (productoModel !== undefined) {
                VistaProductoSingle.model.set(productoModel.toJSON());
            }else{
                var coleccionProductos = new ProductosCollection();
                coleccionProductos.fetch({
                    data:$.param({slug:slug})
                }).done(function (data) {
                    ProductoSingleCollection.add(data);
                    VistaProductoSingle.model.set(data[0]);
                    
                })
            }

            VistaProductoSingle.render();
        },
        carro_page:function(){
            $('body').removeClass();

            console.log('carro');
            this.page_carro.render();
        },
        catalogo:function (slug) {
            $('body').removeClass();
            $('body').addClass('catalogo');

            var coincidencia = CategoriasCollection.findWhere({slug:slug});
            if (coincidencia) {
                this.page_catalogo.render(coincidencia);
            }else{
                this.notFound();
            }
        },
        ingresar:function () {
            if (UserModel.id===undefined) {
                this.page_ingresar.render();
            }else{
                this.navigate("usuario/perfil/", {trigger: true});
            }
        },
        procesar_compra:function () {
            if (UserModel.id===undefined) {
                this,page_ingresar.procesar = true;
                this.navigate("ingresar/", {trigger: true});
            }else{
                if (CarroModel.toJSON().lineas) {
                    this.procesar_compra.render();
                }else{
                    this.root();
                }
            }            
        },
        notFound:function () {
            PageError.render();
        },
    });

    var rutas = new AppRouter();

    return rutas;
});
*/