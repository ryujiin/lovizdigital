/*global define*/

define([
    'underscore',
    'backbone',
    '../models/pedido',
    '../models/user',
], function (_, Backbone, PedidoModel,UserModel) {
    'use strict';

    var PedidoCollection = Backbone.Collection.extend({
        url: '/api/pedidos/',
        model: PedidoModel,
        initialize: function() {
            //this.buscar_user();
        },
    });

    var pedidos = new PedidoCollection();

    return pedidos;
});
