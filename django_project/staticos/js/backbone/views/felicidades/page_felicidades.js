/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'swig',
    '../../views/app/header',
    '../../collections/pedidos'
], function ($, _, Backbone, swig,Head,PedidosCollection) {
    'use strict';

    var FelicidadPageView = Backbone.View.extend({
        el:$('#contenido'),

        template: swig.compile($('#page_felicidades_template').html()),        

        tagName: 'div',

        id: '',

        className: '',

        events: {},

        render: function (pedido) {
            this.buscar_pedido(pedido);
            this.$el.html(this.template());                    
            this.change_head();
        },
        change_head:function () {
            var titulo = 'Gracias por su compra | Loviz DelCarpio® :: lovizdc.com';
            var descripcion = 'Loviz DelCarpio®, lovizdc.com';
            var header = Head;
            header.render(titulo,descripcion);
        },
        buscar_pedido:function (pedido) {
            var self = this;
            var pedidos = PedidosCollection;
            pedidos.fetch().done(function () {
                var coincidencia = pedidos.findWhere({'numero_pedido':pedido});
                if (coincidencia) {
                    self.rellenar_pedido(coincidencia);
                }else{
                    Backbone.history.navigate('/error_pedidos/',{trigger:true});
                }
            })        
        },
        rellenar_pedido:function (pedido) {
            
        }
    });

    var vista = new FelicidadPageView();

    return vista;
});