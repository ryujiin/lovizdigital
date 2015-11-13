/*global define*/

define([
    'jquery',
    'backbone',
    '../views/catalogo/page_catalgo',    
    '../views/cliente/page_clientes',    
    '../views/pedido/page_pedidos',    
    '../views/resumen/page_resumen',    
    '../views/catalogo/add_producto'
], function ($, Backbone,PageCatalogo,PageClientes,PagePedidos,PageResumen,AddProducto) {
    'use strict';

    var AppRouter = Backbone.Router.extend({
        routes: {
            "oficina/":"root",
            'oficina/catalogo/':'catalogo',
            'oficina/catalogo/add_producto/':'add_producto',
            'oficina/pedidos/':'pedidos',
            'oficina/clientes/':'clientes',
            'oficina/clientes/mayorista/:id':'mayorista',
            '*notFound': 'notFound',
        },

        initialize:function(){
        },
        root:function(){
            PageResumen.render();
            console.log('root')
        },
        catalogo:function(){
            PageCatalogo.render();
            console.log('catalogo');
        },
        add_producto:function () {
            var vista = new AddProducto();
        },
        pedidos:function () {
            PagePedidos.render();
            console.log('pedidos');
        },
        clientes:function () {
            PageClientes.render();
            console.log('c');            
        },
        notFound:function () {
            $('body').removeClass();            
        },
    });

    var rutas = new AppRouter();

    return rutas;
});