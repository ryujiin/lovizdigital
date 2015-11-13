/*global define*/

define([
    'underscore',
    'backbone'
], function (_, Backbone) {
    'use strict';

    var CategoriaModel = Backbone.Model.extend({
        urlRoot : 'http://localhost:8000/api/categoria/',
        

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

    return CategoriaModel;
});
