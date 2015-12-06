/*global define*/

define([
    'underscore',
    'backbone'
], function (_, Backbone) {
    'use strict';

    var MetodoEnvioModel = Backbone.Model.extend({
        urlRoot : '/api/metodos_envio/',

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

    return MetodoEnvioModel;
});
