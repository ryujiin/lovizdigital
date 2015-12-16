/*global define*/

define([
    'jquery',
    'backbone',
    '../views/carro/page_carro',
    '../views//pages/pages',
    '../views/catalogo/page_catalogo',
    '../views/productosingle/page_producto',
    '../collections/categoria',
    '../views/procesar/page_procesar',
    '../views/usuario/page_user',
    '../views/felicidades/page_felicidades',
    '../views/app/page_error'
], function ($, Backbone,CarroPage,Pages,CatalogoPage,ProductoSingle,Categorias,PageProcesar,PageUser,PageFelicidades,PageError) {
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
            'felicidades/:pedido/':'felicidades',
            '*notFound': 'notFound',
        },

        initialize:function(){
        },
        root:function(){
            $('body').removeClass();            
            Pages.render_front();
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
        felicidades:function (pedido) {
            if (pedido) {
                PageFelicidades.render(pedido);
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
