/*global define*/

define([
    'underscore',
    'backbone'
], function (_, Backbone) {
    'use strict';

    var ProductosModel = Backbone.Model.extend({
        urlRoot: '/api/v2/productos/',

        url: function(){
            var base = this.urlRoot;
            if (this.isNew()) return base;
            return base + (base.charAt(base.length - 1) == '/' ? '' : '/') + this.id+'/';
        },

        initialize: function() {
        },

        defaults: {
        },

        validate: function(attrs, options) {
        },

        parse: function(response, options)  {
            return response;
        },
    });

    return ProductosModel;
});
