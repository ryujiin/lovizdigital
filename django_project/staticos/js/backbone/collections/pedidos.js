/*global define*/

define([
    'underscore',
    'backbone',
    '../models/pedido',
    '../models/user',
], function (_, Backbone, PedidoModel,UserModel) {
    'use strict';

    var PedidoCollection = Backbone.Collection.extend({
        url: 'http://localhost:8000/api/pedidos/',
        model: PedidoModel,
        initialize: function() {
            //this.buscar_user();
            this.listenTo(UserModel, 'change', this.buscar_pedidos);
        },
    });

    var pedidos = new PedidoCollection();

    return pedidos;
});
