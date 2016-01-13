/*global define*/

define([
    'underscore',
    'backbone'
], function (_, Backbone) {
    'use strict';

    var LineaModel = Backbone.Model.extend({
        urlRoot: '/api/carro/lineas/',
        url : function() {
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
        }
    });

    return LineaModel;
});
