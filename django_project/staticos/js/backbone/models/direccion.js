/*global define*/

define([
    'underscore',
    'backbone'
], function (_, Backbone) {
    'use strict';

    var DireccionModel = Backbone.Model.extend({
        urlRoot : '/api/cliente/direcciones/',

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

    return DireccionModel;
});
