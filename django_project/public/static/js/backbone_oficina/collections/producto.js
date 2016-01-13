/*global define*/

define([
    'underscore',
    'backbone',
    '../models/producto'
], function (_, Backbone, ProductosModel) {
    'use strict';

    var ProductosCollection = Backbone.Collection.extend({
    	url: '/api/catalogo/',

        model: ProductosModel,
    });

    return ProductosCollection;
});
