/*global define*/

define([
    'underscore',
    'backbone',
    '../models/categoria'
], function (_, Backbone, CategoriaModel) {
    'use strict';

    var CategoriaCollection = Backbone.Collection.extend({
        model: CategoriaModel,
        url: '/api/categoria/',
    });
    var categorias =  new CategoriaCollection();
    
    return categorias;
});
