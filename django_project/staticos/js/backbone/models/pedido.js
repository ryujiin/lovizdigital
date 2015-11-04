/*global define*/

define([
    'underscore',
    'backbone'
], function (_, Backbone) {
    'use strict';

    var PedidoModel = Backbone.Model.extend({

        
        urlRoot: 'http://localhost:8000/api/pedidos/',


        initialize: function() {
        },

        defaults: {
        },

        validate: function(attrs, options) {
        },

        parse: function(response, options)  {
            return response;
        }
    });

    return PedidoModel;
});
