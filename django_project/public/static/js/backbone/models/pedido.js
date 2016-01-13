/*global define*/

define([
    'underscore',
    'backbone'
], function (_, Backbone) {
    'use strict';

    var PedidoModel = Backbone.Model.extend({

        urlRoot : '/api/pedidos/',
        
        url: function(){
            var base = this.urlRoot;
            return base + (base.charAt(base.length - 1) == '/' ? '' : '/') + this.id+'/';
        },
        name:'pedido',

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
