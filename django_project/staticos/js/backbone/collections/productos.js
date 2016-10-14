/*global define*/

define([
    'underscore',
    'backbone',
    '../models/productos'
], function (_, Backbone, ProductosModel) {
    'use strict';

    var ProductosCollection = Backbone.Collection.extend({
    	url: '/api/v2/productos/',

        model: ProductosModel,
    });

    return ProductosCollection;
});
